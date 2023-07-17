const base64 = require("base64-img");
const path = require("path");
const fs = require("fs");


module.exports = (destination,image) => {
  if (destination == "users") {
    if (!fs.existsSync(path.join(__dirname,"../../public/users"))) {
      fs.mkdirSync(path.join(__dirname,"../../public/users"));
    }
    const pathImage = base64.imgSync(image, path.join(__dirname,"../../public/users"),"users-".concat(Date.now().toString()));

    return pathImage;

  } else if (destination == "notes") {
    if (!fs.existsSync(path.join(__dirname,"../../public/notes"))) {
      fs.mkdirSync(path.join(__dirname,"../../public/notes"));
    }
    const pathImage = base64.imgSync(image, path.join(__dirname,"../../public/notes"),"notes-".concat(Date.now().toString()));

    return pathImage;
  }
}