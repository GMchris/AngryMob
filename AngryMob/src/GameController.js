// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Game = (function(){
  var content = {
    speed : 0,
    winSize: null,
    lives: 0
  };

  function get(property){
    return content[property];
  }

  function set(property, value){
    return content[property] = value;
  }

  function increment(property) {
    return content[property]++;
  }

  function decrement(property) {
    return content[property]--;
  }

  function toggle(property) {
    if (typeof content[property] === 'boolean') {
      return content[property] = !content[property];
    }
  }

  return {
    set: set,
    get: get,
    increment: increment,
    decrement: decrement,
    toggle: toggle
  }
})();