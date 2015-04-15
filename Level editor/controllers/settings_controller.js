// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.SettingsController = Ember.Controller.extend({
  obstacles: [],
  souls: [],

  actions: {
    addSoul: function() {
      this.souls.pushObject({
        x: 10,
        y: 10,
        type: 0
      });
    },

    removeSoul: function(item) {
      this.souls.removeObject(item);
    },

    addObstacle: function() {
      this.obstacles.pushObject({
        x: 10,
        y: 10,
        type: 0,
        flipped: false
      });
    },

    removeObstacle: function(item) {
      this.obstacles.removeObject(item);
    }
  },

  getJson: function() {
    var json = {
      souls: this.get('souls'),
      obstacles: this.get('obstacles')
    };

    console.log(JSON.stringify(json));

    return json;
  }.observes('souls.@each', 'obstacles.@each')
});