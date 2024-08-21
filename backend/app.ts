import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import type { NextFunction, Request, Response } from "express";
import connectDB from "./config/db";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import userRoutes from "./routes/user";
import resumeRoutes from "./routes/resume";
import "./config/passport";
import type { ResumeType } from "./types";
import { editResumeDetails } from "./controllers/resume";

// Connect to the database
connectDB();

const app = express();

// CORS configuration
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

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Session configuration
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
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    proxy: process.env.NODE_ENV === "production",
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.send("Hello World");
});

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resume", resumeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Server is shutting down");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Server is shutting down");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error. Shutting down the server", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(
    "There was an unhandled rejection. Shutting down the server",
    err
  );
  process.exit(1);
});
