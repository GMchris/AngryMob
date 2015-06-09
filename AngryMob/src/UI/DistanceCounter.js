// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var DistanceCounter = cc.Sprite.extend({
  ctor: function() {
    this._super('#distance_counter.png');

    this.init();
  },
  init: function() {
    this.setAnchorPoint(1, 1);
    this.setPosition(585, 1115);

    this.label = new cc.LabelTTF('0', G.DEFAULT_FONT, 45);
    this.label.strokeStyle = cc.color.BLACK;
    this.label.lineWidth = 4;
    this.label.setAnchorPoint(1, 1);
    this.label.setPosition(185, 65);
    this.addChild(this.label);
  },

  setLabelText: function(labelString) {
    this.label.setString(labelString);
  }
});