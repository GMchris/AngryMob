// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameScene = cc.Scene.extend({

  // Own properties.
  worldType: null, //TODO: Set this dynamically.

  // Game objects.
  player: null,
  playerBoundary: null,
  obstacles: null,
  souls: null,
  powerups: null,
  started: false,

  // Stats.
  currentDistanceTravelled: 0,
  currentSoulCount: 0,
  currentSegmentDistanceTravelled: 0,

  // Layers.
  backgroundLayer: null,
  gameObjectsLayer: null,
  uiLayer: null,

  ctor: function(worldType) {
    this._super();

    this.worldType = worldType;

    this.init();
  },

  init: function() {

    // The order of the methods being called here is important. Some use properties set by others.
    this.runGeneralSetup();
    this.initializeActions();
    this.instantiateLayers();

    cc.eventManager.addListener(this.createTouchHandler(), this.gameObjectsLayer);
  },

  /**
   * INITIALIZATION #################################################################
   */

  onEnter: function() {
    this._super();

    this.runAction(cc.sequence(cc.delayTime(G.INITIAL_LAUNCH_DELAY), cc.callFunc(this.launch, this)));
    this.runAction(this.calculateDistanceAction);

    this.uiLayer.run();

    this.scheduleUpdate();
    this.pauseGame();
  },

  /**
   * Sets general properties in the scene.
   */
  runGeneralSetup: function() {
    Game.set('maxLives', 3);
    Game.set('lives', Game.get('maxLives'));
    Game.set('worldType', this.worldType);
    this.setSpeed();
    this.started = false;
    this.currentDistanceTravelled = 0;
    this.currentSegmentDistanceTravelled = 0;
    this.currentSoulCount = 0;
  },

  /**
   * Creates, but doesn't start GameScene actions.
   */
  initializeActions: function() {
    // Repeating action that raises the movement speed.
    this.upscaleSpeedAction = cc.sequence(cc.delayTime(G.SPEEDUP_TIMEOUT), cc.callFunc(this.upscaleSpeed, this));
    this.upscaleSpeedAction.repeatForever();
    this.upscaleSpeedAction.retain();

    // Repeating action that increments and updates the distance travelled.
    this.calculateDistanceAction = cc.sequence(cc.delayTime(0.2), cc.callFunc(this.calculateDistance, this));
    this.calculateDistanceAction.repeatForever();
    this.calculateDistanceAction.retain();
  },

  /**
   * Creates and adds all layers to the scene.
   */
  instantiateLayers: function() {
    this.backgroundLayer = new BackgroundLayer();
    this.gameObjectsLayer = new GameObjectsLayer();
    this.gameObjectsLayer.init(this);
    this.uiLayer = new GameUILayer(this);

    this.addChild(this.backgroundLayer);
    this.addChild(this.gameObjectsLayer);
    this.addChild(this.uiLayer);
  },

  launch: function() {
    this.gameObjectsLayer.generateSegment();
    this.runAction(this.upscaleSpeedAction);
    this.started = true;
    Game.set('state', G.STATE.PLAYING);
  },

  /**
   * BASIC GAME OPERATIONS #################################################################
   */

  gainLife: function() {
    Game.increment('lives');
    this.setSpeed();
    this.gameObjectsLayer.moveMob();
  },

  loseLife: function() {
    Game.decrement('lives');
    this.player.receiveDamage();
    this.gameObjectsLayer.moveMob();
    this.uiLayer.speedBar.loseLife();
    this.setSpeed();

    if (Game.get('lives') <= 0) {
      this.endGame();
    }
  },

  /**
   * Starts the game scene over using the same monster.
   */
  replay: function() {
    cc.director.runScene(new GameScene(this.worldType));
  },

  endGame: function() {
    this.stopAllActions();
    this.player.die();
    this.gameObjectsLayer.fadeInOverlay();
    this.uiLayer.onGameEnd(this.currentSoulCount);
    Game.set('additionalSpeed', 0);
    Game.set('state', G.STATE.ENDING);

    // Memory operations.
    Memory.add('souls', this.currentSoulCount);

    if (Memory.get('highScore') < this.currentDistanceTravelled) {
      Memory.set('highScore', this.currentDistanceTravelled);
    }
  },

  /**
   * Periodically called to raise the speed by one.
   */
  upscaleSpeed: function() {
    if (Game.get('state') === G.STATE.PLAYING) {
      Game.increment('additionalSpeed');
    }
  },

  /**
   * Adds the current speed and spawns a new segment when a certain distance is reached.
   */

  iterateDistance: function() {
    this.currentSegmentDistanceTravelled += Game.get('computedSpeed');
    if (this.currentSegmentDistanceTravelled >= G.SEGMENT_LENGTH) {
      this.currentSegmentDistanceTravelled = 0;
      this.gameObjectsLayer.generateSegment();
    }
  },

  /**
   * Periodically called to update the distance travelled
   */
  calculateDistance: function() {
    this.currentDistanceTravelled += Math.round(Game.get('speed') / 4);
    this.uiLayer.distanceCounter.setLabelText(this.currentDistanceTravelled);
  },

  setSpeed: function() {
    Game.set('speed', G.SPEEDS[Game.get('lives')]);
  },

  pauseGame: function() {
    Game.set('state', G.STATE.PAUSED);
    this.pause();
    this.uiLayer.onPause();
    this.gameObjectsLayer.onPause();
  },

  resumeGame: function() {
    Game.set('state', this.started ? G.STATE.PLAYING : G.STATE.STARTING);
    this.resume();
    this.uiLayer.onResume();
    this.gameObjectsLayer.onResume();
  },

  // POWERUPS ################################################################

  activateSpeedPowerup: function() {
    this.player.isVulnerable = false;
    this.player.color = cc.color(160, 200, 250, 255);
    this.gameObjectsLayer.dustParticleSystem.setPosition(G.OFFSCREEN_POSITION);
    this.gameObjectsLayer.dustParticleSystem.stopSystem();

    this.gameObjectsLayer.electricityParticleSystem.resetSystem();

    var endSpeedCallback = cc.callFunc(function () {
      Game.set('activePowerUp', null);
      this.gameObjectsLayer.electricityParticleSystem.setPosition(G.OFFSCREEN_POSITION);
      this.gameObjectsLayer.electricityParticleSystem.stopSystem();
      this.gameObjectsLayer.dustParticleSystem.resetSystem();
    }, this);

    var endInvulnerabilityCallback = cc.callFunc(function() {
      this.player.isVulnerable = true;
      this.player.runAction(cc.tintTo(0.5, 255, 255, 255));
    }, this);

    var speedUpSequence = cc.sequence(cc.delayTime(G.POWERUPS.SPEED.DURATION), endSpeedCallback,
        cc.delayTime(1), endInvulnerabilityCallback);

    this.runAction(speedUpSequence);
  },

  activateMagnetPowerup: function() {
    this.gameObjectsLayer.magnetParticleSystem.resetSystem();

    var endMagnetCallback = cc.callFunc(function () {
      Game.set('activePowerUp', null);
      this.gameObjectsLayer.magnetParticleSystem.setPosition(G.OFFSCREEN_POSITION);
      this.gameObjectsLayer.magnetParticleSystem.stopSystem();
    }, this);

    this.runAction(cc.sequence(cc.delayTime(G.POWERUPS.MAGNET.DURATION), endMagnetCallback));
  },

  // EVENTS ##################################################################

  /**
   * Returns a touch event.
   */
  createTouchHandler: function() {
    return cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: this.onTouchBegan.bind(this),
      onTouchMoved: this.onTouchMoved.bind(this),
      onTouchEnded: this.onTouchEnded.bind(this)
    });
  },

  onTouchBegan: function(e) {
    var location = e.getLocation();
    if (Game.get('state') === G.STATE.PAUSED && this.player.pointInMoveArea(location)) {
      this.resumeGame();
      this.player.animateTo(location.x, location.y, 0.05);
      return true;
    }
    return false;
  },

  onTouchMoved: function(e) {
    var state = Game.get('state');
    if (state === G.STATE.PLAYING || state === G.STATE.STARTING) {
      var location = e.getLocation();
      location.x = location.x.clamp(this.playerBoundary.left, this.playerBoundary.right);
      location.y = location.y.clamp(this.playerBoundary.bottom, this.playerBoundary.top);
      this.player.setPosition(location);
    }
    return true;
  },

  onTouchEnded: function(e) {
    var state = Game.get('state');
    if (state === G.STATE.PLAYING || state === G.STATE.STARTING) {
        this.pauseGame();
    }
    return true;
  },

  onSoulCollected: function(soul) {
    // The value from the specific soul type is multiplied by the bonus from the purchased.
    var soulValue = G.SOUL_VALUES[soul.type] * LabGenerator.getCurrentUpgrade(G.UPGRADES.LIQUID_SOUL);
    this.currentSoulCount += soulValue;
    this.uiLayer.soulCounter.setLabelText(this.currentSoulCount);
    var soulShard = this.gameObjectsLayer.getSoulShard();
    soulShard.activate(soul.getPosition());
    soul.deactivate();
  },

  onPowerupCollected: function(powerup) {
    // Return if a powerup is already in effect.
    if (typeof Game.get('activePowerUp') === 'number') {
      return false;
    }
    Game.set('activePowerUp', powerup.type);
    powerup.deactivate();

    switch(powerup.type) {
      case G.POWERUPS.SPEED.TYPE:
        this.activateSpeedPowerup();
        break;
      case G.POWERUPS.MAGNET.TYPE:
        this.activateMagnetPowerup();
        break;
      default:
        break;
    }
  },

  // UPDATE METHODS #############################################################

  checkObstacleCollision: function() {
    for (var obstacleType = 0; obstacleType < G.OBSTACLE_COUNT ; obstacleType++ ) {
      for (var poolIndex = 0; poolIndex < G.OBSTACLE_POOL_COUNT ; poolIndex++ ) {
        var obstacle = this.obstacles[obstacleType][poolIndex];
        if (obstacle.inUse) {
          if (cc.rectIntersectsRect(obstacle.computedCollider, this.player.computedCollider)) {
            this.gameObjectsLayer.onObstacleCollision(obstacle);
            if (this.player.isVulnerable) {
              this.loseLife();
            }
            return true;
          }
        }
      }
    }
  },

  checkSoulCollision: function() {
    for (var soulType = 0; soulType < this.souls.length; soulType++) {
      for (var soulIdx = 0; soulIdx < this.souls[soulType].length ; soulIdx++) {
        var soul = this.souls[soulType][soulIdx];
        if (soul.inUse) {
          // Should the soul be pulled towards the player.
          if (Game.get('computedPull')) {

          }

          // Is there a collision.
          if (cc.rectIntersectsRect(soul.computedCollider, this.player.computedCollider)) {
            this.onSoulCollected(soul);
            return true;
          }
        }
      }
    }
  },

  checkPowerupCollision: function() {
    for (var powerupType = 0; powerupType < this.powerups.length; powerupType++) {
      for (var powerupIdx = 0; powerupIdx < this.powerups[powerupType].length ; powerupIdx++) {
        var powerup = this.powerups[powerupType][powerupIdx];
        if (powerup.inUse) {
          if (cc.rectIntersectsRect(powerup.computedCollider, this.player.computedCollider)) {
            this.onPowerupCollected(powerup);
            return true;
          }
        }
      }
    }
  },

  update: function() {
    var state = Game.get('state');
    if (state === G.STATE.PLAYING || state === G.STATE.STARTING) {
      this.checkObstacleCollision();
      this.checkSoulCollision();
      this.checkPowerupCollision();
    }

    if (state === G.STATE.PLAYING) {
      this.iterateDistance();
    }
  }
});