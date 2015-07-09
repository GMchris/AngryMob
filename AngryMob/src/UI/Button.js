// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Button = cc.MenuItemSprite.extend({
  ctor: function(labelString, position, callback, image, downImage, disabledImage) {

    var normalSprite = new cc.Sprite(image || '#common_button.png');
    var activeSprite =  new cc.Sprite(downImage || image || '#common_button_active.png');
    var disabledSprite = new cc.Sprite(disabledImage || image || '#common_button_active.png');

    if (image && !downImage) {
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

    function getDarkerActiveButton(image){

    }

    this.setPosition(position);
    this.labelString = labelString;

    this.init();
  },

  init: function() {
    this.setAnchorPoint(0, 0);

    this.label = new cc.LabelTTF(this.labelString, G.DEFAULT_FONT, 50);
    this.label.setPosition(this.width/2, this.height/2);
    this.label.color = new cc.Color(21,21,21);
    this.label.verticalAlign = 1;
    this.addChild(this.label);
  }
});