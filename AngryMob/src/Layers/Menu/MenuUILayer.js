// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var MenuUILayer = cc.Layer.extend({
  ctor: function(scene) {
    this._super();
    this.scene = scene;

    this.init();
  },
  init: function() {

    this.playButton = new TextButton('Play', cc.p(15, 15), this.openCharacterRoster.bind(this));
    this.labButton = new TextButton('Lab', cc.p(365, 15), this.openLab);

    this.menu = new cc.Menu(this.playButton, this.labButton);
    this.menu.setPosition(0, 0);
    this.addChild(this.menu);

    var keyboardListener = cc.EventListener.create({
      event: cc.EventListener.KEYBOARD,
      onKeyReleased: stopGame
    });

    cc.eventManager.addListener(keyboardListener, this);
  },

  openCharacterRoster: function() {
    var dialog = new RosterDialog();

    this.scene.addChild(dialog);
  },

  startGame: function(id) {
    cc.director.runScene(new GameScene(id));
  },

  openLab: function() {
    cc.director.runScene(new LabScene());
  }
});