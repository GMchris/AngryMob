// AngryMob Copyright (c) 2015 Kristian Ignatov

var TextButton = cc.MenuItemSprite.extend({
  ctor: function(labelString, position, callback) {

    var normalSprite = new cc.Sprite('#common_button.png');
    var activeSprite =  new cc.Sprite('#common_button_active.png');
    var disabledSprite = new cc.Sprite('#common_button_active.png');

    this._super(
      normalSprite,
      activeSprite,
      disabledSprite,
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