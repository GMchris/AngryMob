// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameUILayer = cc.Layer.extend({
  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this.winSize = Game.get('winSize');

    this.speedBar = new SpeedBar();

    this.addChild(this.speedBar);
  }
});