// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameObjectsLayer = cc.Layer.extend({
  batch: null,
  overlay: null,

  init: function(gameScene) {

    this.gameScene = gameScene;

    this.batch = new cc.SpriteBatchNode(res['world_' + gameScene.worldType + '_png'], 100);
    this.addChild(this.batch);


    this.instantiatePlayer();
    this.instantiateObstacles();
    this.instantiateSouls();

    var winSize = Game.get('winSize');

    this.overlay = cc.Sprite.create();
    this.overlay.setColor(cc.color.BLACK);
    this.overlay.setTextureRect(cc.rect(0, 0, winSize.width, winSize.height));
    this.overlay.setAnchorPoint(0, 0);
    this.overlay.opacity = 0;
    this.addChild(this.overlay);
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
           this.gameScene.souls[G.COMMON_SOUL_TYPE][commonSoulIdx] = new Soul(G.COMMON_SOUL_TYPE);
           this.batch.addChild(this.gameScene.souls[G.COMMON_SOUL_TYPE][commonSoulIdx]);
       }

       //for (var specialSoulIdx = 0; specialSoulIdx < G.SPECIAL_SOUL_POOL_COUNT ; specialSoulIdx++) {
       //  this.gameScene.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx] = new Soul(G.SPECIAL_SOUL_TYPE);
       //  this.batch.addChild(this.gameScene.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx]);
       //}
       //
       //for (var legendarySoulIndex = 0; legendarySoulIndex < G.LEGENDARY_SOUL_POOL_COUNT ; legendarySoulIndex++) {
       //  this.gameScene.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex] = new Soul(G.LEGENDARY_SOUL_TYPE);
       //  this.batch.addChild(this.gameScene.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex]);
       //}
   },

    fadeInOverlay: function() {
      this.overlay.runAction(cc.fadeIn(4));
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
        var soul = new Soul(type);

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
                var item = obstacles[i];
                var obstacle = this.getObstacle(item.type);
                obstacle.activate(item.x, item.y);
                obstacle.flippedX = item.flipped;
                obstacle.first = item.first || false;
            }
        }

        if (souls) {
            for (var i = 0; i < souls.length; i++) {
                var item = souls[i];
                var soul = this.getSoul(item.type);
                soul.activate(item.x, item.y);
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