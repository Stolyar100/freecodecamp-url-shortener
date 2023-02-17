import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import ErrorMiddleware from "./middlewares/error-middleware.js";
import LinkRouter from "./routers/link-router.js";

// Basic Configuration
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.error(error));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));
app.use("/api/shorturl", LinkRouter);
app.use(ErrorMiddleware);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
