'use strict'

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const gamesystemService = require('../services/gamesystem.service'); 

// Module Name
const MODULE_NAME = '[GameSystem Controller]';
// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';
// Success Mesagges
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully'; 

const getGameSystems = (req, res) => {
    try {
        const params = {
            name: req.swagger.params.name.value,
            sort: req.swagger.params.sort.value
        };
        // Call to Service
        const result = gamesystemService.getGameSystems(params);

        // Returing the result
        res.json(result);
    } catch(error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
    }
};

const getGameSystemById = (req, res) => {
    try {
        const params = { 
            id: req.swagger.id.value
        };

        const result = gamesystemService.getGameSystemById(params.id);

        if (! _.isUndefined(result)) res.json(result);

        res.status(404).json(messageHelper.buildMessage(GS_CT_ERR_GAMESYSTEM_NOT_FOUND));
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystemById.name, error, res);
    }
}

const createGameSystem = (req, res) => {

    try {
      // Receiving parameters
      const params = req.body;
  
      // Call to service
      const result = gamesystemService.createGameSystem(params);
  
      // Returning the result
      if (!_.isUndefined(result) && _.isUndefined(result.error)) {
        res.status(201).json(result);
      } else {
        res.status(409).json(messageHelper.buildMessage(result.error));
      }
    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
    }
}

const updateGameSystem = (req, res) => {

    try {
      // Receiving parameters
      const params = {
        id: req.swagger.params.id.value
      };
      _.assign(params, req.body);
  
      // Call to service
      const result = gamesystemService.updateGameSystem(params);
  
      // Returning the result
      if (!_.isUndefined(result) && _.isUndefined(result.error)) {
        res.json(result);
      } else {
        res.status(409).json(messageHelper.buildMessage(result.error));
      }
    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
    }
  }
  
const deleteGameSystem = (req, res) => {

    try {
      // Receiving parameters
        const params = {
          id: req.swagger.params.id.value
        };

        // Call to service
        const result = gamesystemService.deleteGameSystem(params.id);

        // Returning the result
        if (!_.isUndefined(result) && _.isUndefined(result.error)) {
            res.json(messageHelper.buildMessage(GS_CT_DELETED_SUCCESSFULLY));
        } else {
            res.status(404).json(messageHelper.buildMessage(result.error));
        }
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
    }
}

module.exports = {
    getGameSystems,
    getGameSystemById,
    createGameSystem,
    updateGameSystem,
    deleteGameSystem,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}
