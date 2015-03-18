// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameScene = cc.Scene.extend({
  // Constant
  OBSTACLE_COUNT: 10,
  OBSTACLE_POOL_COUNT: 5,

  // General
  winSize: null,

  // Game objects
  player: null,
  playerBoundary: null,
  obstacles: null,

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

    cc.eventManager.addListener(this.createTouchHandler(), this.gameObjectsLayer);
    this.scheduleUpdate();
  },

  /**
   * Sets general properties in the scene.
   */
  runGeneralSetup: function() {
    this.winSize = cc.director.getWinSize();
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
    this.obstacle = [];

    for (var obstacleTypeIndex = 0; obstacleTypeIndex < this.OBSTACLE_COUNT ; obstacleTypeIndex++ ) {
      for (var obstacleIndex = 0; obstacleIndex < this.OBSTACLE_POOL_COUNT ; obstacleIndex++ ) {
        this.obstacle[obstacleTypeIndex] = [];
        this.obstacle[obstacleTypeIndex][obstacleIndex] = new Obstacle('#obstacle_0' + obstacleTypeIndex + '.png');
        this.gameObjectsLayer.addChild(this.obstacle[obstacleTypeIndex][obstacleIndex]);
      }
    }
  },

  /**
   * Returns a touch event.
   */
  createTouchHandler: function() {
    return cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function (e) {
        return true;
      },
      onTouchMoved: function (e) {
        var location = e.getLocation();
        location.x = location.x.clamp(this.playerBoundary.left, this.playerBoundary.right);
        location.y = location.y.clamp(this.playerBoundary.bottom, this.playerBoundary.top);
        this.player.setPosition(location);
        return true;
      }.bind(this),
      onTouchEnded: function (e) {
        return true;
      }
    });
  },

  update: function(dt) {

  }
});