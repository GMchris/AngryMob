// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Game = (function(){
  var content = {
    worldType: -1,
    winSize: null,
    maxLives: 0,
    lives: 0,
    speed : 0,
    additionalSpeed: 0,

    // Computed properties.
    computedSpeed: function() {
      var bonus = 0;
      if (this.worldType === G.FRANKENSTEIN) {
        bonus -= 2;
      }
      return this.speed + this.additionalSpeed + bonus;
    },

    atMaxLives: function() {
      return this.lives >= this.maxLives;
    }
  };

  /**
   * Fetches a property. If said property is a function, fetches the result of the function.
   * @param property
   * @returns {*}
   */
  function get(property){
    return typeof content[property] === 'function' ? content[property]() : content[property];
  }

  /**
   * Sets a property. Don't use it on computed properties(functions).
   * @param property
   * @param value
   * @returns {*}
   */
  function set(property, value){
    return content[property] = value;
  }

  function increment(property) {
    return content[property]++;
  }

  function decrement(property) {
    return content[property]--;
  }

  /**
   * Flips the boolean value of a property. Only use on properties that are already booleans.
   * @param property
   * @returns {boolean}
   */
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