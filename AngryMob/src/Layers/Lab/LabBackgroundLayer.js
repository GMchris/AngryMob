// AngryMob Copyright (c) 2015 Kristian Ignatov

var LabBackgroundLayer = LabLayer.extend({
  RIGHT_LIMIT: -320,

  init: function() {
    this._super();

    this.backgroundImage = new cc.Sprite('#lab_background.png');
    this.backgroundImage.setAnchorPoint(0, 0);
    this.addChild(this.backgroundImage);
  }
});