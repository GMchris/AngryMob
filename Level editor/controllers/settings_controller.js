// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.SettingsController = Ember.Controller.extend({
  obstacles: [],
  souls: [],
  json: '',

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
    },

    compile: function() {
      var json = {
          souls: this.get('souls'),
          obstacles: this.get('obstacles')
      };

      json = Ember.copy(json, true);

      this.set('json',JSON.stringify(json));
    },

    read: function() {
        var json = '';
        try {
            json = JSON.parse(this.get('json'));
        } catch(e) {
            this.set('json', 'Invalid JSON');
            return false;
        }

        this.set('souls', json.souls || []);
        this.set('obstacles', json.obstacles || []);
    }
  }
});