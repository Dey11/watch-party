import { Request, Response, Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/rooms", (req: Request, res: Response) => {});

userRouter.post("/room", checkAuth, (req: Request, res: Response) => {});

userRouter.post("/room/:id", checkAuth, (req: Request, res: Response) => {});

export default userRouter;
