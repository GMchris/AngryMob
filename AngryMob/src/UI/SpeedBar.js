// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var SpeedBar = cc.Sprite.extend({
  MAX_HEIGHT: 300,
  speedPercent: 0,
  textureRect: cc.rect(0, 0, 30, 0),
  // One 'life' equals this much of the bar
  percentileSegment: 0,
  //
  sectionMilestones: [],

  ctor: function() {
    this._super();

    this.speedPercent = 100;
    this.percentileSegment = Math.floor(this.speedPercent / Game.get('maxLives'));

    this.init();
  },

  init: function() {
    this.setPosition(550, Game.get('winSize').height / 2);
    this.setContentSize(30, 300);

    this.sectionMilestones = [];

    this.bar = cc.Sprite.create();
    this.bar.setColor(cc.color.GREEN);
    this.bar.setTextureRect(this.textureRect);
    this.bar.setAnchorPoint(0, 0);
    this.addChild(this.bar);

    this.calculateHeight();

    this.scheduleUpdate();
  },

  gainLife: function() {

  },

  loseLife: function() {
    this.speedPercent = Game.get('lives') * this.percentileSegment;
    this.calculateHeight();
  },

  incrementSpeed: function() {

  },

  /**
   * Sets the speed bar at a percent of its maximum height.
   */
  calculateHeight: function() {
    this.textureRect.height = this.MAX_HEIGHT/100 * this.speedPercent;
    this.bar.setTextureRect(this.textureRect);
  },

  update: function() {

  }
});