// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

var Memory = (function() {

  var STORAGE_KEY = 'memory';

  var  memory = {
    souls: 0,
    monsters: [],
    initialSpeed: -1,
    soulMultiplier: -1
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

    cc.assert(cc.isString(property), 'Memory.set: Property name must be a string, not ' + property);
    cc.assert(!cc.isUndefined(value), 'Memory.set: Value must not be undefined');

    if (property && memory.hasOwnProperty(property)) {
      memory[property] = value;
      save();
    } else {
        cc.assert(false, 'Memory.set: Memory has no property named "' + property + '" .')
    }
  }

  /**
   * Saves the memory object in it's current state.
   */
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  }

  /**
   * Loads memory from storage or creates a clean copy of it if unavailable.
   */
  function load() {
    var fetchedMemory = localStorage.getItem(STORAGE_KEY);

    if (fetchedMemory) {
        memory = JSON.parse(fetchedMemory);
    } else {
        cleanMemory();
    }
  }

  /**
   * Sets default values to all memory items.
   */
  function cleanMemory() {
      memory.souls = 0;
      memory.monsers = [];
      memory.initialSpeed = -1;
      memory.soulMultiplier = -1;

      save();
  }

  return {
    get: get,
    set: set,
    save: save,
    load: load
  }
})();