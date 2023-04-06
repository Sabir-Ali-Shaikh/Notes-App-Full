import mongoose from "mongoose";
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

async function dataBaseConnect() {
  await mongoose
    .connect(
      `mongodb+srv://sabir:1234@cluster0.wkoexdd.mongodb.net/noteapp?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("Database  connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

dataBaseConnect();
// const title = "book fare";
// const description = "this is test push";

// const res = await addNoteData(title, description);
