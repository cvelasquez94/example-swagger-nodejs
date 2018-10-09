'use strict';

const _ = require('lodash');

const gamesystemService = require('../services/gamesystem.service');
const videogameRepository = require('../repositories/videogame.repository');
const messageHelper = require('../helpers/message.helper');

// Error Messages
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';
const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found updating a videogame';
const VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found deleting a videogame';


const getVideoGames = params => videogameRepository.getVideoGames(params);
const getVideoGameById = id  => videogameRepository.getVideoGameById(id);

function createVideoGame(params) {

  let result;
  // Comprobamos si existe el gamesystem asociado

  const gamesystemFound = gamesystemService.getGameSystemByName(params.gamesystem);

  if (!_.isUndefined(gamesystemFound)) {

    // Comproamos que no exista para el mismo gamesystem el juego por nombre
    const videogamesFound = videogameRepository.getVideoGames({ name: params.name, gamesystem: params.gamesystem })

    if (videogamesFound.length == 0) {
      result = videogameRepository.createVideoGame(params);
    } else {
      result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND);
  }
  return result;
}

const updateVideoGame = params => {
  let result = videogameRepository.updateVideoGame(params);
  if (_.isUndefined(result)) {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND);
  }
  return result;
}

const deleteVideoGame = id => {

  const bDeleted = videogameRepository.deleteVideoGame(id);

  if (bDeleted) {
    return true;
  } else {
    return messageHelper.buildErrorMessage(VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND);
  }
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME,
  VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND,
  VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND,
  VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND
}
