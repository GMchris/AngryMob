// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var GameUILayer = cc.Layer.extend({
  CANISTER_SOUL_FRAGMENTS: 50,

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

    this.quitButton = new Button('Quit', cc.p(15, 15), this.confirmTransitionToMainMenu.bind(this));

    this.menu = new cc.Menu(this.quitButton);
    this.menu.setPosition(0, 0);

    this.generateGameEndContent();
    this.addChild(this.speedBar);
    this.addChild(this.distanceCounter);
    this.addChild(this.soulCounter);
    this.addChild(this.menu);
  },

  generateGameEndContent: function() {
    this.particleSystem = cc.ParticleSystem.create(res.canister_particles);
    this.particleSystem.setPosition(45, 1080);

    this.soulCanister = new cc.Sprite('#soul_canister.png');
    this.soulCanister.setPosition(300, 650);
    this.soulCanister.setRotation(20);
    this.soulCanister.setScale(0);

    this.endingSoulsLabel = new cc.LabelTTF(Memory.get('souls').toString(), G.DEFAULT_FONT, 90);
    this.endingSoulsLabel.setPosition(300, 460);
    this.endingSoulsLabel.verticalAlign = 1;
    this.endingSoulsLabel.strokeStyle = cc.color.BLACK;
    this.endingSoulsLabel.lineWidth = 6;
    this.endingSoulsLabel.setScale(0);

    this.replayButton = new Button('Replay', cc.p(175, 125), this.gameScene.replay);
    this.menuButton = new Button('Menu', cc.p(175, 225), this.transitionToMainMenu);

    this.endGameMenu = new cc.Menu(this.replayButton, this.menuButton);
    this.endGameMenu.setPosition(0, 0);
    this.endGameMenu.setScale(0);

    this.scaleUpButtonAction = cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.1, 1));
    this.scaleUpButtonAction.retain();

    this.addChild(this.soulCanister);
    this.addChild(this.particleSystem);
    this.addChild(this.endingSoulsLabel);
    this.addChild(this.endGameMenu);
  },

  run: function() {
    this.speedBar.showSpeedBar();
    this.particleSystem.stopSystem();
  },

  /**
   * Shows the menu and pauses actions.
   */
  onPause: function() {
    this.speedBar.currentSpeedBar.pause();
    this.speedBar.particleSystem.pause();
    this.menu.setVisible(true);
  },

  /**
   * Hides the menu and resumes actions.
   */
  onResume: function() {
    this.speedBar.currentSpeedBar.resume();
    this.speedBar.particleSystem.resume();

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
      cc.scaleTo(0.2, 0.6),
      cc.scaleTo(0.1, 0.5),
      cc.delayTime(0.4),
      cc.callFunc(this.startParticleSystem, this))
    );
  },

  startParticleSystem: function() {
    var emissionRate = this.soulsCollectedTemp / 15;
    emissionRate = emissionRate > 50 ? 50 : emissionRate;
    this.particleSystem.setEmissionRate(emissionRate);
    this.particleSystem.resetSystem();
    this.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(this.iterateCollectedSouls, this)));
  },

  iterateCollectedSouls: function() {
    var collectedSoulsStep = this.soulsCollectedTemp / this.CANISTER_SOUL_FRAGMENTS;
    var soulCount = 0;

    var scaleCanisterAction = cc.sequence(cc.delayTime(0.05), cc.callFunc(
        function() {
          soulCount += collectedSoulsStep;
          var souls = soulCount.clamp(0, 1000) / 1000;
          this.soulCanister.rotation -= 0.1;
          this.soulCanister.setScale(Math.lerp(0.5, 1, souls));
          this.soulCounter.setLabelText(Math.round(this.soulsCollectedTemp - soulCount));
          this.endingSoulsLabel.setScale(Math.lerp(0.5, 1, souls));
          this.endingSoulsLabel.setString(Math.round(soulCount) + Memory.get('souls'));
        },
        this
    ));

    scaleCanisterAction.repeat(this.CANISTER_SOUL_FRAGMENTS);
    this.runAction(scaleCanisterAction);
    this.runAction(cc.sequence(cc.delayTime(0.05 * (this.CANISTER_SOUL_FRAGMENTS - 1)),
        cc.callFunc(this.finishSoulIteration, this)));
  },

  finishSoulIteration: function() {
    this.particleSystem.stopSystem();

    this.endGameMenu.runAction(this.scaleUpButtonAction);
  },

  confirmTransitionToMainMenu: function() {
    var dialog = new TextDialog(this.transitionToMainMenu, 'Are you sure you want to quit? All unsaved progress will be lost.');
    this.addChild(dialog);
  },

  transitionToMainMenu: function() {
    cc.director.runScene(new MainMenuScene());
  }
});