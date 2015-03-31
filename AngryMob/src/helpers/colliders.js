// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var ColliderGenerator = (function(){

  var map = [
    cc.rect(0, 15, 250, 50),
    cc.rect(0, 10, 300, 30),
    cc.rect(0, 30, 325, 30),
    cc.rect(0, 15, 240, 35),
    cc.rect(0, 0, 300, 25),
    cc.rect(0, 15, 325, 30),
    cc.rect(0, 0, 530, 45),
    cc.rect(0, 0, 240, 25),
    cc.rect(50, 0, 250, 25),
    cc.rect(0, 0, 95, 30),
    cc.rect(0, 0, 75, 30)
  ];

  function getCollider(type) {
    return map[type];
  }

  return {
    getCollider: getCollider
  }
})();