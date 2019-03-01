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
    return (typeof param !== 'undefined' && param !== null && String(param).trim() !== '');
  },

  /**
   * Check if parameter is valid
   *
   * @param {string} param - parameter value
   *
   * @public
   */
  isValid: function(param) {
    const oThis = this,
    regex = /^[a-zA-Z0-9_\.\-]+$/;
    return oThis.isPresent(param) && String(param).match(regex);
  },

  /**
   * Get id from params
   *
   * @param {object} params
   */
  getId: function (params) {
    const oThis = this;
    if (oThis.isValid(params.id)) {
      var id = params.id;
      delete params.id;
      return id;
    } else {
      throw new Error('id missing or invalid in request params');
    }
  },


  /**
   * Get user id from params
   *
   * @param {object} params
   */
  getUserId: function (params) {
    const oThis = this;
    if (oThis.isValid(params.user_id)) {
      var userId = params.user_id;
      delete params.user_id;
      return userId
    } else {
      throw new Error('user_id missing or invalid in request params');
    }
  },

  /**
   * Get chain id from params
   *
   * @param {object} params
   */
  getChainId: function (params) {
    const oThis = this;
    if (oThis.isValid(params.chain_id)) {
      var chainId = params.chain_id;
      delete params.chain_id;
      return chainId
    } else {
      throw new Error('chain_id missing or invalid in request params');
    }
  },

  /**
   * Get device address from params
   *
   * @param {object} params
   */
  getDeviceAddress: function(params){
    const oThis = this;
    if (oThis.isValid(params.device_address)) {
      var deviceAddress = params.device_address;
      delete params.device_address;
      return deviceAddress;
    } else {
      throw new Error('device_address missing or invalid in request params');
    }
  },

  /**
   * Get session address from params
   *
   * @param {object} params
   */
  getSessionAddress: function(params){
    const oThis = this;
    if (oThis.isValid(params.session_address)) {
      var sessionAddress = params.session_address;
      delete params.session_address;
      return sessionAddress;
    } else {
      throw new Error('session_address missing or invalid in request params');
    }
  },

  getTransactionId: function(params){
    const oThis = this;
    if (oThis.isValid(params.transaction_id)) {
      var TxAddress = params.transaction_id;
      delete params.transaction_id;
      return TxAddress;
    } else {
      throw new Error('transaction_id missing or invalid in request params');
    }
  },

  getRecoveryOwnerAddress: function(params){
    const oThis = this;
    if (oThis.isValid(params.recovery_owner_address)) {

      var RecoveryAddress = params.recovery_owner_address;
      delete params.recovery_owner_address;
      return RecoveryAddress;
    } else {
      throw new Error('recovery_owner_address missing or invalid in request params');
    }
  }

};

module.exports = new ValidateKlass();