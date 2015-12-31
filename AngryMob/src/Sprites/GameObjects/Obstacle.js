// AngryMob Copyright (c) 2015 Kristian Ignatov

var Obstacle = MovingObject.extend({
  gameScene: null,

  ctor: function(type, gameScene) {
    this.type = type;
    this._super('#obstacle_' + type + '.png');
    this.gameScene = gameScene;

    this.collider = ColliderGenerator.get(type);
    this.computedCollider = cc.rect(this.collider.x, 0, this.collider.width, this.collider.height);

    this.init();
  }
});