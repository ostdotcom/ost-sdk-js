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
  },


  /**
   * Get user id from params
   *
   * @param {object} params
   */
  getUserId: function (params) {
    const oThis = this;
    if (oThis.isPresent(params.user_id)) {
      return params.user_id;
    } else {
      throw new Error('user_id missing in request params');
    }
  },

  /**
   * Get chain id from params
   *
   * @param {object} params
   */
  getChainId: function (params) {
    const oThis = this;
    if (oThis.isPresent(params.chain_id)) {
      return params.chain_id;
    } else {
      throw new Error('chain_id missing in request params');
    }
  },

  /**
   * Get device address from params
   *
   * @param {object} params
   */
  getDeviceAddress: function(params){
    const oThis = this;
    if (oThis.isPresent(params.device_address)) {
      return params.device_address;
    } else {
      throw new Error('device_address missing in request params');
    }
  },

  /**
   * Get session address from params
   *
   * @param {object} params
   */
  getSessionAddress: function(params){
    const oThis = this;
    if (oThis.isPresent(params.session_address)) {
      return params.session_address;
    } else {
      throw new Error('session_address missing in request params');
    }
  },

  getTransactionId: function(params){
    const oThis = this;
    if (oThis.isPresent(params.transaction_id)) {
      return params.transaction_id;
    } else {
      throw new Error('transaction_id missing in request params');
    }
  },

  getRecoveryOwnerAddress: function(params){
    const oThis = this;
    if (oThis.isPresent(params.recovery_owner_address)) {
      return params.recovery_owner_address;
    } else {
      throw new Error('recovery_owner_address missing in request params');
    }
  }





};

module.exports = new ValidateKlass();