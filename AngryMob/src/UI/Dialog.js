// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var Dialog = cc.Layer.extend({
  CONFIRM_STRING: 'Accept',
  CANCEL_STRING: 'Cancel',
  text: null,
  confirmCallback: null,
  dialogWindow: null,
  dialogMenu: null,
  clickBlocker: null,
  showAnimation: null,
  hideAnimation: null,
  confirmButton: null,
  cancelButton: null,
  ctor: function(confirmCallback) {
    this._super();

    this.confirmCallback = function() {
      this.close();
      confirmCallback();
    }.bind(this);

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

    this.confirmButton = new TextButton(this.CONFIRM_STRING, cc.p(35, 0), this.confirmCallback);
    this.cancelButton = new TextButton(this.CANCEL_STRING, cc.p(295, 0), this.close.bind(this));

    this.dialogMenu = new cc.Menu(this.confirmButton, this.cancelButton);
    this.dialogMenu.setPosition(0, 35);

    this.addChild(this.clickBlocker);
    this.addChild(this.dialogWindow);
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