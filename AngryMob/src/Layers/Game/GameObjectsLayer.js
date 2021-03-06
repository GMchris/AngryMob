// AngryMob Copyright (c) 2015 Kristian Ignatov

var GameObjectsLayer = cc.Layer.extend({
  SEGMENT_GAP: 5,
  batch: null,
  pBatch: null,
  particleSystems: null,
  overlay: null,
  clickIndicator: null,
  clickIndicatorScaleAction: null,
  availableSegmentIndices: [],
  unavailableSegmentIndices: [],
  availablePowerups: [],

  init: function(gameScene) {
    this.winSize = Game.get('winSize');
    this.particleSystems = [];
    this.gameScene = gameScene;

    for (var segmentIndex= 0; segmentIndex < G.SEGMENTS.length; segmentIndex++) {
      this.availableSegmentIndices.push(segmentIndex);
    }

    this.batch = new cc.SpriteBatchNode(res['world_' + gameScene.worldType + '_png'], 200);

    this.addChild(this.batch);

    this.instantiatePlayer();
    this.instantiateObstacles();
    this.instantiateSouls();
    this.instantiatePowerups();
    this.instantiateEffects();
    this.instantiateMob();
    this.instantiatePauseOverlay();

    this.scheduleUpdate();
  },

   /**
    * Creates and adds the player sprite and all properties relating to it.
    */
   instantiatePlayer: function() {
     this.gameScene.player = new Monster();
     this.batch.addChild(this.gameScene.player);

     this.gameScene.playerBoundary = {
         top: 900,
         right: 540,
         bottom: 100,
         left: 40
     }
   },
  /**
   * Creates and adds a pool of obstacles.
   */
   instantiateObstacles: function() {
     this.gameScene.obstacles = [];

     for (var typeIndex = 0; typeIndex < G.OBSTACLE_COUNT ; typeIndex++ ) {
       this.gameScene.obstacles[typeIndex] = [];
       for (var poolIndex = 0; poolIndex < G.OBSTACLE_POOL_COUNT ; poolIndex++ ) {
         this.gameScene.obstacles[typeIndex][poolIndex] = new Obstacle(typeIndex, this.gameScene);
         this.batch.addChild(this.gameScene.obstacles[typeIndex][poolIndex]);
       }
     }
   },

  /**
   * Creates and adds a pool of souls.
   */
   instantiateSouls: function() {
     this.gameScene.souls = [];
     this.gameScene.souls[G.COMMON_SOUL_TYPE] = [];
     this.gameScene.souls[G.SPECIAL_SOUL_TYPE] = [];
     this.gameScene.souls[G.LEGENDARY_SOUL_TYPE] = [];

     for (var commonSoulIdx = 0; commonSoulIdx < G.COMMON_SOUL_POOL_COUNT ; commonSoulIdx++) {
         this.gameScene.souls[G.COMMON_SOUL_TYPE][commonSoulIdx] = new Soul(G.COMMON_SOUL_TYPE, this.gameScene);
         this.batch.addChild(this.gameScene.souls[G.COMMON_SOUL_TYPE][commonSoulIdx]);
     }

     for (var specialSoulIdx = 0; specialSoulIdx < G.SPECIAL_SOUL_POOL_COUNT ; specialSoulIdx++) {
       this.gameScene.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx] = new Soul(G.SPECIAL_SOUL_TYPE, this.gameScene);
       this.batch.addChild(this.gameScene.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx]);
     }

     for (var legendarySoulIndex = 0; legendarySoulIndex < G.LEGENDARY_SOUL_POOL_COUNT ; legendarySoulIndex++) {
       this.gameScene.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex] = new Soul(G.LEGENDARY_SOUL_TYPE, this.gameScene);
       this.batch.addChild(this.gameScene.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex]);
     }
   },

  instantiatePowerups: function() {

    // Creates an array of only the powersup the player can use.
    var powerupMemory = Memory.get('powerups');

    for (var powerupMemIndex = 0; powerupMemIndex < powerupMemory.length; powerupMemIndex++) {
      if (powerupMemory[powerupMemIndex] === G.OWNED) {
        this.availablePowerups.push(powerupMemIndex);
      }
    }

    this.gameScene.powerups = [];

    for (var typeIndex = 0; typeIndex < G.POWERUP_COUNT ; typeIndex++ ) {
      this.gameScene.powerups[typeIndex] = [];
      for (var poolIndex = 0; poolIndex < G.POWERUP_POOL_COUNT ; poolIndex++ ) {
        this.gameScene.powerups[typeIndex][poolIndex] = new Powerup(typeIndex, this.gameScene);
        this.batch.addChild(this.gameScene.powerups[typeIndex][poolIndex]);
      }
    }
  },

  /**
   * Creates and adds effects.
   */
  instantiateEffects: function() {
    this.gameScene.soulShards = [];
    for (var soulShardIdx = 0; soulShardIdx < G.SOUL_SHARD_COUNT; soulShardIdx++) {
      this.gameScene.soulShards[soulShardIdx] = new SoulShard();
      this.addChild(this.gameScene.soulShards[soulShardIdx]);
    }

    this.terrainParticleSystem = new cc.ParticleSystem(res.terrain_particles);
    this.terrainParticleSystem.setPosition(G.OFFSCREEN_POSITION);
    this.addChild(this.terrainParticleSystem);

    this.dustParticleSystem = new cc.ParticleSystem(res.dust_particles);
    this.addChild(this.dustParticleSystem);

    this.electricityParticleSystem = new cc.ParticleSystem(res.electricity_particles);
    this.electricityParticleSystem.setPosition(G.OFFSCREEN_POSITION);
    this.electricityParticleSystem.stopSystem();
    this.addChild(this.electricityParticleSystem);

    this.magnetParticleSystem = new cc.ParticleSystem(res.magnet_particles);
    this.magnetParticleSystem.setPosition(G.OFFSCREEN_POSITION);
    this.magnetParticleSystem.positionType = 2;
    this.magnetParticleSystem.stopSystem();
    this.addChild(this.magnetParticleSystem);
  },

  instantiateMob: function() {
    this.mob = new Mob();

    this.addChild(this.mob);
  },

  moveMob: function() {
    var y = switchCase(Game.get('lives'), [0, -25, -50, -80, -80]);

    this.mob.runAction(cc.moveTo(2, 0, y));
  },

  instantiatePauseOverlay: function() {
    this.overlay = new cc.LayerGradient(cc.color(0, 0, 0, 255), cc.color(27, 46, 60, 255));
    this.overlay.opacity = 0;
    this.addChild(this.overlay);

    this.clickIndicator = new cc.Sprite('#click_indicator.png');

    this.addChild(this.clickIndicator);

    this.overlayFadeInAction = cc.fadeTo(0.2, 120);
    this.clickIndicatorScaleAction = cc.scaleTo(0.1, 1);

    this.overlayFadeInAction.retain();
    this.clickIndicatorScaleAction.retain();
  },

  onPause: function() {
    this.showOverlay(this.gameScene.player.getPosition());
    this.gameScene.player.pause();
    this.dustParticleSystem.pause();
    this.terrainParticleSystem.pause();
    this.electricityParticleSystem.pause();
    this.magnetParticleSystem.pause();
    this.mob.pause();
  },

  onResume: function() {
    this.hideOverlay();
    this.gameScene.player.resume();
    this.dustParticleSystem.resume();
    this.terrainParticleSystem.resume();
    this.electricityParticleSystem.resume();
    this.magnetParticleSystem.resume();
    this.mob.resume();
  },

  onObstacleCollision: function(obstacle) {
    this.terrainParticleSystem.x = obstacle.x + (obstacle.width / 2);
    this.terrainParticleSystem.y = obstacle.y + (obstacle.height / 2);
    this.terrainParticleSystem.resetSystem();
    obstacle.deactivate();
  },

  /**
   * Shows the overlay and positions the click indicator under the player.
   * @param {cc.Point} playerPos
   */
  showOverlay: function(playerPos) {
    this.overlay.runAction(this.overlayFadeInAction);
    this.clickIndicator.setPosition(playerPos);
    this.clickIndicator.setScale(1.5);
    this.clickIndicator.runAction(this.clickIndicatorScaleAction);
  },

  hideOverlay: function() {
    this.overlay.stopAllActions();
    this.overlay.opacity = 0;
    this.clickIndicator.stopAllActions();
    this.clickIndicator.setPosition(G.OFFSCREEN_POSITION);
  },

  fadeInOverlay: function() {
    this.overlay.runAction(cc.fadeIn(2));
  },

  /**
   * Fetches an available obstacle from the pool, with a given type.
   * @param {Number} type
   * @returns {Obstacle}
   */
  getObstacle: function(type) {
      var pool = this.gameScene.obstacles[type];

      for (var i = 0; i< pool.length ; i++) {
          if (!pool[i].inUse) {
              return pool[i];
          }
      }
      // If no items from that pool are free, create a new one.
      var obstacle = new Obstacle(type);

      pool.push(obstacle);
      this.batch.addChild(obstacle);

      return obstacle;
  },

    /**
     * Fetches an available soul from the pool, with a given type.
     * @param {Number} type
     * @returns {Obstacle}
     */
  getSoul: function(type) {
      var pool = this.gameScene.souls[type];

      for (var i = 0; i< pool.length ; i++) {
          if (!pool[i].inUse) {
              return pool[i];
          }
      }
      // If no items from that pool are free, create a new one.
      var soul = new Soul(type, this.gameScene);

      pool.push(soul);
      this.batch.addChild(soul);

      return soul;
  },

  getPowerup: function(type) {
    var pool = this.gameScene.powerups[type];

    for (var i = 0; i< pool.length ; i++) {
      if (!pool[i].inUse) {
        return pool[i];
      }
    }
    // If no items from that pool are free, create a new one.
    var powerup = new Powerup(type, this.gameScene);

    pool.push(powerup);
    this.batch.addChild(powerup);

    return powerup;
  },

  getSoulShard: function() {
    var pool = this.gameScene.soulShards;

    for (var i = 0; i< pool.length; i++) {
      if (!pool[i].inUse) {
        return pool[i];
      }
    }

    // If no items from that pool are free, creata a new one.
    var soulShard = new SoulShard();

    pool.push(soulShard);
    this.batch.addChild(soulShard);

    return soulShard;
  },

  /**
   * Positions game objects from the pool to the screen based on a configuration object.
   */
  generateSegment: function() {
      var idx = this.getSegmentIndex();
      var segmentData = G.SEGMENTS[idx];
      var obstacles = segmentData.obstacles;
      var souls = segmentData.souls;
      var powerup = segmentData.powerup;

      if (obstacles) {
          for (var obstacleIndex = 0; obstacleIndex < obstacles.length; obstacleIndex++) {
              var oItem = obstacles[obstacleIndex];
              var obstacle = this.getObstacle(oItem.type);
              obstacle.activate(oItem.x, oItem.y);
              obstacle.flippedX = oItem.flipped;
          }
      }

      if (souls) {
          for (var soulIndex = 0; soulIndex < souls.length; soulIndex++) {
              var sItem = souls[soulIndex];
              var soul = this.getSoul(sItem.type);
              soul.activate(sItem.x, sItem.y);
          }
      }

      if (powerup) {
          var powerupItem = this.getPowerup(this.getPowerupType());
          powerupItem.activate(powerup.x, powerup.y);
      }
  },

  /**
   * Gets an appropriate index for a segment.
   */
  getSegmentIndex: function() {
      var index;
      var max = this.availableSegmentIndices.length - 1;

      index = this.availableSegmentIndices.splice([Math.floor(Math.random()*(max+1))], 1)[0];

      this.unavailableSegmentIndices.push(index);

      // Segments that haven't been used in five cycles are re-added to the options.
      if (this.unavailableSegmentIndices.length > this.SEGMENT_GAP) {
        this.availableSegmentIndices.push(this.unavailableSegmentIndices.shift());
      }

      return index;
  },

  getPowerupType: function() {
    var index = Math.randomBetween(0, this.availablePowerups.length - 1);

    return this.availablePowerups[index];
  },

  update: function() {
    var playerPosition = this.gameScene.player.getPosition();
    if (Game.get('activePowerUp') === G.POWERUPS.SPEED.TYPE) {
      this.electricityParticleSystem.setPosition(playerPosition);
    } else {
      this.dustParticleSystem.setPosition(playerPosition);
    }

    if (Game.get('activePowerUp') === G.POWERUPS.MAGNET.TYPE) {
      this.magnetParticleSystem.setPosition(playerPosition.x, playerPosition.y + 75);
    }
  }
});