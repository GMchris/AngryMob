// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var SoulCounter = cc.Sprite.extend({
  ctor: function() {
    this._super('#soul_counter.png');

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0, 1);
    this.setPosition(15, 1115);

    this.label = new cc.LabelTTF('0', G.DEFAULT_FONT, 45);
    this.label.strokeStyle = cc.color.BLACK;
    this.label.lineWidth = 4;
    this.label.setAnchorPoint(0, 1);
    this.label.setPosition(75, 65);
    this.addChild(this.label);
  },

  setLabelText: function(labelString) {
    this.label.setString(labelString);
  }
});