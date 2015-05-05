// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameScene = cc.Scene.extend({

  // Game objects
  player: null,
  playerBoundary: null,
  obstacles: null,
  souls: null,

  // Layers
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
    this.instantiatePlayer();
    this.instantiateObstacles();
    this.instantiateSouls();

    cc.eventManager.addListener(this.createTouchHandler(), this.gameObjectsLayer);
  },

  /**
   * INITIALIZATION #################################################################
   */

  onEnter: function() {
    this._super();

    this.generateSegment();

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
  },

  /**
   * Creates and adds all layers to the scene.
   */
  instantiateLayers: function() {
    this.backgroundLayer = new BackgroundLayer();
    this.gameObjectsLayer = new GameObjectsLayer();
    this.uiLayer = new GameUILayer(this);

    this.addChild(this.backgroundLayer);
    this.addChild(this.gameObjectsLayer);
    this.addChild(this.uiLayer);
  },

  /**
   * Creates and adds the player sprite and all properties relating to it.
   */
  instantiatePlayer: function() {
    this.player = new Monster('#frankie.png');
    this.gameObjectsLayer.addChild(this.player);

    this.playerBoundary = {
      top: 900,
      right: 540,
      bottom: 100,
      left: 40
    }
  },

  instantiateObstacles: function() {
    this.obstacles = [];

    for (var typeIndex = 0; typeIndex < G.OBSTACLE_COUNT ; typeIndex++ ) {
      this.obstacles[typeIndex] = [];
      for (var poolIndex = 0; poolIndex < G.OBSTACLE_POOL_COUNT ; poolIndex++ ) {
        this.obstacles[typeIndex][poolIndex] = new Obstacle(typeIndex, this);
        this.gameObjectsLayer.addChild(this.obstacles[typeIndex][poolIndex]);
      }
    }
  },

  instantiateSouls: function() {
    this.souls = [];
    this.souls[G.COMMON_SOUL_TYPE] = [];
    this.souls[G.SPECIAL_SOUL_TYPE] = [];
    this.souls[G.LEGENDARY_SOUL_TYPE] = [];

    for (var commonSoulIdx = 0; commonSoulIdx < G.COMMON_SOUL_POOL_COUNT ; commonSoulIdx++) {
      this.souls[G.COMMON_SOUL_TYPE][commonSoulIdx] = new Soul(G.COMMON_SOUL_TYPE);
      this.gameObjectsLayer.addChild(this.souls[G.COMMON_SOUL_TYPE][commonSoulIdx]);
    }

    //for (var specialSoulIdx = 0; specialSoulIdx < G.SPECIAL_SOUL_POOL_COUNT ; specialSoulIdx++) {
    //  this.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx] = new Soul(G.SPECIAL_SOUL_TYPE);
    //  this.gameObjectsLayer.addChild(this.souls[G.SPECIAL_SOUL_TYPE][specialSoulIdx]);
    //}
//
    //for (var legendarySoulIndex = 0; legendarySoulIndex < G.LEGENDARY_SOUL_POOL_COUNT ; legendarySoulIndex++) {
    //  this.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex] = new Soul(G.LEGENDARY_SOUL_TYPE);
    //  this.gameObjectsLayer.addChild(this.souls[G.LEGENDARY_SOUL_TYPE][legendarySoulIndex]);
    //}
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
      console.log('dead');
    }
  },

  setSpeed: function() {
    Game.set('speed', G.SPEEDS[Game.get('lives')]);
    console.log(Game.get('computedSpeed'));
  },

  /**
   * Fetches an available obstacle from the pool, with a given type.
   * @param {Number} type
   * @returns {Obstacle}
   */
  getObstacle: function(type) {
    var pool = this.obstacles[type];

    for (var i = 0; i< pool.length ; i++) {
      if (!pool[i].inUse) {
        return pool[i];
      }
    }
    // If no items from that pool are free, creata a new one.
    var obstacle = new Obstacle(type);

    pool.push(obstacle);
    this.gameObjectsLayer.addChild(obstacle);

    return obstacle;
  },

  /**
   * Fetches an available soul from the pool, with a given type.
   * @param {Number} type
   * @returns {Obstacle}
   */
  getSoul: function(type) {
    var pool = this.souls[type];

    for (var i = 0; i< pool.length ; i++) {
      if (!pool[i].inUse) {
        return pool[i];
      }
    }
    // If no items from that pool are free, creata a new one.
    var soul = new Soul(type);

    pool.push(soul);
    this.gameObjectsLayer.addChild(soul);

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

  pause: function() {
    cc.director.pause();
  },

  resume: function() {
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
    if (cc.rectContainsPoint(this.player.getBoundingBox(), location)) {
      this.resume();
      this.player.animateTo(location.x, location.y, 0.05);
      return true;
    }
    return false;
  },

  onTouchMoved: function(e) {
    var location = e.getLocation();
    location.x = location.x.clamp(this.playerBoundary.left, this.playerBoundary.right);
    location.y = location.y.clamp(this.playerBoundary.bottom, this.playerBoundary.top);
    this.player.setPosition(location);
    return true;
  },

  onTouchEnded: function(e) {
    this.pause();
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

    this.checkObstacleCollision();
    this.checkSoulCollision();
  }
});