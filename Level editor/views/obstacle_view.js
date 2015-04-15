// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.ObstacleView = Ember.View.extend({
  classNames: ['obstacle'],
  classNameBindings: ['flipped'],
  obstacle: null,
  flipped: function(){
    return this.get('obstacle.flipped');
  }.property('obstacle.flipped'),

  didInsertElement: function() {
    this._super();

    this.changePosition();
  },

  changePosition: function() {
    if (this.get('elementInserted')) {

      this.$().css({
        bottom: this.getThird(this.get('obstacle.y')),
        left: this.getThird(this.get('obstacle.x'))
      });
    }
  }.observes('obstacle.x', 'obstacle.y'),

  getThird: function(value) {
    return Math.round(value - value/3);
  }
});
