// AngryMob Copyright (c) 2015 Kristian Ignatov

var Monster = cc.Sprite.extend({
  isVulnerable: false,
  receiveDamageAction: null,
  runAnimation: null,
  dustParticleSystem: null,

  ctor: function() {
    this._super('#monster_running_0.png');
    this.isVulnerable = true;

    this.init();
  },
  init: function() {
    this.setAnchorPoint(0.5, 0);
    this.setPosition(300, 200);
    this.winSize = Game.get('winSize');

    var colliderTag = '';

    switch(Game.get('worldType')) {
      case G.MONSTERS.WEREWOLF:
        colliderTag = 'monster_big';
        break;
      default:
        colliderTag = 'monster';
        break;
    }

    this.collider = ColliderGenerator.get(colliderTag);
    this.computedCollider = cc.rect(0, 0, this.collider.width, this.collider.height);

    this.initiateActions();

    if (G.COLLISION_BOXES) {
      this.col = cc.Sprite.create();
      this.col.setColor(cc.color.GREEN);
      this.col.setTextureRect(this.collider);
      this.col.setAnchorPoint(0, 0);
      this.col.setPosition(this.collider.x, this.collider.y);
      this.addChild(this.col);
    }

    this.scheduleUpdate();
  },
  /**
   * Moves the monster to a specified point over a given duration.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} duration
   */
  animateTo: function(x, y, duration) {
    this.runAction(cc.moveTo(duration, x, y));
  },

  initiateActions: function() {
    var damageActions = [
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.fadeTo(0.4, 50),
      cc.fadeTo(0.4, 255),
      cc.callFunc(this.receiveDamageCallback, this)
    ];

    this.receiveDamageAction = cc.sequence(damageActions);
    this.receiveDamageAction.retain();

    this.runAnimation = Visual.createSpriteAnimation('monster_running_', 8, 0.04);
    this.runAction(this.runAnimation);
  },

  /**
   * Check if the click was in a small box under the player character.
   * @param {Object} location
   * @returns {Boolean} isPointInMoveArea
   */
  pointInMoveArea: function(location) {
    // An area just under the monster.
    var moveArea = cc.rect(this.x - this.width/2, this.y - 40, this.width, 60);

    return cc.rectContainsPoint(moveArea, location);
  },

  die: function() {
    var duration = this.y / 200;
    this.animateTo(this.x, 0, duration);
  },

  receiveDamageCallback: function() {
    this.isVulnerable = true;
  },

  receiveDamage: function() {
    this.isVulnerable = false;
    this.runAction(this.receiveDamageAction);
  },

  computeCollider: function() {
    this.computedCollider.y = this.y + this.collider.y;
    this.computedCollider.x = (this.x - this.width/2) + this.collider.x;
  },

  update: function() {
    this.parent.reorderChild(this, this.winSize.height - this.y);
    this.computeCollider();
  }
});