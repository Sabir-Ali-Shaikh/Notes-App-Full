import { config } from "./config.js";
import mongoose from "mongoose";

export async function dataBaseConnect() {
  await mongoose
    .connect(
      `mongodb+srv://${config.userName}:${config.pass}@cluster0.wkoexdd.mongodb.net/${config.dbName}?retryWrites=true&w=majority`,
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
