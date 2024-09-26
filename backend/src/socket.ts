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

interface IActiveRooms {
  roomId: string;
  userId: string[];
}

let activeRooms: IActiveRooms[] = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join-room", (data) => {
    const { roomId, userId } = data;
    socket.join(roomId);

    let room = activeRooms.find((room) => room.roomId === roomId);
    if (room) {
      room.userId.push(userId);
      activeRooms = [
        ...activeRooms.filter((room) => room.roomId !== roomId),
        room,
      ];
    } else {
      room = { roomId, userId: [userId] };
      activeRooms.push(room);
    }
    console.log(activeRooms);
  });

  socket.on("leave-room", (data) => {
    const { roomId, userId } = data;
    socket.leave(roomId);

    let room = activeRooms.find((room) => room.roomId === roomId);
    if (room) {
      room.userId = room.userId.filter((id) => id !== userId);
      activeRooms = [
        ...activeRooms.filter((room) => room.roomId !== roomId),
        room,
      ];
    }

    console.log(activeRooms);
  });

  socket.on("play", (data) => {
    io.to(data.roomId).emit("play", data);
  });

  socket.on("pause", (data) => {
    io.to(data.roomId).emit("pause", data);
  });

  socket.on("seek", (data) => {
    io.to(data.roomId).emit("seek", data);
  });
});
