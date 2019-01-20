const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {
  userService
    .findAllUsers()
    .then((users) => {
      console.log(users);
    })
    .catch(() => {
      console.log('e1');
    });
});

router.get('/:name', (req, res) => {
  userService
    .findUserByName(req.params.name)
    .then((user) => {
      console.log(user);
    })
    .catch(() => {
      console.log('e1');
    });
});

router.post('/', (req, res) => {
  userService
    .createUser({ name: 'andy1' })
    .then(() => {
      console.log('e');
    })
    .catch(() => {
      console.log('e1');
    });
});

router.delete('/:name', (req, res) => {
  userService
    .deleteUserByName(req.params.name)
    .then((result) => {
      console.log(result);
    })
    .catch(() => {
      console.log('e1');
    });
});

module.exports = router;
