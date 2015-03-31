// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var G = {
  //Game Scene
  OBSTACLE_COUNT: 11,
  OBSTACLE_POOL_COUNT: 5,

  INITIAL_SPEED: 11,
  SPEEDS: [7, 9, 11],

  COMMON_SOUL_POOL_COUNT: 15,
  SPECIAL_SOUL_POOL_COUNT: 5,
  LEGENDARY_SOUL_POOL_COUNT: 2,
  COMMON_SOUL_TYPE: 0,
  SPECIAL_SOUL_TYPE: 1,
  LEGENDARY_SOUL_TYPE: 2
};

G.segment = {
  obstacles: [
    {
      type: 1,
      x: 0,
      y: 50,
      flipped: false,
      first: true
    },
    {
      type: 6,
      x: 300,
      y: 200,
      flipped: false
    },
    {
      type: 4,
      x: 100,
      y: 400,
      flipped: false
    },
    {
      type: 7,
      x: 0,
      y: 700,
      flipped: false
    },
    {
      type: 8,
      x: 300,
      y: 700,
      flipped: false
    },
    {
      type: 10,
      x: 100,
      y: 950,
      flipped: true
    },
    {
      type: 10,
      x: 450,
      y: 950,
      flipped: false
    }
  ],
  souls: [
    {
      type: 0,
      x: 450,
      y: 60
    },
    {
      type: 0,
      x: 300,
      y: 100
    },
    {
      type: 0,
      x: 150,
      y: 150
    },
    {
      type: 0,
      x: 300,
      y: 300
    },
    {
      type: 0,
      x: 450,
      y: 450
    },
    {
      type: 0,
      x: 375,
      y: 550
    },
    {
      type: 0,
      x: 280,
      y: 700
    },
    {
      type: 0,
      x: 280,
      y: 950
    },
    {
      type: 0,
      x: 100,
      y: 1150
    }
  ]
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