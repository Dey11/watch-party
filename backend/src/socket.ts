import { Server } from "socket.io";
import express, { json } from "express";
import { createServer } from "http";

export const app = express();
export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join-room", (data) => {
    console.log(data);
  });
});
