// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

(function() {
  var template = "" +
       "{{#each soul in souls}} {{view 'soul' soul=soul}} {{/each}} " +
       "{{#each obstacle in obstacles}} {{view 'obstacle' obstacle=obstacle}} {{/each}}";

  Ember.TEMPLATES['gameWindow'] = Ember.Handlebars.compile(template)
})();