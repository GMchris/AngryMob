// AngryMob Copyright (c) 2015 Kristian Ignatov

App.PowerupView = Ember.View.extend({
    classNames: ['powerup'],
    powerup: null,

    didInsertElement: function() {
        this._super();

        this.changePosition();
    },

    changePosition: function() {
        if (this.get('elementInserted')) {

            this.set('powerup.x', parseInt(this.get('powerup.x')));
            this.set('powerup.y', parseInt(this.get('powerup.y')));

            this.$().css({
                bottom: this.getThird(this.get('powerup.y')),
                left: this.getThird(this.get('powerup.x'))
            });
        }
    }.observes('powerup.x', 'powerup.y'),

    getThird: function(value) {
        return Math.round(value - value/3);
    }
});
