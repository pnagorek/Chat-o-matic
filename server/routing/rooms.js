const express = require('express');

const router = express.Router();
const roomService = require('../services/roomService');

router.post('/create', (req, res) => {
  const { name, owner } = req.body;
  roomService
    .createRoom({ name, owner })
    .then(() => res.redirect('/'))
    .catch(() => res.json({ error: 'Unable to create new room! Try again later!' }));
});

router.get('/', (req, res) => {
  roomService
    .getRooms()
    .then(rooms => res.json({ rooms }))
    .catch(() => {
      console.log('e1');
    });
});

module.exports = router;
