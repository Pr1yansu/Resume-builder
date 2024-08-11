import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { createServer } from "http";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import connectDB from "./config/db";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import userRoutes from "./routes/user";
import resumeRoutes from "./routes/resume";
import "./config/passport";

connectDB();
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        process.env.WHITELIST!.indexOf(origin.replace(/\/$/, "")) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
      priority: "high",
    },
    proxy: process.env.NODE_ENV === "production",
  })
);
app.use(passport.initialize());
app.use(passport.session());

io.on("connection", (socket) => {
  console.log("Connected with WS");
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resume", resumeRoutes);

process.on("SIGINT", () => {
  console.log("Server is shutting down");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Server is shutting down");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error Shutting down the server", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(
    "There was an unhandled rejection Shutting down the server",
    err
  );
  process.exit(1);
});
