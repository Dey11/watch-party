import { Request, Response, Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { createRoom, getRooms, joinRoom } from "../controllers/room.controller";

const userRouter = Router();

userRouter.get("/rooms", getRooms);

userRouter.post("/room", checkAuth, createRoom);

userRouter.post("/room/:id", checkAuth, joinRoom);

export default userRouter;
