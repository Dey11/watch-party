import { Request, Response, Router } from "express";
import { login, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.get("/logout", (req: Request, res: Response) => {});

export default authRouter;
