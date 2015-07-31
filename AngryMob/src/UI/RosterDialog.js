// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov.

var RosterDialog = Dialog.extend({

  ctor: function(confirmCallback, item) {
    this.item = item;
    this._super(confirmCallback);
  },

  init: function() {
    this._super();
  },

  cantAfford: function() {
    return this.item.price > Memory.get('souls');
  }
});