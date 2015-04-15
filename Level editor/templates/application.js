// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

(function() {
  var template = "{{render 'game-window'}} {{render 'settings'}}";

  Ember.TEMPLATES['application'] = Ember.Handlebars.compile(template)
})();