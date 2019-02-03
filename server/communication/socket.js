const constants = require('../commons/const');
const logger = require('../../commons/logger');

const onlineUsers = [];

const init = (io) => {
  io.on(constants.CONN, (socket) => {
    logger.info(`Connection ${socket.handshake.address}`);

    socket.on(constants.DISC, () => {
      logger.info(`User disconnected ${socket.handshake.address}`);
      for (let i = 0; i < onlineUsers.length; i += 1) {
        if (onlineUsers[i].socket === socket) {
          logger.info(`User logged off: ${onlineUsers[i].username}`);
          socket.broadcast.emit(onlineUsers[i].room, {
            message: `User logged off: ${onlineUsers[i].username}`,
          });
          onlineUsers.splice(i, 1);
        }
      }
    });

    socket.on(constants.LOG_ON, (data) => {
      logger.info(`User logged in: ${data.username}`);
      socket.broadcast.emit(constants.LOBBY, { message: `User logged in: ${data.username}` });
      onlineUsers.push({
        username: data.username,
        socket,
        room: 'lobby',
      });
    });

    socket.on(constants.MSG, (data) => {
      for (let i = 0; i < onlineUsers.length; i += 1) {
        if (onlineUsers[i].socket === socket) {
          if (onlineUsers[i].room === 'lobby') {
            io.emit(constants.LOBBY, { message: `${data.message}` });
            break;
          } else {
            io.to(onlineUsers[i].room).emit(onlineUsers[i].room, { message: `${data.message}` });
          }
        }
      }
    });

    socket.on(constants.PM, (data) => {
      for (let i = 0; i < onlineUsers.length; i += 1) {
        if (onlineUsers[i].username === data.toUser) {
          socket.broadcast
            .to(onlineUsers[i].socket.id)
            .emit(constants.PM, { message: `${data.message}` });
        }
      }
    });

    socket.on('joinRoom', (data) => {
      for (let i = 0; i < onlineUsers.length; i += 1) {
        if (onlineUsers[i].socket === socket) {
          io.to(data.roomName).emit(data.roomName, {
            message: `${onlineUsers[i].username} joined.`,
          });
          socket.leave(onlineUsers[i].room);
          io.to(onlineUsers[i].room).emit(onlineUsers[i].room, {
            message: `${onlineUsers[i].username} left.`,
          });
          socket.join(data.roomName);
          onlineUsers[i].room = data.roomName;
        }
      }
    });
  });
};

module.exports = { init };
