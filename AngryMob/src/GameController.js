// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Game = (function(){
  var content = {
    speed : 0,
    winSize: null
  };

  function get(property){
    return content[property];
  }

  function set(property, value){
    return content[property] = value;
  }

  return {
    set: set,
    get: get
  }
})();