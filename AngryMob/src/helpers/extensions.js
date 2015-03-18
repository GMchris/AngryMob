// AngryMob Copyright (c) 2015 Todor Radkov and Kristian Ignatov

/**
 * Native class extensions go here.
 */

/**
 *  Check if the number fits between a minimum and maximum value, and return the min or max if not.
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
Number.prototype.clamp = function(min, max) {
  if (this < min) return min;
  if (max < this) return max;
  return this.valueOf();
};