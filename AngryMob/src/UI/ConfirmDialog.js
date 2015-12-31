// AngryMob Copyright (c) 2015 Kristian Ignatov.

var ConfirmDialog = Dialog.extend({
  CONFIRM_STRING: 'Accept',
  confirmCallback: null,
  dialogMenu: null,
  confirmButton: null,
  ctor: function(confirmCallback) {

    this.confirmCallback = function() {
        this.close();
        confirmCallback();
    }.bind(this);

    this._super();
  },

  init: function() {
    this._super();

    this.confirmButton = new TextButton(this.CONFIRM_STRING, cc.p(35, 0), this.confirmCallback);
    this.cancelButton.setPosition(cc.p(295, 0));

    this.dialogMenu.addChild(this.confirmButton);
  }
});