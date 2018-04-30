"use strict";

/**
 * Validate parameters
 *
 * @module lib/validate
 */
const rootPrefix = ".."
;

/**
 * Validate parameters constructor
 *
 * @constructor
 */
const ValidateKlass = function() {};

ValidateKlass.prototype = {

  /**
   * Check if parameter is present
   *
   * @param {string} param - parameter value
   *
   * @public
   */
  isPresent: function (param) {
    return (typeof param !== 'undefined' && param !== null);
  }

};

module.exports = new ValidateKlass();