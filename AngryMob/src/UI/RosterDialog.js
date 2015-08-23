// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var RosterDialog = Dialog.extend({
  monsterMenu: null,
  ctor: function() {
    this._super();
  },

  init: function() {
    this._super();

    var monsters = this.getMonsterList();
    var yOffset = 0;
    var xOffset = 0;

    this.monsterMenu = new cc.Menu();
    this.monsterMenu.setPosition(0, 0);

      monsters.forEach(function(item, index) {
        if (index !== 0 && index % 3 === 0) {
            yOffset++;
            xOffset = 0;
        }
        var monsterIcon = new IconButton(cc.p(70 + (xOffset * 150), 450 - (yOffset * 150)),
            function() {
                this.parent.uiLayer.startGame(item.id);
            }.bind(this), item.image);

        monsterIcon.setAnchorPoint(0, 1);

        xOffset++;
        this.monsterMenu.addChild(monsterIcon);
    }, this);

    this.dialogWindow.addChild(this.monsterMenu);
  },

  getMonsterList: function() {
    var monsters = LabGenerator.getMonsters();
    return monsters.filter(function(item) {
        return item.state === G.OWNED;
    });
  }
});