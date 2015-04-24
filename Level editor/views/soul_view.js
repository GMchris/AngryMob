// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.SoulView = Ember.View.extend({
  classNames: ['soul'],

  soul: null,

  didInsertElement: function() {
    this._super();

    this.changePosition();
  },

  changePosition: function() {
    if (this.get('elementInserted')) {

      this.set('soul.x', parseInt(this.get('soul.x')));
      this.set('soul.y', parseInt(this.get('soul.y')));

      this.$().css({
        bottom: this.getThird(this.get('soul.y')),
        left: this.getThird(this.get('soul.x'))
      });
    }
  }.observes('soul.x', 'soul.y'),

  getThird: function(value) {
    return Math.round(value - value/3);
  }
});