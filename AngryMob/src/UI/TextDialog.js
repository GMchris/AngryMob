// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var TextDialog = ConfirmDialog.extend({
  CONFIRM_STRING: 'Yup',
  CANCEL_STRING: 'Nope',
  text: null,
  dialogLabel: null,
  ctor: function(confirmCallback, text) {
    this.text = text;
    this._super(confirmCallback);
  },

  init: function() {
    this._super();

    this.dialogLabel = new cc.LabelTTF(this.text, G.DEFAULT_FONT, 45, cc.size(500, 400));
    this.dialogLabel.setPosition(280, 270);
    this.dialogLabel.textAlign = 1;
    this.dialogLabel.strokeStyle = cc.color.BLACK;
    this.dialogLabel.lineWidth = 3;

    this.dialogWindow.addChild(this.dialogLabel);
  }
});