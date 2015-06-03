// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var TabScene = cc.Scene.extend({
  TAB_HEIGHT: 65,
  tabs: [],
  ctor: function() {
    this._super();
    this.winSize = Game.get('winSize');

    this.init();
  },

  init: function() {
    for (var tabIndex = 0; tabIndex < this.tabs.length; tabIndex++) {
      // Instantiate the tabs and their contents.
      this.tabs[tabIndex] = new this.tabs[tabIndex]();

      var tab = this.tabs[tabIndex];

      // The tabs fits the entire screen except for some room for the buttons.
      tab.setContentSize(this.winSize.width, this.winSize.height - this.TAB_HEIGHT);
      this.addChild(tab);

      // Only the first tab is initially visible.
      if (tabIndex === 0) {
        tab.show();
      }
    }
  }
});