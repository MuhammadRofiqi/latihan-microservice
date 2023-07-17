const upload = require("../helpers/upload")
const fs = require("fs");
const path = require("path");


module.exports = class usercontroller{
  static async storeavatar(req, res) {
// get data from body
    const {image, filename = null} = req.body;

    if (filename){
      fs.unlinkSync(path.join(__dirname, "../../public/".concat(filename)));
    }

    const imagepath = upload("users",image);

    return res.json({
      path: imagepath.split("\\").splice(-2).join("/")
    });
  }
}