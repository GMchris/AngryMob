// AngryMob Copyright (c) 2015 Kristian Ignatov

(function() {
  var template = '' +
    "<div class='settings-columns'>" +
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
                  "<td>ID: {{input type='number' value=obstacle.type}}</td>" +
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
                  "<td>ID: {{input type='number' value=soul.type}}</td>" +
                  "<td><button class='remove-button' {{action 'removeSoul' soul}}>REMOVE</button></td>" +
                "</tr>" +
              "</table>" +
            "</div>" +
          "{{/each}}" +
        "</div>" +
      "</div>" +
    "</div>" +
     "<div class='powerup-wrapper'>" +
     "<div class='powerup-header header' {{action 'addPowerup'}}>+powerup</div>" +
     "{{#if powerup}}" +
     "<div class='settings-item powerup-setting'>" +
        "<table>" +
          "<tr>" +
            "<td>X: {{input type='number' value=powerup.x}}</td>" +
            "<td>Y: {{input type='number' value=powerup.y}}</td>" +
          "</tr>" +
          "<tr>" +
            "<td colspan='2'><button class='remove-button'{{action 'removePowerup'}}>REMOVE</button></td>" +
          "</tr>" +
        "</table>" +
     "</div>" +
      "{{/if}}" +
    "</div>" +
    "<div class='json-area'>" +
      "{{input type='text' value=json}}" +
      "<div class='buttons'>" +
        "<div class='button' {{action 'compile'}}>COMPILE</div>" +
        "<div class='button' {{action 'read'}}>READ</div>" +
      "</div>" +
    "</div>";

  Ember.TEMPLATES['settings'] = Ember.Handlebars.compile(template)
})();