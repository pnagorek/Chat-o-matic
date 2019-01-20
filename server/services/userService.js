const logger = require('../../commons/logger');
const User = require('../database/models/user');

const createUser = user => new Promise((resolve, reject) => {
  const newUser = new User({
    name: user.name,
  });
  newUser
    .save()
    .then((createdUser) => {
      logger.info(`New user '${user.name}' created successfully.`);
      resolve(createdUser);
    })
    .catch((err) => {
      logger.error(`Creation of user '${user.name}' failed: ${err.message}`);
      reject(err);
    });
});

const _getUsers = condition => new Promise((resolve, reject) => {
  User.find(condition)
    .then((users) => {
      logger.info('Query to find users executed successfully.');
      resolve(users);
    })
    .catch((err) => {
      logger.error(`Error while executing query to find users: ${err.message}`);
      reject(err);
    });
});

const findUserByName = name => _getUsers({ name });

const findAllUsers = () => _getUsers({});

// TODO update

const deleteUserByName = name => new Promise((resolve, reject) => {
  User.deleteOne({ name })
    .then((deletedRecords) => {
      logger.info('Query to delete user executed successfully.');
      if (deletedRecords.deletedCount === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
    .catch((err) => {
      logger.error(`Error while executing query to delete user: ${err.message}`);
      reject(err);
    });
});

module.exports = {
  createUser,
  findUserByName,
  findAllUsers,
  deleteUserByName,
};
