// AngryMob Copyright (c) 2015 Kristian Ignatov.

var Dialog = cc.Layer.extend({
  CANCEL_STRING: 'Cancel',
  dialogWindow: null,
  clickBlocker: null,
  showAnimation: null,
  hideAnimation: null,
  dialogMenu: null,
  cancelButton: null,
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

    this.cancelButton = new TextButton(this.CANCEL_STRING, cc.p(160, 0), this.close.bind(this));

    this.dialogMenu = new cc.Menu(this.cancelButton);
    this.dialogMenu.setPosition(0, 35);

    this.dialogWindow = new cc.Sprite('#dialog.png');
    this.dialogWindow.setPosition(this.winSize.width/2, this.winSize.height/2);
    this.dialogWindow.scale = 0;

    this.addChild(this.clickBlocker);
    this.addChild(this.dialogWindow);
    this.dialogWindow.addChild(this.dialogMenu);

    this.showAnimation = cc.sequence(cc.scaleTo(0.25, 1.1), cc.scaleTo(0.15, 0.9));
    this.showAnimation.retain();

    this.hideAnimation = cc.sequence(cc.scaleTo(0.1, 1.1), cc.scaleTo(0.3, 0), cc.callFunc(this.remove, this));
    this.hideAnimation.retain();

    this.show();


    var keyboardListener = cc.EventListener.create({
      event: cc.EventListener.KEYBOARD,
      onKeyReleased: this.onKeyReleased.bind(this)
    });

    cc.eventManager.addListener(keyboardListener, this);

    Game.increment('openDialogs');
  },

  onKeyReleased: function(keyCode, ev) {
      if(keyCode == cc.KEY.backspace || keyCode == 6){
        setTimeout(function() {
          this.close();
        }.bind(this), 10);
      }
  },

  show: function() {
    this.dialogWindow.runAction(this.showAnimation);
  },

  close: function() {
    Game.decrement('openDialogs');
    this.dialogWindow.runAction(this.hideAnimation);
  },

  remove: function() {
    this.parent.removeChild(this, true);
  },

  preventPropagation: function() {
    return false;
  }
});