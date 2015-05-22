// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var MainMenuScene = cc.Scene.extend({
  backgroundLayer: null,
  uiLayer: null,

  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {
    this.backgroundLayer = new MenuBackgroundLayer();
    this.uiLayer = new MenuUILayer();

    this.addChild(this.backgroundLayer);
    this.addChild(this.uiLayer);
  }
});