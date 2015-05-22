// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var MenuUILayer = cc.Layer.extend({
  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },
  init: function() {

    this.playButton = new Button('Play', cc.p(20, 30), this.startGame);
    this.labButton = new Button('Lab', cc.p(320, 30), this.openLab);

    this.menu = new cc.Menu(this.playButton, this.labButton);
    this.menu.setPosition(0, 0);
    this.addChild(this.menu);
  },

  startGame: function() {
    cc.director.runScene(new GameScene(0));
  },

  openLab: function() {
    cc.director.runScene(new LabScene());
  }
});