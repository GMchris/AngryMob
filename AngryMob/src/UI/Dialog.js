// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var Dialog = cc.Layer.extend({
  dialogWindow: null,
  clickBlocker: null,
  showAnimation: null,
  hideAnimation: null,
  ctor: function() {
    this._super();

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

    this.addChild(this.clickBlocker);
    this.addChild(this.dialogWindow);

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