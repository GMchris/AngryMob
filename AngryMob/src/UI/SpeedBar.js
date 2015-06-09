// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var SpeedBar = cc.Sprite.extend({
  MAX_HEIGHT: 300,
  speedPercent: 0,
  // One 'life' equals this much of the bar
  percentileSegment: 0,
  particleSystem: null,
  particleSystemPulseAction: null,

  gainLifeSequence: null,
  showSpeedBarAction: null,
  hideSpeedBarAction: null,

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
    this.setPosition(640, 700);
    this.setContentSize(15, 150);

    this.generateDynamicBar();
    this.generateParticleSystem();

    this.scheduleUpdate();
  },

  showSpeedBar: function() {
    this.runAction(this.showSpeedBarAction);
  },

  hideSpeedBar: function() {
    this.runAction(this.hideSpeedBarAction);
  },

  /**
   * Creates the dynamic portion of the bar.
   */
  generateDynamicBar: function() {
    this.currentSpeedBar = new cc.Sprite('#speed_bar.png');
    this.currentSpeedBar.setAnchorPoint(0, 0);
    this.currentSpeedBar.setPosition(13, 31);

    this.showSpeedBarAction = cc.moveTo(0.4, 580, 700);
    this.showSpeedBarAction.retain();
    this.hideSpeedBarAction = cc.moveTo(0.4, 640, 700);
    this.hideSpeedBarAction.retain();

    var backgroundSprite = new cc.Sprite('#speed_bar_container.png');

    backgroundSprite.addChild(this.currentSpeedBar);

    this.addChild(backgroundSprite);
  },

  generateParticleSystem: function() {
    this.particleSystem = cc.ParticleSystem.create(res.soul_fire_particles);
    this.particleSystem.setPosition(0, 150);
    this.particleSystemPulseAction = cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.2, 1));
    this.particleSystemPulseAction.retain();

    this.addChild(this.particleSystem);
  },

  /**
   * Calls the GameScene's gain life method and starts the sequence to gain another if not already at full speed.
   */
  gainLife: function() {
    this.gameScene.gainLife();
    this.particleSystem.runAction(this.particleSystemPulseAction);
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
    } else {
      this.particleSystem.stopSystem();
    }
  },

  /**
   * Starts animating the bar towards it's next 'milestone'.
   */
  startAcceleration: function() {
    var nextPercentage = Game.get('lives') + 1 >= Game.get('maxLives') ? 1 :
      (Game.get('lives') + 1) * this.percentileSegment / 100;

    var accAction = cc.scaleTo(G.REGAIN_SPEED_TIMEOUT, 1, nextPercentage);
    this.gainLifeSequence = cc.sequence(accAction, this.gainLifeCB);
    this.gainLifeSequence.retain();
    this.currentSpeedBar.runAction(this.gainLifeSequence);
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
  },

  update: function() {
    this.particleSystem.y = Math.lerp(-150, 150, this.currentSpeedBar.scaleY);
  }
});