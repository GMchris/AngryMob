// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Monster = cc.Sprite.extend({
  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0.5, 0);
    this.setPosition(300, 200);
    this.winSize = cc.director.getWinSize();

    this.scheduleUpdate();
  },
  update: function() {
    this.zIndex = this.winSize.height - this.y;
  }
});