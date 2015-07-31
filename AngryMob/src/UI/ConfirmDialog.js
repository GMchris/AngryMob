// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var ConfirmDialog = Dialog.extend({
  CONFIRM_STRING: 'Accept',
  CANCEL_STRING: 'Cancel',
  confirmCallback: null,
  dialogMenu: null,
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
    this._super();

    this.confirmButton = new TextButton(this.CONFIRM_STRING, cc.p(35, 0), this.confirmCallback);
    this.cancelButton = new TextButton(this.CANCEL_STRING, cc.p(295, 0), this.close.bind(this));

    this.dialogMenu = new cc.Menu(this.confirmButton, this.cancelButton);
    this.dialogMenu.setPosition(0, 35);

    this.dialogWindow.addChild(this.dialogMenu);
  }
});