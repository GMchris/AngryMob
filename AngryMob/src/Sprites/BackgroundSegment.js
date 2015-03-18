// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var BackgroundSegment = cc.Sprite.extend({
  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0, 0);
  }
});