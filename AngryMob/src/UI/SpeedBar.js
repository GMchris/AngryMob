// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var SpeedBar = cc.Sprite.extend({
  MAX_HEIGHT: 300,
  speedPercent: 0,
  // One 'life' equals this much of the bar
  percentileSegment: 0,
  particleSystem: null,

  ctor: function(gameScene) {
    this._super();

    this.gameScene = gameScene;
    this.speedPercent = G.HUNDRED_PERCENT;
    this.percentileSegment = Math.floor(this.speedPercent / Game.get('maxLives'));
    this.gainLifeCB = cc.callFunc(this.gainLife, this);
    this.gainLifeCB.retain();

    this.init();
  },

  init: function() {
    this.setPosition(580, 700);
    this.setContentSize(15, 150);

    this.generateDynamicBar();
    this.generateParticleSystem();

    this.scheduleUpdate();
  },

  /**
   * Creates the dynamic portion of the bar.
   */
  generateDynamicBar: function() {
    this.currentSpeedBar = new cc.Sprite('#speed_bar.png');
    this.currentSpeedBar.setAnchorPoint(0, 0);
    var backgroundSprite = new cc.Sprite('#speed_bar_empty.png');

    backgroundSprite.addChild(this.currentSpeedBar);

    this.addChild(backgroundSprite);
  },

  generateParticleSystem: function() {
    this.particleSystem = cc.ParticleSystem.create(res.particles);
    this.particleSystem.setPosition(0, 150);

    this.addChild(this.particleSystem);
  },

  /**
   * Calls the GameScene's gain life method and starts the sequence to gain another if not already at full speed.
   */
  gainLife: function() {
    this.gameScene.gainLife();
    if (!Game.get('atMaxLives')) {
      this.startAcceleration();
    }
  },

  /**
   * Calls all functions related to losing a life.
   */
  loseLife: function() {
    this.stopAcceleration();
    this.speedPercent = Game.get('lives') <= 0 ? 0 : Game.get('lives') * this.percentileSegment;
    this.calculateHeight();
    if (Game.get('lives') > 0) {
      this.startAcceleration();
    }
  },

  /**
   * Starts animating the bar towards it's next 'milestone'.
   */
  startAcceleration: function() {
    var nextPercentage = Game.get('lives') + 1 >= Game.get('maxLives') ? 1 : (Game.get('lives') + 1) * this.percentileSegment / 100;

    var accAction = cc.scaleTo(G.REGAIN_SPEED_TIMEOUT, 1, nextPercentage);

    this.currentSpeedBar.runAction(cc.sequence(accAction, this.gainLifeCB));
  },

  /**
   * Stops an ongoing speed increase animation if these is one.
   */
  stopAcceleration: function() {
    this.currentSpeedBar.stopAllActions();
  },

  /**
   * Sets the speed bar at a percent of its maximum height.
   */
  calculateHeight: function() {
    this.currentSpeedBar.scaleY = this.speedPercent / G.HUNDRED_PERCENT;
  }
});