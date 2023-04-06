import express from "express";
import {
  addNoteData,
  getNoteData,
  delNoteData,
  modifyNote,
} from "./function.js";

const route = express.Router();

route.get("/", function (req, res) {
  res.send("testing api");
});

route.post("/create", addNoteData);
route.get("/get", getNoteData);
route.delete("/delete", delNoteData);
route.put("/modify", modifyNote);

export default route;
