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
    this.distanceCounter = new DistanceCounter();
    this.soulCounter = new SoulCounter();
    this.quitButton = new Button('Quit', cc.p(15, 15), function(){console.log('butts')});

    this.addChild(this.speedBar);
    this.addChild(this.distanceCounter);
    this.addChild(this.soulCounter);
    this.addChild(this.quitButton);
  },

  transitionToMainMenu: function() {
    cc.director.runScene(new MainMenuScene());
  }
});