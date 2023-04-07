import { dataBaseConnect } from "./modules/dbconnect.js";
import express, { Router } from "express";
import route from "./modules/route.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/", route);
app.listen(port, () => {
  console.log(`Server Created and listening on port ${port}`);
});

dataBaseConnect();
