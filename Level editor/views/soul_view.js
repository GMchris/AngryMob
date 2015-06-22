// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.SoulView = Ember.View.extend({
  classNames: ['soul'],

  soul: null,

  didInsertElement: function() {
    this._super();
    this.$().css('backgroundImage', 'url("images/soul_' + this.get('soul.type') + '.png")');
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

  changeType: function() {
    this.set('soul.type', parseInt(this.get('soul.type')));
    var type = this.get('soul.type');

    if(type < 0){
      this.set('soul.type', 2);
      return false;
    } else if (type > 2) {
      this.set('soul.type', 0);
      return false;
    }

    this.$().css('backgroundImage', 'url("images/soul_' + type + '.png")')

  }.observes('soul.type'),

  getThird: function(value) {
    return Math.round(value - value/3);
  }
});