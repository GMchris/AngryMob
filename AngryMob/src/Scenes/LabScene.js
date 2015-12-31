// AngryMob Copyright (c) 2015 Kristian Ignatov

var LabScene = cc.Scene.extend({
  tabs: [],

  ctor: function() {
    this._super.apply(this, arguments);

    this.init();
  },

  init: function() {
    this._super();

    this.backgroundLayer = new LabBackgroundLayer();
    this.uiLayer = new LabUILayer(this);
    this.foregroundLayer = new LabForegroundLayer();

    this.addChild(this.backgroundLayer);
    this.addChild(this.uiLayer);
    this.addChild(this.foregroundLayer);

    this.createNavigationMenu();
    this.createBottomMenu();
  },

  createNavigationMenu: function() {
    this.navigateLeftButton = new IconButton(cc.p(45, 550), function() {this.move('left')}.bind(this), '#lab_arrow_left.png');
    this.navigateRightButton = new IconButton(cc.p(600, 550), function() {this.move('right')}.bind(this), '#lab_arrow_right.png');

    this.navigateLeftButton.setAnchorPoint(0.5, 0.5);
    this.navigateRightButton.setAnchorPoint(0.5, 0.5);

    this.navigateLeftButton.setScale(0);

    this.navigationMenu = new cc.Menu(this.navigateLeftButton, this.navigateRightButton);
    this.navigationMenu.setPosition(0, 0);
    this.addChild(this.navigationMenu);

    this.showButtonAction = cc.sequence(cc.scaleTo(0.2, 1.2), cc.scaleTo(0.1, 1));
    this.showButtonAction.retain();
  },

  createBottomMenu: function() {
    this.soulCounter = new SoulCounter();
    this.soulCounter.setPosition(30, 90);
    this.addChild(this.soulCounter);
    this.updateSoulCounter();

    this.backButton = new TextButton('Back', cc.p(345, 15), this.navigateToMainMenu);
    this.bottomMenu = new cc.Menu(this.backButton);
    this.bottomMenu.setPosition(0, 0);
    this.addChild(this.bottomMenu);
  },

  navigateToMainMenu: function() {
      cc.director.runScene(new MainMenuScene());
  },

  updateSoulCounter: function() {
    var souls = Memory.get('souls');
    this.soulCounter.setLabelText(souls);
  },

  move: function(direction) {
    this.backgroundLayer.move(direction);
    this.foregroundLayer.move(direction);
    this.uiLayer.move(direction);
    this.navigateRightButton.setScale(0);
    this.navigateLeftButton.setScale(0);
    this.runAction(cc.sequence(cc.delayTime(0.8), cc.callFunc(this.showArrowButton, this, direction)));
  },

  showArrowButton: function(self, direction) {
    if (direction === 'left') {
      this.navigateRightButton.runAction(this.showButtonAction);
    } else if (direction === 'right') {
      this.navigateLeftButton.runAction(this.showButtonAction);
    }
  }
});