// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameUILayer = cc.Layer.extend({
  ctor: function(gameScene) {
    this._super();

    this.gameScene = gameScene;

    this.init();
  },
  init: function() {
    this.winSize = Game.get('winSize');

    this.speedBar = new SpeedBar(this.gameScene);

    this.addChild(this.speedBar);
  }
});