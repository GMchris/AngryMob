// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Memory = (function() {

  var STORAGE_KEY = 'memory';

  var memory = {};

  var  cleanMemory = {
    souls: 0,
    highScore: 0,
    monsters: [
      G.OWNED,
      G.NOT_OWNED,
      G.NOT_OWNED
    ],
    upgrades: [
      G.NOT_OWNED,
      G.NOT_OWNED,
      G.NOT_OWNED
    ]
  };

  /**
  * Fetches a given property or the whole memory block if a property is unavailable.
  * @param {String} property
  * @returns {Object || value}
  */
  function get(property) {
      if (property && memory.hasOwnProperty(property)) {
          return memory[property];
      }
      return memory;
  }

  /**
   * Sets a property with a given value.
   * @param property
   * @param value
   */
  function set(property, value) {

    cc.assert(isString(property), 'Memory.set: Property name must be a string, not ' + property);
    cc.assert(!cc.isUndefined(value), 'Memory.set: Value must not be undefined');

    var props = property.split('.');
    var item = memory;

    if (props.length === 1) {
      if (item.hasOwnProperty(props[0])) {
        item[props[0]] = value;
        save();
        return value;
      } else {
        cc.assert(false, 'Memory.set: Memory has no property named "' + property + '" .');
      }
    } else {
      while (props.length) {

        if (parseInt(props[0]) > -1) {
          props[0] = parseInt(props[0]);
        }

        if (item.hasOwnProperty(props[0])) {
          item = item[props.shift()];


          if (props.length >= 0) {
            item[props[0]] = value;
            save();
            return value;
          }
        } else {
          cc.assert(false, 'Memory.set: Memory has no property named "' + property + '" .');
        }
      }
    }
  }

  /**
   * Adds to a property.
   * @param property
   * @param amount
   */
  function add(property, amount) {
    cc.assert(isString(property), 'Memory.set: Property name must be a string, not ' + property);
    cc.assert(!cc.isUndefined(amount), 'Memory.set: Value must not be undefined');

    if (property && memory.hasOwnProperty(property)) {
      memory[property] += amount;
      save();
    } else {
      cc.assert(false, 'Memory.set: Memory has no property named "' + property + '" .')
    }
  }

  /**
   * Subtracts from a property.
   * @param property
   * @param amount
   */
  function subtract(property, amount) {
    cc.assert(isString(property), 'Memory.set: Property name must be a string, not ' + property);
    cc.assert(!cc.isUndefined(amount), 'Memory.set: Value must not be undefined');

    if (property && memory.hasOwnProperty(property)) {
      memory[property] -= amount;
      save();
    } else {
      cc.assert(false, 'Memory.set: Memory has no property named "' + property + '" .')
    }
  }

  /**
   * Saves the memory object in it's current state.
   */
  function save() {
    cc.sys.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  }

  /**
   * Loads memory from storage or creates a clean copy of it if unavailable.
   */
  function load() {
    var fetchedMemory = cc.sys.localStorage.getItem(STORAGE_KEY);

    if (fetchedMemory) {
        memory = JSON.parse(fetchedMemory);
    } else {
      createCleanMemory();
    }
  }

  /**
   * Sets default values to all memory items.
   */
  function createCleanMemory() {
    memory = cloneObject(cleanMemory);

    save();
  }

  function clear() {
    cc.sys.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    get: get,
    set: set,
    save: save,
    load: load,
    add: add,
    subtract: subtract,
    clear: clear
  }
})();