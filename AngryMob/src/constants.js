// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var G = {
  // Debug.
  COLLISION_BOXES: true,
  FLURRY: false,

  // Common constants.
  HUNDRED_PERCENT: 100,
  DEFAULT_FONT: 'Cartwheel',
  OFFSCREEN_POSITION: cc.p(9999, 9999),

  // Monster constants.
  MONSTERS: {
    FRANKENSTEIN: 0,
    WEREWOLF: 1,
    MUMMY: 2
  },

  // Upgrade constants.
  UPGRADES: {
    CHILLGULP: 0,
    LIQUID_SOUL: 1,
    CUORE: 2
  },

  POWERUPS: {
    SPEED: {
      DURATION: 5,
      TYPE: 0
    },
    MAGNET: {
      DURATION: 5,
      TYPE: 1
    }
  },

  // Lab.
  MONSTER: 0,
  UPGRADE: 1,

  NOT_OWNED: 0,
  OWNED: 1,
  LEVEL_ONE: 1,
  LEVEL_TWO: 2,
  LEVEL_THREE: 3,

  // Game Scene.
  END_LEVEL_DISTANCE: 2000,
  SEGMENT_LENGTH: 1200,

  OBSTACLE_COUNT: 11,
  OBSTACLE_POOL_COUNT: 5,

  POWERUP_COUNT: 2,
  POWERUP_POOL_COUNT: 2,

  INITIAL_LAUNCH_DELAY: 2,
  INITIAL_SPEED: 11,
  SPEEDS: [3, 7, 9, 11, 11],
  REGAIN_SPEED_TIMEOUT: 12,
  SPEEDUP_TIMEOUT: 25,

  COMMON_SOUL_POOL_COUNT: 15,
  SPECIAL_SOUL_POOL_COUNT: 5,
  LEGENDARY_SOUL_POOL_COUNT: 2,
  COMMON_SOUL_TYPE: 0,
  SPECIAL_SOUL_TYPE: 1,
  LEGENDARY_SOUL_TYPE: 2,
  SOUL_VALUES: [5, 10, 25],
  SOUL_SHARD_COUNT: 15,

  SOUL_COUNTER_POSITION: cc.p(40, 1100),

  // Level data,
  SEGMENTS: [],
  // State.
  STATE: {
      STARTING: 0,
      PLAYING: 1,
      PAUSED: 2,
      ENDING: 3
  }
};

if (cc.sys.platform === cc.sys.ANDROID) {
  G.DEFAULT_FONT = res.default_font;
}

//var pointsInstances = 0;
//
//cc.p = function(x, y){
//  pointsInstances ++;
//  if (x == undefined)
//    return {x: 0, y: 0};
//  if (y == undefined)
//    return {x: x.x, y: x.y};
//  return {x: x, y: y};
//};
//var createdPoints = 0;
//var pointsLogInterval = setInterval(function(){
//  logPoints();
//},1000);
//
//function logPoints(){
//  cc.log('------------------------------')
//  cc.log('createdPoints: ' + (pointsInstances - createdPoints));
//  createdPoints = pointsInstances;
//  cc.log('pointsInstances: ' + pointsInstances);
//}