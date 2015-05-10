// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameScene = cc.Scene.extend({

  // Own properties.
  worldType: 0, //TODO: Set this dynamically.

  // Game objects.
  player: null,
  playerBoundary: null,
  obstacles: null,
  souls: null,

  // Layers.
  backgroundLayer: null,
  gameObjectsLayer: null,
  uiLayer: null,

  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },

  init: function() {

    // The order of the methods being called here is important. Some use properties set by others.
    this.runGeneralSetup();
    this.instantiateLayers();

    cc.eventManager.addListener(this.createTouchHandler(), this.gameObjectsLayer);
  },

  /**
   * INITIALIZATION #################################################################
   */

  onEnter: function() {
    this._super();

    this.gameObjectsLayer.generateSegment();
    this.runAction(this.upscaleSpeedAction);

    this.scheduleUpdate();
    this.pause();
  },

  /**
   * Sets general properties in the scene.
   */
  runGeneralSetup: function() {
    this.winSize = Game.set('winSize', cc.director.getWinSize());
    Game.set('maxLives', 3);
    Game.set('lives', Game.get('maxLives'));
    this.setSpeed();
    this.upscaleSpeedAction = cc.sequence([cc.delayTime(G.SPEEDUP_TIMEOUT), cc.callFunc(this.upscaleSpeed, this)]);
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

  /**
   * BASIC GAME OPERATIONS #################################################################
   */

  gainLife: function() {
    Game.increment('lives');
    this.setSpeed();
  },

  loseLife: function() {
    Game.decrement('lives');
    this.uiLayer.speedBar.loseLife();
    this.setSpeed();

    if (Game.get('lives') <= 0) {
      this.endGame();
    }
  },

  endGame: function() {
    this.player.die();
    this.gameObjectsLayer.fadeInOverlay();
    Game.set('additionalSpeed', 0);
    Game.set('state', G.STATE.ENDING);
  },

  /**
   * Periodically called to raise the speed by one.
   */
  upscaleSpeed: function() {
    if (Game.get('state') === G.STATE.PLAYING) {
        Game.increment('additionalSpeed');
        this.runAction(this.upscaleSpeedAction);
    }
  },

  setSpeed: function() {
    Game.set('speed', G.SPEEDS[Game.get('lives')]);
    console.log(Game.get('computedSpeed'));
  },

  pause: function() {
    Game.set('state', G.STATE.PAUSED);
    cc.director.pause();
  },

  resume: function() {
    Game.set('state', G.STATE.PLAYING);
    cc.director.resume();
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
    if (Game.get('state') === G.STATE.PAUSED && cc.rectContainsPoint(this.player.getBoundingBox(), location)) {
      this.resume();
      this.player.animateTo(location.x, location.y, 0.05);
      return true;
    }
    return false;
  },

  onTouchMoved: function(e) {
    if (Game.get('state') === G.STATE.PLAYING) {
      var location = e.getLocation();
      location.x = location.x.clamp(this.playerBoundary.left, this.playerBoundary.right);
      location.y = location.y.clamp(this.playerBoundary.bottom, this.playerBoundary.top);
      this.player.setPosition(location);
    }
    return true;
  },

  onTouchEnded: function(e) {
    if (Game.get('state') === G.STATE.PLAYING) {
        this.pause();
    }
    return true;
  },

  // UPDATE METHODS #############################################################

  checkObstacleCollision: function() {
    if (this.player.isVulnerable) {
      for (var obstacleType = 0; obstacleType < G.OBSTACLE_COUNT ; obstacleType++ ) {
        for (var poolIndex = 0; poolIndex < G.OBSTACLE_POOL_COUNT ; poolIndex++ ) {
          var obstacle = this.obstacles[obstacleType][poolIndex];
          if (obstacle.inUse) {
            if (cc.rectIntersectsRect(obstacle.computedCollider, this.player.computedCollider)) {
              this.player.receiveDamage();
              this.loseLife();
              return true;
            }
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
          if (cc.rectIntersectsRect(soul.computedCollider, this.player.computedCollider)) {
            soul.deactivate();
            return true;
          }
        }
      }
    }
  },

  update: function() {
    if (Game.get('state') === G.STATE.PLAYING) {
      this.checkObstacleCollision();
      this.checkSoulCollision();
    }
  }
});