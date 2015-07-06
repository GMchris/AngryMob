// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Button = cc.MenuItemSprite.extend({
  ctor: function(labelString, position, callback, image, downImage) {

    this._super(
      new cc.Sprite(image || '#common_button.png'),
      new cc.Sprite(downImage || image || '#common_button_active.png'),
      new cc.Sprite(downImage || image || '#common_button_active.png'),
      callback
    );

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