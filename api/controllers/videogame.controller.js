'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const videogameService = require('../services/videogame.service');

// Module Name
const MODULE_NAME = '[VideoGame Controller]';
// Error Messages
const VG_CT_ERR_VIDEOGAME_NOT_FOUND = 'Videogame not found';
// Success Messages
const VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY = 'Videogame deleted successfully';

const getVideoGames = (req, res) => {

  try {
    // Receiving parameters
    const params = {
      name: req.swagger.params.name.value,
      developer: req.swagger.params.developer.value,
      gamesystem: req.swagger.params.gamesystem.value,
      genre: req.swagger.params.genre.value,
      sort: req.swagger.params.sort.value,
      fields: req.swagger.params.fields.value,
    };

    // Call to service
    const result = videogameService.getVideoGames(params);

    // Returning the result
    res.json(result);

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGames.name, error, res);
  }
}

const getVideoGameById = (req, res) => {

  try {
    // Receiving parameters
    const id = req.swagger.params.id.value

    // Call to service
    const result = videogameService.getVideoGameById(id);

    // Returning the result
    if (!_.isUndefined(result)) {
      res.json(result);
    } else {
      res.status(404).json(messageHelper.buildMessage(VG_CT_ERR_VIDEOGAME_NOT_FOUND));
    }

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getVideoGameById.name, error, res);
  }
}

const createVideoGame = (req, res) => {

  try {
    // Receiving parameters
    const params = req.body;

    // Call to service
    const result = videogameService.createVideoGame(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.status(201).json(result);
    } else {
      res.status(404).json(messageHelper.buildMessage(result.error));
    }

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createVideoGame.name, error, res);
  }
}

const updateVideoGame = (req, res) => {

  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value
    };
    _.assign(params, req.body);

    // Call to service
    const result = videogameService.updateVideoGame(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.json(result);
    } else {
      res.status(404).json(messageHelper.buildMessage(result.error));
    }

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateVideoGame.name, error, res);
  }
}

const deleteVideoGame = (req, res) => {

  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value
    };

    // Call to service
    const result = videogameService.deleteVideoGame(params.id);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.json(messageHelper.buildMessage(VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY));
    } else {
      res.status(404).json(messageHelper.buildMessage(result.error))
    }

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteVideoGame.name, error, res);
  }
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  MODULE_NAME,
  VG_CT_ERR_VIDEOGAME_NOT_FOUND,
  VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY
}
