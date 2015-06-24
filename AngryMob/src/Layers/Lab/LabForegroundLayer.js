// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var LabForegroundLayer = LabLayer.extend({
  RIGHT_LIMIT: -700,
  sideData: [
    {
      name: 'top',
      x: 0,
      y: 1076
    },
    {
      name: 'bottom',
      x: 0,
      y: 0
    },
    {
      name: 'left',
      x: 0,
      y: 120
    },
    {
      name: 'right',
      x: 1230,
      y: 120
    },
    {
      name: 'middle',
      x: 554,
      y: 120
    }
  ],

  init: function() {
    this._super();

    for (var sideIndex = 0; sideIndex < this.sideData.length; sideIndex++) {
      this.initializeSide(this.sideData[sideIndex]);
    }
  },

  initializeSide: function(side) {
    var sideImage = new cc.Sprite('#lab_' + side.name + '.png');
    sideImage.setPosition(side.x, side.y);
    sideImage.setAnchorPoint(0, 0);
    this.addChild(sideImage);
    this[side.name + 'Side'] = sideImage;
  }
});