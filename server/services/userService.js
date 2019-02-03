const logger = require('../../commons/logger');
const User = require('../database/models/user');

const createUser = user => new Promise((resolve, reject) => {
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: user.password,
  });
  newUser
    .save()
    .then((createdUser) => {
      logger.info(`New user '${user.username}' created successfully.`);
      resolve(createdUser);
    })
    .catch((err) => {
      logger.error(`Creation of user '${user.username}' failed: ${err.message}`);
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

const findUserByName = username => _getUsers({ username });

const findAllUsers = () => _getUsers({});

// TODO update

const deleteUserByName = username => new Promise((resolve, reject) => {
  User.deleteOne({ username })
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
