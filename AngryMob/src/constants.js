// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var G = {
  // Debug.
  COLLISION_BOXES: false,

  // Common constants.
  HUNDRED_PERCENT: 100,

  // Monster constants.
  FRANKENSTEIN: 0,
  WEREWOLF: 1,
  MUMMY: 2,

  // Game Scene.
  OBSTACLE_COUNT: 11,
  OBSTACLE_POOL_COUNT: 5,

  INITIAL_SPEED: 11,
  SPEEDS: [3, 7, 9, 11, 11],
  REGAIN_SPEED_TIMEOUT: 5,
  SPEEDUP_TIMEOUT: 20,

  COMMON_SOUL_POOL_COUNT: 15,
  SPECIAL_SOUL_POOL_COUNT: 5,
  LEGENDARY_SOUL_POOL_COUNT: 2,
  COMMON_SOUL_TYPE: 0,
  SPECIAL_SOUL_TYPE: 1,
  LEGENDARY_SOUL_TYPE: 2,

  SEGMENTS: [],

  // State.
  STATE: {
      PLAYING: 0,
      PAUSED: 1,
      ENDING: 2
  }
};


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