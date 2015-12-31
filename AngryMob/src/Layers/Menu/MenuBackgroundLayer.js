// AngryMob Copyright (c) 2015 Kristian Ignatov

var MenuBackgroundLayer = cc.Layer.extend({
  sky: null,
  grass: null,
  tower: null,
  moon: null,
  tomb: null,
  lichTower: null,
  ctor: function() {
    this._super();

    this.init();
  },

  init: function() {
    this.drawSky();
    this.drawLichTower();
    this.drawGrass();
    this.drawTomb();
    this.drawTower();
    this.drawMoon();
    this.drawTitle();
  },

  hasMonster: function(monster) {
    return Memory.get('monsters')[monster] === G.OWNED;
  },

  drawTitle: function() {
    this.titleAppearAnimation = cc.sequence(cc.scaleTo(0.3, 1.3), cc.scaleTo(0.2, 0.8), cc.scaleTo(0.2, 1));

    this.title = new cc.Sprite('#main_menu_title.png');
    this.title.setPosition(320, 890);
    this.title.setScale(0);
    this.addChild(this.title);

    this.title.runAction(this.titleAppearAnimation);
  },

  drawSky: function() {
    this.sky = new cc.Sprite('#main_menu_sky.png');
    this.sky.setAnchorPoint(0, 0);
    this.addChild(this.sky);
  },

  drawGrass: function() {
    this.grass = new cc.Sprite('#main_menu_grass.png');
    this.grass.setAnchorPoint(0, 0);
    this.addChild(this.grass);
  },

  drawTower: function() {
    this.tower = new cc.Sprite('#main_menu_tower.png');
    this.tower.setPosition(200, 230);
    this.tower.setAnchorPoint(0, 0);
    this.tower.setScale(1.1);
    this.addChild(this.tower);

    this.towerParticleSystemLeft = new cc.ParticleSystem(res.main_menu_fire_particles);
    this.towerParticleSystemRight = new cc.ParticleSystem(res.main_menu_fire_particles);

    this.towerParticleSystemLeft.setPosition(60, 60);
    this.towerParticleSystemRight.setPosition(150, 60);

    this.tower.addChild(this.towerParticleSystemLeft);
    this.tower.addChild(this.towerParticleSystemRight);
  },

  drawMoon: function() {
    if (this.hasMonster(G.MONSTERS.WEREWOLF)) {
      this.moon = new cc.Sprite('#main_menu_moon.png');
      this.moon.setPosition(40, 910);
      this.moon.setAnchorPoint(0, 0);
      this.moon.setScale(1.1);
      this.addChild(this.moon);
    }
  },

  drawTomb: function() {
    if (this.hasMonster(G.MONSTERS.MUMMY)) {
      this.tomb = new cc.Sprite('#main_menu_tomb.png');
      this.tomb.setPosition(425, 225);
      this.tomb.setAnchorPoint(0, 0);
      this.tomb.setScale(1.1);
      this.addChild(this.tomb);
    }
  },

  drawLichTower: function() {
      if (this.hasMonster(G.MONSTERS.LICH)) {
          this.lichTower = new cc.Sprite('#main_menu_lich_tower.png');
          this.lichTower.setPosition(60, 200);
          this.lichTower.setAnchorPoint(0, 0);
          this.lichTower.setScale(1.1);
          this.addChild(this.lichTower);
      }
  }
});