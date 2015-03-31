// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Obstacle = cc.Sprite.extend({
  gameScene: null,
  collider: null,
  computedCollider: null,
  inUse: false,
  outOfUsePosition: cc.p(-999, -999),

  ctor: function(type, gameScene) {
    this.type = type;
    this._super('#obstacle_' + type + '.png');
    this.gameScene = gameScene;

    this.collider = ColliderGenerator.getCollider(type);
    this.computedCollider = cc.rect(this.collider.x, 0, this.collider.width, this.collider.height);

    this.init();
  },

  init: function() {
    this.winSize = cc.director.getWinSize();
    this.setPosition(this.outOfUsePosition);
    this.setAnchorPoint(0, 0);

    this.col = cc.Sprite.create();
    this.col.setColor(cc.color.RED);
    this.col.setTextureRect(this.collider);
    this.col.setAnchorPoint(0, 0);
    this.col.setPosition(this.collider.x, this.collider.y);
    this.addChild(this.col);

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

  computeCollider: function() {
    this.computedCollider.y = this.y + this.collider.y;
    this.computedCollider.x = this.x + this.collider.x;
  },

  update: function() {
    if (this.inUse) {

      this.move();
      this.computeCollider();
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