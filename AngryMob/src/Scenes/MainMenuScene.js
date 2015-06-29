// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var MainMenuScene = cc.Scene.extend({
  backgroundLayer: null,
  uiLayer: null,

  ctor: function() {
    this._super.apply(this, arguments);
    this.winSize = Game.set('winSize', cc.director.getWinSize());

    this.init();
  },
  init: function() {
    this.backgroundLayer = new MenuBackgroundLayer();
    this.uiLayer = new MenuUILayer();

    flurry.logEvent('Main menu', null);

    this.addChild(this.backgroundLayer);
    this.addChild(this.uiLayer);
  }
});