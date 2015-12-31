// AngryMob Copyright (c) 2015 Kristian Ignatov

var LabUILayer = LabLayer.extend({
  RIGHT_LIMIT: -600,

  ctor: function(labScene) {
    this.labScene = labScene;
    this._super();
  },

  init: function() {
    this._super();

    this.drawSections();

    var keyboardListener = cc.EventListener.create({
      event: cc.EventListener.KEYBOARD,
      onKeyReleased: this.navigateToMainMenu.bind(this)
    });

    cc.eventManager.addListener(keyboardListener, this);
  },

  navigateToMainMenu: function(keycode) {
    if (isBackButton(keycode) && !openDialogs()) {
      this.labScene.navigateToMainMenu();
    }
  },

  drawSections: function() {
    this.generateMonsters();
    this.generateUpgrades();
  },

  redrawSections: function() {
    this.monsterSection.removeFromParent(true);
    this.upgradeSection.removeFromParent(true);
    this.drawSections();
    this.labScene.updateSoulCounter();
  },

  /**
   * Generates the monster buttons and assigns callbacks to them.
   */
  generateMonsters: function() {
    var monsterSection = new cc.Menu();
    var monsterData = LabGenerator.getMonsters();
    var yOffset = 0;
    var xOffset = 0;

    monsterData.forEach(function(item, index) {
      if (index !== 0 && index % 3 === 0) {
          yOffset++;
          xOffset = 0;
      }
      var monsterIcon = new IconButton(cc.p(100 + (xOffset * 150), 950 - (yOffset * 150)),
        function() {
          this.selectMonster(item.id);
        }.bind(this), item.image);

      monsterIcon.setAnchorPoint(0, 1);

      if (item.state === G.OWNED) {
        var tick = new cc.Sprite('#tick.png');
        tick.setPosition(105, 100);
        monsterIcon.addChild(tick);
      }

      monsterSection.addChild(monsterIcon);
      xOffset++;
    }, this);

    monsterSection.setPosition(0, 0);

    this.monsterSection = monsterSection;
    this.addChild(this.monsterSection);

    this.moreMonstersMessage = new cc.LabelTTF('More monsters coming soon, thanks to you =)'
        , G.DEFAULT_FONT, 30, cc.size(350, 200));
    this.moreMonstersMessage.setPosition(320, 450);
    this.moreMonstersMessage.textAlign = 1;
    this.addChild(this.moreMonstersMessage);
  },

  selectMonster: function(id) {
    var monster = LabGenerator.getMonsters()[id];
    var dialog = new PurchaseDialog(function() {
      this.purchaseMonster(id)
    }.bind(this), monster);
    this.labScene.addChild(dialog);
  },

  purchaseMonster: function(index) {
    var price = Memory.get('souls') - LabGenerator.getMonsters()[index].price;
    Memory.set('monsters.' + index, G.OWNED);
    Memory.set('souls', price);
    this.redrawSections();
  },

  generateUpgrades: function() {
    var upgradeSection = new cc.Menu();
    var upgradeData = LabGenerator.getUpgrades();

    upgradeData.forEach(function(item, index) {
      var upgradeIcon = new IconButton(cc.p(120 + (index * 150), 950),
          function() {
            this.selectUpgrade(index);
          }.bind(this), item.image);

      upgradeIcon.setAnchorPoint(0, 1);

      if (item.state !== G.NOT_OWNED) {
        for (var tickIndex = 0; tickIndex < item.state; tickIndex++) {
          var tick = new cc.Sprite('#tick.png');
          tick.setScale(0.7);
          tick.setPosition(110, 140 - (45 * tickIndex));
          upgradeIcon.addChild(tick);
        }
      }

      upgradeSection.addChild(upgradeIcon);
    }, this);

    upgradeSection.setPosition(600, 0);
    this.upgradeSection = upgradeSection;
    this.addChild(this.upgradeSection);
  },

  selectUpgrade: function(index) {
    var upgrade = LabGenerator.getUpgrades()[index];
    var dialog = new PurchaseDialog(function() {
      this.purchaseUpgrade(index)
    }.bind(this), upgrade);
    this.labScene.addChild(dialog);
  },

  purchaseUpgrade: function(index) {
    var upgrade = LabGenerator.getUpgrades()[index];
    var price = Memory.get('souls') - upgrade.price;
    Memory.set('upgrades.' + index, upgrade.state + 1);
    Memory.set('souls', price);
    this.redrawSections();
  }
});