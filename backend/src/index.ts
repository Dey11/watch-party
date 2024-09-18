import { json } from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { app, httpServer } from "./socket";
import cors from "cors";

require("dotenv").config();

const PORT = 4000;

app.use(cors());
app.use(json());

console.log("hello there");

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
