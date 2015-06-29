// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var LabUILayer = LabLayer.extend({
  RIGHT_LIMIT: -600,

  ctor: function(labScene) {
    this.labScene = labScene;
    this._super();
  },

  init: function() {
    this._super();

    this.drawSections();
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

    monsterData.forEach(function(item, index) {
      var monsterIcon = new Button('', cc.p(100 + (index * 150), 950),
        function() {
          this.selectMonster(index);
        }.bind(this), item.image);

      monsterIcon.setAnchorPoint(0, 1);

      if (item.state === G.OWNED) {
        var tick = new cc.Sprite('#tick.png');
        tick.setPosition(105, 100);
        monsterIcon.addChild(tick);
      }

      monsterSection.addChild(monsterIcon);
    }, this);

    monsterSection.setPosition(0, 0);

    this.monsterSection = monsterSection;
    this.addChild(this.monsterSection);
  },

  selectMonster: function(index) {
    var monster = LabGenerator.getMonsters()[index];
    var dialog = new PurchaseDialog(function() {
      this.purchaseMonster(index)
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
      var upgradeIcon = new Button('', cc.p(100 + (index * 150), 950),
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