require("dotenv").config();
const db = require("../../database");
const service = require("../helpers/service");
const addNoteSchema = require("../validations/AddNoteSchema");

module.exports = class NoteController {
  static async addNote(req, res) {
    const { error, value } = addNoteSchema.validate(req.body);
    if (error) {
      return res.boom.badData(error.message);
    }

    const id = require("crypto").randomUUID();

    await db("notes")
      .insert({
        id,
        user_id: req.user.id,
        title: value.title,
        content: value.content,
      })
      .catch((err) => {
        return res.boom.badRequest(err.message);
      });

    if (value.images.length) {
      value.images.forEach(async (d) => {
        try {
          const data = await service("assets").post("v1/notes", {
            image: d,
            filename: null,
          });

          await db("note_images").insert({
            note_id: id,
            path: data.data.path,
          });
        } catch (error) {
          if (typeof error.response !== "undefined") {
            return res.boom.badRequest(error.response.data.message);
          } else {
            return res.boom.badRequest(error.message);
          }
        }
      });
    }
    return res.status(201).json({
      success: true,
      message: "note successfully added",
    });
  }
};
