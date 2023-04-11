import noteSchema from "./schema/schema.js";
import { HttpError } from "./customError.js";

export const addNoteData = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const created = await noteSchema.create({ title, description });
    console.log("data Posted on DB");
    console.log(created);
    if (created) {
      res.send(
        JSON.stringify({
          status: 201,
          message: "Node Added Sucessfully",
          data: created,
        })
      );
    } else {
      next(new HttpError("Document Not created", 404, data));
    }
  } catch (error) {
    next(error);
  }
};

export const getNoteData = async (req, res, next) => {
  try {
    // const data = null;

    const data = await noteSchema.find();
    if (data) {
      res.send(
        JSON.stringify({
          status: 200,
          message: "Documents Found",
          data: data,
        })
      );
    } else {
      next(new HttpError("No Data was Found in Database", 404, null));
    
    }
  } catch (err) {
    next(err);
  }
};

export const delNoteData = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await noteSchema.findById(id);

    if (data) {
      const deleted = data.deleteOne({ id });
      if (deleted) {
        res.send(
          JSON.stringify({
            status: 200,
            message: "Selected Note Deleted Sucessfully ",
            data: deleted,
          })
        );
      }
    } else {
      next(new HttpError("Document Not Found", 404, data));

    }
  } catch (err) {
    next(err);
  }
};

export const modifyNote = async (req, res, next) => {
  try {
    const { id, title, description } = req.body;
    console.log(id);
    const data = await noteSchema.findById(id);
    console.log(data);
    if (data) {
      const updateNote = await noteSchema.findByIdAndUpdate(
        data,

        {
          title,
          description,
        }
      );
      console.log(updateNote);
      res.send(
        JSON.stringify({
          status: 200,
          message: "Modified data Saved",
          data: data,
        })
      );
    } else {
      next(new HttpError("Document Not Found", 404, data));
   
    }
  } catch (err) {
    next(err);
  }
};
