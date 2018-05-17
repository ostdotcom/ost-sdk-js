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
  },

  /**
   * Get id from params
   *
   * @param {object} params
   */
  getId: function (params) {
    const oThis = this;
    if (oThis.isPresent(params.id)) {
      return params.id;
    } else {
      throw new Error('id missing in request params');
    }
  }

};

module.exports = new ValidateKlass();