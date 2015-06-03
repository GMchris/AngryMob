// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Tab = cc.Node.extend({
  title: '',
  content: null,
  visible: false,

  ctor: function() {
    this._super();

    this.init();
  },

  /**
   * Draw all components here.
   */
  init: function() {
    this.setAnchorPoint(0, 0);
    this.setPosition(0, 0);
  },

  show: function() {
    this.visible = true;
  },

  hide: function() {
    this.visible = false;
  }
});