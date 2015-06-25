// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var LabLayer = cc.Layer.extend({
  RIGHT_LIMIT: 0,
  LEFT_LIMIT: 0,
  MOVE_DURATION: 0.75,
  EASE_AMOUNT: 1.8,
  moveRightAnimation: null,
  moveLeftAnimation: null,

  ctor: function() {
    this._super.apply(this, arguments);
    this.setAnchorPoint(0, 0);
    this.init();
  },
  init: function() {
    this.moveLeftAction = cc.moveTo(this.MOVE_DURATION, this.LEFT_LIMIT, 0);
    this.moveLeftAction.easing(cc.easeIn(this.EASE_AMOUNT));
    this.moveLeftAction.retain();

    this.moveRightAction = cc.moveTo(this.MOVE_DURATION, this.RIGHT_LIMIT, 0);
    this.moveRightAction.easing(cc.easeIn(this.EASE_AMOUNT));
    this.moveRightAction.retain();
  },

  move: function(direction) {
    if (direction === 'left') {
      this.runAction(this.moveLeftAction);
    } else if (direction === 'right') {
      this.runAction(this.moveRightAction);
    }
  }
});