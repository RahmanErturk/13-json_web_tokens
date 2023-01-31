import express from "express";
import photoRouter from "./routes/photoRoutes.js";
import albumRouter from "./routes/albumRoutes.js";
import logMiddleware from "./middlewares/log.js";

import dotenv from "dotenv";
dotenv.config();

import "./lib/mongoose.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(logMiddleware);

app.use("/photos", photoRouter);
app.use("/albums", albumRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => console.log("App ist am start auf Port: " + port));
