// AngryMob Copyright (c) 2015 Kristian Ignatov

App.SettingsController = Ember.Controller.extend({
  obstacles: [],
  souls: [],
  powerup: null,
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

    addPowerup: function() {
      this.set('powerup', {
          x: 0,
          y: 0
      })
    },

    removePowerup: function() {
        this.set('powerup', null);
    },

    compile: function() {
      var json = {
          souls: this.get('souls'),
          obstacles: this.get('obstacles'),
          powerup: this.get('powerup')
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
        this.set('powerups', json.powerups || []);
    }
  }
});