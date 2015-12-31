// AngryMob Copyright (c) 2015 Kristian Ignatov

/**
 * Native class extensions go here.
 */

/**
 * Check if the number fits between a minimum and maximum value, and return the min or max if not.
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
Number.prototype.clamp = function(min, max) {
  if (this < min) return min;
  if (max < this) return max;
  return this.valueOf();
};

/**
 * Generic point constructor. Use this in all non-framework specific files.
 * @param x
 * @param y
 * @constructor
 */
Math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

/**
 * Returns a random number between two values.
 * @param min
 * @param max
 * @returns {number}
 */
Math.randomBetween = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

/**
 * Returns the progress between two numeric values.
 * @param {Number} min
 * @param {Number} max
 * @param {Number} t
 */
Math.lerp = function(min, max, t) {
  return min + t * (max - min);
};
/**
 * Checks if a point is within a circle.
 * @param {Object} point
 * @param {Object} circle
 */
Math.pointInCircle = function(point, circle) {
  var deltaX = Math.abs(point.x - circle.x);
  var deltaY = Math.abs(point.y - circle.y);

  if (deltaX > circle.radius || deltaY > circle.radius) {
    return false;
  }
  if (deltaX + deltaY <= circle.radius) {
    return true;
  }
  if (Math.pow(deltaX, 2) + Math.pow(deltaY, 2) <= Math.pow(circle.radius, 2)) {
    return true;
  }
  return false;
};

/**
 * Moves or returns a point between two other points.
 * @param start
 * @param destination
 * @param speed
 * @param target
 */
Math.moveBetweenPoints = function(start, destination, speed, target) {
  var tx = destination.x - start.x,
      ty = destination.y - start.y,
      dist = Math.sqrt(tx*tx+ty*ty),
      rad = Math.atan2(ty,tx),
      angle = rad/Math.PI * 180;

  var velX = (tx/dist)*speed;
  var velY = (ty/dist)*speed;

  if (target) {
    target.x += velX;
    target.y += velY;
    return false;
  }

  return new Point(start.x + velX, start.y + velY);
};

/**
 * Various Node extensions.
 */
/*
cc.Node.implement({
  retained: [],
  onExit: function() {
    while (this.retained.length) {
      this.retained[0].release();
      console.log(this.retained.shift());
    }
  }
});*/
