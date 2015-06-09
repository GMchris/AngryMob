// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameObjectsLayer = cc.Layer.extend({
  batch: null,
  pBatch: null,
  particleSystems: null,
  overlay: null,
  clickIndicator: null,
  clickIndicatorScaleAction: null,

  init: function(gameScene) {
    this.winSize = Game.get('winSize');
    this.particleSystems = [];
    this.gameScene = gameScene;

    this.batch = new cc.SpriteBatchNode(res['world_' + gameScene.worldType + '_png'], 100);

    this.addChild(this.batch);

    this.instantiatePlayer();
    this.instantiateObstacles();
    this.instantiateSouls();
    this.instantiateMob();
    this.instantiatePauseOverlay();
  },

   /**
    * Creates and adds the player sprite and all properties relating to it.
    */
   instantiatePlayer: function() {
     this.gameScene.player = new Monster('#monster_running_0.png');
     this.batch.addChild(this.gameScene.player);

     this.gameScene.playerBoundary = {
         top: 900,
         right: 540,
         bottom: 100,
         left: 40
     }
   },

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

  instantiateMob: function() {
    this.mob = new Mob();

    this.addChild(this.mob);
  },

  moveMob: function() {
    var y = switchCase(Game.get('lives'), [0, -25, -50, -80, -80]);

    this.mob.runAction(cc.moveTo(2, 0, y));
  },

  instantiatePauseOverlay: function() {
    this.overlay = new cc.LayerGradient(cc.color(0,0,0,255), cc.color(20, 64, 96, 255));
    this.overlay.opacity = 0;
    this.addChild(this.overlay);

    this.clickIndicator = cc.Sprite.create('#click_indicator.png');
    this.addChild(this.clickIndicator);

    this.overlayFadeInAction = cc.fadeTo(0.2, 120);
    this.clickIndicatorScaleAction = cc.scaleTo(0.1, 1);
    this.overlayFadeInAction.retain();
    this.clickIndicatorScaleAction.retain();
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
      // If no items from that pool are free, creata a new one.
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
        // If no items from that pool are free, creata a new one.
        var soul = new Soul(type, this.gameScene);

        pool.push(soul);
        this.batch.addChild(soul);

        return soul;
    },

    /**
     * Positions game objects from the pool to the screen based on a configuration object.
     * @param segmentData
     */
    generateSegment: function() {
        var segmentData = G.SEGMENTS[this.getSegmentIndex()];
        var obstacles = segmentData.obstacles;
        var souls = segmentData.souls;

        if (obstacles) {
            for (var i = 0; i < obstacles.length; i++) {
                var oItem = obstacles[i];
                var obstacle = this.getObstacle(oItem.type);
                obstacle.activate(oItem.x, oItem.y);
                obstacle.flippedX = oItem.flipped;
                obstacle.first = oItem.first || false;
            }
        }

        if (souls) {
            for (var i = 0; i < souls.length; i++) {
                var sItem = souls[i];
                var soul = this.getSoul(sItem.type);
                soul.activate(sItem.x, sItem.y);
            }
        }
    },

    /**
     * Gets an appropriate index for a segment.
     * TODO: Make it so the same segment cant appear more than once every five segments.
     */
    getSegmentIndex: function() {
        var index;
        var max = G.SEGMENTS.length - 1;

        index = Math.floor(Math.random()*(max+1));

        return index;
    }
});