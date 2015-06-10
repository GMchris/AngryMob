// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var SoulShard = cc.Sprite.extend({
  inUse: false,
  pickUpAnimation: null,
  ctor: function() {
    this._super('#soul_shard.png');
    this.setPosition(G.OFFSCREEN_POSITION);
    this.setScale(0.3);

    // Each soul shard generates it's own random emission angle for when it's activated.
    var angle = Math.randomBetween(-30, 30);

    this.pickUpAnimation = cc.sequence(
      cc.scaleTo(0.2, 1),
      cc.moveBy(0.5, angle, 80),
      cc.moveTo(0.5, G.SOUL_COUNTER_POSITION).easing(cc.easeOut(0.8)),
      cc.callFunc(this.deactivate, this)
    );

    this.pickUpAnimation.retain();
  },

  activate: function(position) {
    this.inUse = true;
    position.y += 100;
    this.setPosition(position);
    this.runAction(this.pickUpAnimation);
  },

  deactivate: function() {
    this.setScale(0.3);
    this.inUse = false;
    this.setPosition(G.OFFSCREEN_POSITION);
  }
});