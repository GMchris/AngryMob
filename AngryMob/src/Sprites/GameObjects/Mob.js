// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Mob = cc.Sprite.extend({
  RUN_ANIMATION_SPEED: 0.2,
  frontSprite: null,
  backSprite: null,
  ctor: function() {
    this._super();
    this.init();
  },
  init: function() {
    this.winSize = Game.get('winSize');

    this.setPosition(0, -80);

    this.frontSprite = new cc.Sprite('#mob_front.png');
    this.frontSprite.setAnchorPoint(0, 0);
    this.frontSprite.setPosition(0, 0);

    this.backSprite = new cc.Sprite('#mob_back.png');
    this.backSprite.setAnchorPoint(0, 0);
    this.backSprite.setPosition(2, -10);

    this.frontSpriteAnimation = cc.sequence(cc.moveTo(this.RUN_ANIMATION_SPEED, 2, 5), cc.moveTo(this.RUN_ANIMATION_SPEED, 0, 0));
    this.frontSpriteAnimation.repeatForever();
    this.backSpriteAnimation = cc.sequence(cc.moveTo(this.RUN_ANIMATION_SPEED, 0, -5), cc.moveTo(this.RUN_ANIMATION_SPEED, -2, 0));
    this.backSpriteAnimation.repeatForever();

    this.addChild(this.frontSprite);
    this.addChild(this.backSprite);

    this.frontSprite.runAction(this.frontSpriteAnimation);
      this.backSprite.runAction(this.backSpriteAnimation);
  },

  pause: function() {
    this.frontSprite.pause();
    this.backSprite.pause();
  },

  resume: function() {
    this.frontSprite.resume();
    this.backSprite.resume();
  }
});