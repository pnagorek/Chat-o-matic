const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

router.post('/register', (req, res) => {
  const {
    username, email, password, confirmPassword,
  } = req.body;

  if (confirmPassword !== password) {
    return res.json({ error: 'Passwords do not match!' });
  }

  userService
    .createUser({ username, email, password })
    .then(() => res.redirect('/'))
    .catch(() => res.json({ error: 'Unable to create new user! Try again later!' }));
});

router.get('/', (req, res) => {
  userService
    .findAllUsers()
    .then((users) => {
      const allUsers = users.map(user => user.username);
      return res.json({ allUsers });
    })
    .catch(() => {
      console.log('e1');
    });
});

router.get('/getCurrent', (req, res) => {
  if (req.user) {
    return res.json({ username: req.user.username });
  }
  return res.status(400);
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
