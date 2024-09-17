import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: "*",
  },
});

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//     console.log("DataBase is successfully connected.");
//   } catch (error) {
//     console.log("Error to connect Database." + error);
//   }
// };

// connectToMongoDB();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("crazy", (data) => {
    console.log(data);
  });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});
