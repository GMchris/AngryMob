// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

/**
 * General reusable helper methods.
 */

/**
 * A shorthand for a switch block, to be used when you only need one value set.
 * @param operand
 * @param {Object} cases
 * @returns {*}
 */
function switchCase(operand, cases) {
  if (cc.isArray(cases)) {
    for (var index = 0; index < cases.length; index++) {
      if (index == operand) {
        return cases[index];
      }
    }
  } else if (cc.isObject(cases)) {

    for (var prop in cases) {
      if (operand == prop) {
        return cases[prop];
      }
    }
    if (cases.hasOwnProperty('default')) return cases.default;
  }
  cc.assert(true, 'switchCase: no case matches the given operand');
  return null;
}