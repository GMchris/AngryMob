// AngryMob Copyright (c) 2015 Kristian Ignatov

(function() {
  var template = "" +
       "{{#each soul in souls}} {{view 'soul' soul=soul}} {{/each}} " +
       "{{#each obstacle in obstacles}} {{view 'obstacle' obstacle=obstacle}} {{/each}}" +
       "{{#if powerup}} {{view 'powerup' powerup=powerup}} {{/if}}";

  Ember.TEMPLATES['gameWindow'] = Ember.Handlebars.compile(template)
})();