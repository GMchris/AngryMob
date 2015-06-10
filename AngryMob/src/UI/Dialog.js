// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var Dialog = cc.Layer.extend({
  text: null,
  confirmCallback: null,
  dialogWindow: null,
  dialogLabel: null,
  dialogMenu: null,
  clickBlocker: null,
  showAnimation: null,
  hideAnimation: null,
  confirmButton: null,
  cancelButton: null,
  ctor: function(text, confirmCallback) {
    this._super();

    this.text = text;
    this.confirmCallback = confirmCallback;

    this.init();
  },

  init: function() {
    this.winSize = Game.get('winSize');

    var blockingButton = new cc.MenuItemSprite(
      new cc.Sprite('#fullscreen_clear.png'),
      new cc.Sprite('#fullscreen_clear.png'),
      new cc.Sprite('#fullscreen_clear.png'),
      this.preventPropagation
    );

    this.clickBlocker = new cc.Menu(blockingButton);

    this.dialogWindow = new cc.Sprite('#dialog.png');
    this.dialogWindow.setPosition(this.winSize.width/2, this.winSize.height/2);
    this.dialogWindow.scale = 0;

    this.dialogLabel = new cc.LabelTTF(this.text, G.DEFAULT_FONT, 45, cc.size(500, 400));
    this.dialogLabel.setPosition(280, 270);
    this.dialogLabel.textAlign = 1;
    this.dialogLabel.strokeStyle = cc.color.BLACK;
    this.dialogLabel.lineWidth = 3;

    this.confirmButton = new Button('Yup', cc.p(25, 0), this.confirmCallback);
    this.cancelButton = new Button('Cancel', cc.p(295, 0), this.close.bind(this));

    this.dialogMenu = new cc.Menu(this.confirmButton, this.cancelButton);
    this.dialogMenu.setPosition(0, 20);

    this.addChild(this.clickBlocker);
    this.addChild(this.dialogWindow);
    this.dialogWindow.addChild(this.dialogLabel);
    this.dialogWindow.addChild(this.dialogMenu);

    this.showAnimation = cc.sequence(cc.scaleTo(0.25, 1.1), cc.scaleTo(0.15, 0.9));
    this.showAnimation.retain();

    this.hideAnimation = cc.sequence(cc.scaleTo(0.1, 1.1), cc.scaleTo(0.3, 0), cc.callFunc(this.remove, this));
    this.hideAnimation.retain();

    this.show();
  },

  show: function() {
    this.dialogWindow.runAction(this.showAnimation);
  },

  close: function() {
    this.dialogWindow.runAction(this.hideAnimation);
  },

  remove: function() {
    this.parent.removeChild(this, true);
  },

  preventPropagation: function() {
    return false;
  }
});