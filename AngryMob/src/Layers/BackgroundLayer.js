// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var BackgroundLayer = cc.Layer.extend({
  background_segment_one: null,
  background_segment_two: null,
  speed: 0,

  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this._super();

    this.speed = 10;

    this.winSize = cc.director.getWinSize();
    this.setAnchorPoint(0, 0);

    this.backgroundOne = new BackgroundSegment(res.world_01_background_01);
    this.backgroundTwo = new BackgroundSegment(res.world_01_background_02);

    this.backgroundHeight = this.backgroundOne.height;

    this.backgroundOne.setPosition(0, 0);
    this.backgroundTwo.setPosition(0, this.backgroundHeight);

    this.addChild(this.backgroundOne);
    this.addChild(this.backgroundTwo);

    this.scheduleUpdate();
  },

  update: function() {
    this.backgroundOne.y -= this.speed;
    this.backgroundTwo.y -= this.speed;

    if (this.backgroundOne.y  <= -this.backgroundHeight) {
      this.backgroundOne.y = this.backgroundTwo.y + this.backgroundHeight;
    }

    if (this.backgroundTwo.y <= -this.backgroundHeight) {
      this.backgroundTwo.y = this.backgroundOne.y + this.backgroundHeight;
    }
  }
});