// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var PurchaseDialog = ConfirmDialog.extend({
  CONFIRM_STRING: 'Buy',
  CANCEL_STRING: 'Cancel',
  item: null,
  dialogImage: null,
  dialogTitle: null,
  dialogLabel: null,
  dialogPrice: null,
  soulIcon: null,

  ctor: function(confirmCallback, item) {
    this.item = item;
    this._super(confirmCallback);
  },

  init: function() {
    this._super();
    console.log('dicklet');
    this.dialogImage = new cc.Sprite(this.item.image);
    this.dialogImage.setAnchorPoint(0, 1);
    this.dialogImage.setScale(1.3);
    this.dialogImage.setPosition(75, 400);

    this.dialogTitle = new cc.LabelTTF(this.item.name, G.DEFAULT_FONT, 55, cc.size(500, 80));
    this.dialogTitle.setPosition(30, 410);
    this.dialogTitle.setAnchorPoint(0, 0);
    this.dialogTitle.textAlign = 1;
    this.dialogTitle.strokeStyle = cc.color.BLACK;
    this.dialogTitle.lineWidth = 3;

    this.dialogDescription = new cc.LabelTTF(this.item.description, G.DEFAULT_FONT, 30, cc.size(270, 175));
    this.dialogDescription.setPosition(260, 230);
    this.dialogDescription.setAnchorPoint(0, 0);
    this.dialogDescription.strokeStyle = cc.color.BLACK;
    this.dialogDescription.lineWidth = 3;

    this.dialogPrice = new cc.LabelTTF(this.item.price, G.DEFAULT_FONT, 50, cc.size(200, 80));
    this.dialogPrice.setPosition(300, 110);
    this.dialogPrice.setAnchorPoint(0, 0);
    this.dialogPrice.strokeStyle = cc.color.BLACK;
    this.dialogPrice.lineWidth = 3;

    this.soulIcon = new cc.Sprite('#soul_0.png');
    this.soulIcon.setPosition(460, 170);

    this.dialogWindow.addChild(this.dialogImage);
    this.dialogWindow.addChild(this.dialogTitle);
    this.dialogWindow.addChild(this.dialogDescription);
    this.dialogWindow.addChild(this.dialogPrice);
    this.dialogWindow.addChild(this.soulIcon);

    if (this.cantAfford()) {
      this.confirmButton.enabled = false;
    }

    if (this.owned()) {
      this.confirmButton.enabled = false;
      this.dialogPrice.opacity = 0;
      this.soulIcon.opacity = 0;
    }
  },

  cantAfford: function() {
    return this.item.price > Memory.get('souls');
  },

  owned: function() {
    return (this.item.type === G.MONSTER && this.item.state === G.OWNED) ||
        (this.item.type === G.UPGRADE && this.item.state === G.LEVEL_THREE);
  }
});