// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Mob = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.init();
  },
  init: function() {
    this.winSize = Game.get('winSize');

    this.setPosition(0, -80);

    this.tempImage = cc.Sprite.create();
    this.tempImage.setColor(cc.color.BLACK);
    this.tempImage.setTextureRect(cc.rect(0, 0, this.winSize.width, 150));
    this.tempImage.setAnchorPoint(0, 0);
    this.tempImage.setPosition(0, 0);
    this.addChild(this.tempImage);
  }
});