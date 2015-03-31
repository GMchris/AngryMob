// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Soul = cc.Sprite.extend({
  inUse: false,
  outOfUsePosition: cc.p(-999, -999),

  ctor: function(type) {
    this._super('#soul_'+ type + '.png');

    this.init();
  },

  init: function() {
    this.winSize = Game.get('winSize');
    this.setPosition(this.outOfUsePosition);
    this.setAnchorPoint(0, 0);
    this.collider = cc.rect(0, 0, 60, 30);

    this.scheduleUpdate();
  },
  /**
   * Makes the sprite active and sets it's position.
   * @param {Number} x
   * @param {Number} y
   */
  activate: function(x, y) {
    this.setPosition(x, Game.get('winSize').height + y);
    this.inUse = true;
  },

  /**
   * Makes the sprite inactive and positions it out of the game screen.
   */
  deactivate: function(x, y) {
    this.setPosition(this.outOfUsePosition);
    this.inUse = false;
  },

  move: function() {
    this.y -= Game.get('speed');
  },

  update: function() {
    if (this.inUse) {

      this.move();

      if (this.y + this.height < 0) {
        this.deactivate();
      }
    }
  }
});