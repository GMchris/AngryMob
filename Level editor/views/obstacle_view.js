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

      this.set('obstacle.x', parseInt(this.get('obstacle.x')));
      this.set('obstacle.y', parseInt(this.get('obstacle.y')));

      this.$().css({
        bottom: this.getThird(this.get('obstacle.y')),
        left: this.getThird(this.get('obstacle.x'))
      });
    }
  }.observes('obstacle.x', 'obstacle.y'),

  changeType: function() {
    this.set('obstacle.type', parseInt(this.get('obstacle.type')));
    var type = this.get('obstacle.type');

    if(type < 0){
      this.set('obstacle.type', 10);
        return false;
    } else if (type > 10) {
      this.set('obstacle.type', 0);
        return false;
    }

    if (this.get('elementInserted')) {
      this.$().css(this.getDimensions(type));
    }
  }.observes('obstacle.type'),

  getDimensions: function(type) {
    var w = 0;
    var h = 0;
    type = parseInt(type);
    switch(type) {
      case 0:
        w= 170;
        h= 115;
        break;
      case 1:
        w= 200;
        h= 66;
        break;
      case 2:
        w= 216;
        h= 84;
        break;
      case 3:
        w= 160;
        h= 66;
        break;
      case 4:
        w=200;
        h=56;
        break;
      case 5:
        w=216;
        h=80;
        break;
      case 6:
        w= 354;
        h= 100;
        break;
      case 7:
        w= 200 ;
        h= 134;
        break;
      case 8:
        w= 200;
        h= 134;
        break;
      case 9:
        w= 64;
        h= 94;
        break;
      case 10:
        w= 50;
        h= 124;
        break;
      default:
        w= 0;
        h= 0;
        break;
    }

    return {
      width: w,
      height: h,
      backgroundImage: 'url("images/obstacle_' + type + '.png")'
    };
  },

  getThird: function(value) {
    return Math.round(value - value/3);
  }
});
