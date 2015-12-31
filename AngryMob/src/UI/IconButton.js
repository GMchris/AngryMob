// AngryMob Copyright (c) 2015 Kristian Ignatov

var IconButton = cc.MenuItemSprite.extend({
  ctor: function(position, callback, image, downImage, disabledImage) {

    var normalSprite = new cc.Sprite(image);
    var activeSprite =  new cc.Sprite(downImage || image);
    var disabledSprite = new cc.Sprite(disabledImage || downImage || image);

    if (!downImage) {
      activeSprite.color = cc.color(100, 100, 100);
      activeSprite.setScale(0.9);
      activeSprite.x = activeSprite.width/2 - activeSprite.width*0.9/2;
      activeSprite.y = activeSprite.height/2 - activeSprite.height*0.9/2;
    }

    this._super(
        normalSprite,
        activeSprite,
        disabledSprite,
        callback
    );

    this.setPosition(position);

    this.init();
  },

  init: function() {
    this.setAnchorPoint(0, 0);
  }
});