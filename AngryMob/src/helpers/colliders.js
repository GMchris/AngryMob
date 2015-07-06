// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

// Returns rectangle objects used for collision detection

var ColliderGenerator = (function(){

  var map = [
    cc.rect(0, 15, 250, 50), // Column debris.
    cc.rect(0, 10, 280, 30), // Left side debris.
    cc.rect(0, 30, 325, 30), // Bookshelf long.
    cc.rect(0, 15, 240, 35), // Bookshelf short.
    cc.rect(0, 0, 300, 25), // Fallen column.
    cc.rect(0, 15, 325, 30), // Center debris.
    cc.rect(10, 5, 510, 35), // Right side debris.
    cc.rect(0, 0, 240, 25), // Doorway left side.
    cc.rect(60, 0, 240, 25), // Doorway right side.
    cc.rect(0, 0, 95, 30), // Statue.
    cc.rect(0, 0, 70, 30) // Bust.
  ];

  map['monster'] = cc.rect(15, 0, 45, 35);
  map['soul'] = cc.rect(0, 0, 60, 30);
  map['powerup'] = cc.rect(0, 0, 100, 60);

  function getCollider(type) {
    return map[type];
  }

  return {
    get: getCollider
  }
})();