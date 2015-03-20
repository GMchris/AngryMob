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

    this.scheduleUpdate();
  },

  onEnter: function() {
    this._super();

    this.generateSegment(G.segment);

    this.pause();
  },

  /**
   * Sets general properties in the scene.
   */
  runGeneralSetup: function() {
    this.winSize = Game.set('winSize', cc.director.getWinSize());
    Game.set('speed', G.INITIAL_SPEED);
  },

  /**
   * Creates and adds all layers to the scene.
   */
  instantiateLayers: function() {
    this.backgroundLayer = new BackgroundLayer();
    this.gameObjectsLayer = new GameObjectsLayer();

    this.addChild(this.backgroundLayer);
    this.addChild(this.gameObjectsLayer);
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

  generateSegment: function(segmentData) {
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

  pause: function() {
    cc.director.pause();
  },

  resume: function() {
    cc.director.resume();
  },

  update: function(dt) {

  }
});