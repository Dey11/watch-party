import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.get("/signin", (req: Request, res: Response) => {});

authRouter.get("/login", (req: Request, res: Response) => {});

authRouter.get("/logout", (req: Request, res: Response) => {});

export default authRouter;
