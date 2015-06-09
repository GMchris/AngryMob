// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Soul = MovingObject.extend({

  ctor: function(type, gameScene) {
    this.type = type;
    this._super('#soul_'+ this.type + '.png');

    this.collider = ColliderGenerator.get('soul');
    this.computedCollider = cc.rect(0, 0, this.collider.width, this.collider.height);

    this.init();
  }
});