import mongoose from "mongoose";

export async function dataBaseConnect() {
  
  await mongoose
    .connect(
      `mongodb+srv://sa80651:dIURTkCYXdmjpShu@notes.a5vf7w5.mongodb.net/notes?retryWrites=true&w=majority`,
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
