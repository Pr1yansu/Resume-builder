import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import userRoutes from "./routes/user";
import "./config/passport";

connectDB();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/api/v1/user", userRoutes);

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
