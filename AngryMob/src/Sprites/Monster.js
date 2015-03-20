// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Monster = cc.Sprite.extend({
  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0.5, 0);
    this.setPosition(300, 200);
    this.winSize = Game.get('winSize');

    this.scheduleUpdate();
  },
  /**
   * Moves the monster to a specified point over a given duration.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} duration
   */
  animateTo: function(x, y, duration) {
    this.runAction(cc.moveTo(duration, x, y));
  },

  update: function() {
    this.zIndex = this.winSize.height - this.y;
  }
});