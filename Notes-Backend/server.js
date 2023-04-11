import { dataBaseConnect } from "./modules/dbconnect.js";
import express, { Router } from "express";
import route from "./modules/route.js";
import cors from "cors";
import { HttpError } from "./modules/customError.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/", route);

app.use((req, res, next) => {
  next(new HttpError("Sorry We will be right Back!!!"));
});

app.use((error, req, res, next) => {
  if (error) {
    res.status(400).send({
      // status: 404,
      data: null,
      message: error.message,
      success: false,
    });
  }
});
app.listen(port, () => {
  console.log(`Server Created and listening on port ${port}`);
});

dataBaseConnect();
