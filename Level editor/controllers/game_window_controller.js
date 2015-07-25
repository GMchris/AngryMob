// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

App.GameWindowController = Ember.Controller.extend({
  needs: ['settings'],
  souls: Ember.computed.alias('controllers.settings.souls'),
  obstacles: Ember.computed.alias('controllers.settings.obstacles'),
  powerup: Ember.computed.alias('controllers.settings.powerup')
});