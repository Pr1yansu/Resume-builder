import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
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
