import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import {
  createRoom,
  getRooms,
  joinRoom,
  leaveRoom,
} from "../controllers/room.controller";

const userRouter = Router();

userRouter.get("/rooms", getRooms);

userRouter.post("/room", checkAuth, createRoom);

userRouter.delete("/room", checkAuth, leaveRoom);

userRouter.post("/room/:id", checkAuth, joinRoom);

export default userRouter;
