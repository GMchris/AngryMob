// AngryMob Copyright (c) 2015 Kristian Ignatov

Ember.View.reopen({
  didInsertElement: function() {
    this._super();
    this.set('elementInserted', true);
  },
  willDestroyElement: function() {
    this._super();
    this.set('elementInserted', false);
  }
});