const logger = require('../../commons/logger');
const Room = require('../database/models/room');

const createRoom = room => new Promise((resolve, reject) => {
  const newRoom = new Room({
    name: room.name,
    owner: room.owner,
  });
  newRoom
    .save()
    .then((createdRoom) => {
      logger.info(`New room '${room.name}' created successfully.`);
      resolve(createdRoom);
    })
    .catch((err) => {
      logger.error(`Creation of room '${room.name}' failed: ${err.message}`);
      reject(err);
    });
});

const getRooms = () => new Promise((resolve, reject) => {
  Room.find()
    .then((rooms) => {
      logger.info('Query to find rooms executed successfully.');
      resolve(rooms);
    })
    .catch((err) => {
      logger.error(`Error while executing query to find rooms: ${err.message}`);
      reject(err);
    });
});

module.exports = {
  createRoom,
  getRooms,
};
