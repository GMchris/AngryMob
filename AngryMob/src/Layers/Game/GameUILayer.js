// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameUILayer = cc.Layer.extend({
  speedBar: null,
  distanceCounter: null,
  soulCounter: null,
  menu: null,
  quitButton: null,
  particleSystem: null,
  soulCanister: null,
  collectedSoulsTemp: 0,
  collectedSoulsStep: 0,

  ctor: function(gameScene) {
    this._super();

    this.gameScene = gameScene;

    this.init();
  },
  init: function() {

    this.speedBar = new SpeedBar(this.gameScene);
    this.distanceCounter = new DistanceCounter();
    this.soulCounter = new SoulCounter();
    this.quitButton = new Button('Quit', cc.p(15, 15), this.transitionToMainMenu);
    this.menu = new cc.Menu(this.quitButton);
    this.menu.setPosition(0, 0);

    this.generateGameEndContent();
    this.addChild(this.speedBar);
    this.addChild(this.distanceCounter);
    this.addChild(this.soulCounter);
    this.addChild(this.menu);
  },

  run: function() {
    this.speedBar.showSpeedBar();
    this.particleSystem.stopSystem();
    this.onGameEnd(2000);
  },

  /**
   * Shows the menu and pauses actions.
   */
  onPause: function() {
    this.speedBar.currentSpeedBar.pause();
    this.menu.setVisible(true);
  },

  /**
   * Hides the menu and resumes actions.
   */
  onResume: function() {
    this.speedBar.currentSpeedBar.resume();
    this.menu.setVisible(false);
  },

  /**
   * Handles the game ending animations and calculations.
   */
  onGameEnd: function(soulsCollected) {
    this.soulsCollectedTemp = soulsCollected;

    this.speedBar.hideSpeedBar();
    this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.initiateAftermath, this)));
  },

  initiateAftermath: function() {
    this.soulCanister.runAction(cc.sequence(
      cc.scaleTo(0.2, 0.5),
      cc.scaleTo(0.1, 0.4),
      cc.delayTime(0.4),
      cc.callFunc(this.startParticleSystem, this))
    );
  },

  startParticleSystem: function() {
    this.particleSystem.resetSystem();
    this.iterateCollectedSouls();
  },

  iterateCollectedSouls: function() {
    var collectedSoulsStep = this.soulsCollectedTemp / 20;
    var soulCount = 0;

    var scaleCanisterAction = cc.sequence(cc.delayTime(0.1), cc.callFunc(
        function() {
          soulCount += collectedSoulsStep;
          var souls = soulCount.clamp(0, 2000) / 2000;
          this.soulCanister.setScale(Math.lerp(0.4, 1.3, souls));
        },
        this
    ));

    scaleCanisterAction.repeat(20);
    this.runAction(cc.sequence(scaleCanisterAction
    ));
  },

  generateGameEndContent: function() {
    this.particleSystem = cc.ParticleSystem.create(res.canister_particles);
    this.particleSystem.setPosition(45, 1080);

    this.soulCanister = new cc.Sprite('#soul_canister.png');
    this.soulCanister.setPosition(300, 650);
    this.soulCanister.setRotation(20);
    this.soulCanister.setScale(0);

    this.addChild(this.soulCanister);
    this.addChild(this.particleSystem);
  },

  transitionToMainMenu: function() {
    cc.director.runScene(new MainMenuScene());
  }
});