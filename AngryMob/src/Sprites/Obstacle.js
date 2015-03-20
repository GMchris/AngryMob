// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Obstacle = cc.Sprite.extend({
  gameScene: null,
  inUse: false,
  outOfUsePosition: cc.p(-999, -999),

  ctor: function(type, gameScene) {
    this._super('#obstacle_' + type + '.png');
    this.gameScene = gameScene;

    this.init();
  },

  init: function() {
    this.winSize = cc.director.getWinSize();
    this.setPosition(this.outOfUsePosition);
    this.setAnchorPoint(0, 0);

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
  deactivate: function() {
    this.setPosition(this.outOfUsePosition);
    this.inUse = false;
  },

  move: function() {
    this.y -= Game.get('speed');
  },

  update: function() {
    if (this.inUse) {

      this.move();
      this.zIndex = this.winSize.height - this.y;

      if (this.y + this.height < 0) {
        this.deactivate();
        if (this.first) {
          this.gameScene.generateSegment(G.segment);
        }
      }
    }
  }
});