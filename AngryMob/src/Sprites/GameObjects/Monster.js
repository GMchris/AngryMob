// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Monster = cc.Sprite.extend({
  isVulnerable: false,
  receiveDamageAction: null,

  ctor: function() {
    this._super.apply(this, arguments);
    this.isVulnerable = true;

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0.5, 0);
    this.setPosition(300, 200);
    this.winSize = Game.get('winSize');
    this.collider = ColliderGenerator.get('monster');
    this.computedCollider = cc.rect(0, 0, this.collider.width, this.collider.height);

    this.initiateActions();

    if (G.COLLISION_BOXES) {
      this.col = cc.Sprite.create();
      this.col.setColor(cc.color.GREEN);
      this.col.setTextureRect(this.collider);
      this.col.setAnchorPoint(0, 0);
      this.col.setPosition(this.collider.x, this.collider.y);
      this.addChild(this.col);
    }

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

  initiateActions: function() {
    var actions = [
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.callFunc(this.receiveDamageCallback, this)
    ];

    this.receiveDamageAction = cc.sequence(actions);
    this.receiveDamageAction.retain();
  },

  receiveDamageCallback: function() {
    this.isVulnerable = true;
  },

  receiveDamage: function() {
    this.isVulnerable = false;
    this.runAction(this.receiveDamageAction);
  },

  computeCollider: function() {
    this.computedCollider.y = this.y + this.collider.y;
    this.computedCollider.x = (this.x - this.width/2) + this.collider.x;
  },

  update: function() {
    this.zIndex = this.winSize.height - this.y;
    this.computeCollider();
  }
});