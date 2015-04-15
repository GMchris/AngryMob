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
    this.changeType();
  },

  changePosition: function() {
    if (this.get('elementInserted')) {

      this.$().css({
        bottom: this.getThird(this.get('obstacle.y')),
        left: this.getThird(this.get('obstacle.x'))
      });
    }
  }.observes('obstacle.x', 'obstacle.y'),

  changeType: function() {

    if(this.get('obstacle.type') < 0){
      this.set('obstacle.type', 9);
        return false;
    } else if (this.get('obstacle.type') > 9) {
      this.set('obstacle.type', 0);
        return false;
    }

    if (this.get('elementInserted')) {
      this.$().css({
        backgroundImage: 'url("images/obstacle_' + this.get('obstacle.type') + '.png")'
      });
    }
  }.observes('obstacle.type'),

  getDimensions: function(type) {
      switch(type) {
          case 0:
      }
  },

  getThird: function(value) {
    return Math.round(value - value/3);
  }
});
