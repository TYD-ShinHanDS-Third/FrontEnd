const socketIo = require("socket.io");
const express = require("express");
const { addRTCConnectionHandlers } = require("rtc-socket-connector-server");

// 서버 포트
const PORT = 5000;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const socketServer = new socketIo.Server(server);

addRTCConnectionHandlers(socketServer);
