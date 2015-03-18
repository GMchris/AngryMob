// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Obstacle = cc.Sprite.extend({
  inUse: false,
  speed: 0,
  outOfUsePosition: cc.p(-999, -999),

  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },

  init: function() {
    this.speed = 10;
    this.winSize = cc.director.getWinSize();
    this.setPosition(this.outOfUsePosition);
    this.setAnchorPoint(0, 0);

    this.scheduleUpdate();
  },
  /**
   *
   * @param {Number} x
   * @param {Number} y
   */
  activate: function(x, y) {
    this.setPosition(x, y);
    this.inUse = true;
  },

  update: function() {
    if (this.inUse) {
      this.y -= this.speed;
      this.zIndex = this.winSize.height - this.y;

      if (this.y + this.height < 0) {
        this.inUse = false;
        this.setPosition(this.outOfUsePosition);
      }
    }
  }
});