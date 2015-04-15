// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

(function() {
  var template = '' +
    "<div class='obstacle-wrapper wrapper'>" +
      "<div class='obstacle-header header' {{action 'addObstacle'}}>+obstacle</div>" +
      "<div class='obstacle-container container'>" +
        "{{#each obstacle in obstacles}}" +
          "<div class='settings-item'>" +
            "<table>" +
              "<tr>" +
                "<td>X: {{input type='number' value=obstacle.x}}</td>" +
                "<td>Y: {{input type='number' value=obstacle.y}}</td>" +
              "</tr>" +
              "<tr>" +
                "<td>Type: {{input type='number' value=obstacle.type}}</td>" +
                "<td>Flipped: {{input type='checkbox' checked=obstacle.flipped}}</td>" +
              "</tr>" +
              "<tr>" +
                "<td colspan='2'><button class='remove-button' {{action 'removeObstacle' obstacle}}>REMOVE</button></td>" +
              "</tr>" +
            "</table>" +
          "</div>" +
        "{{/each}}" +
      "</div>" +
    "</div>" +
    "<div class='soul-wrapper wrapper'>" +
      "<div class='soul-header header' {{action 'addSoul'}}>+soul</div>" +
      "<div class='soul-container container'>" +
        "{{#each soul in souls}}" +
          "<div class='settings-item'>" +
            "<table>" +
              "<tr>" +
                "<td>X: {{input type='number' value=soul.x}}</td>" +
                "<td>Y: {{input type='number' value=soul.y}}</td>" +
              "</tr>" +
              "<tr>" +
                "<td>Type: {{input type='number' value=soul.type}}</td>" +
                "<td><button class='remove-button' {{action 'removeSoul' soul}}>REMOVE</button></td>" +
              "</tr>" +
            "</table>" +
          "</div>" +
        "{{/each}}" +
      "</div>" +
    "</div>"
    ;

  Ember.TEMPLATES['settings'] = Ember.Handlebars.compile(template)
})();