// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Powerup = MovingObject.extend({

  ctor: function(type, gameScene) {
    this.type = type;
    this.gameScene = gameScene;
    this._super('#powerup_'+ this.type + '.png');

    this.collider = ColliderGenerator.get('powerup');
    this.computedCollider = cc.rect(0, 0, this.collider.width, this.collider.height);

    this.init();
  }
});