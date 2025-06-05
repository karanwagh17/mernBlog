const multer = require("multer");
const fs = require("fs");
const foldername = "./uploads";
const userFoldername = `${foldername}/user`;
const postFoldername = `${foldername}/post`;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername);
        if (!fs.existsSync(userFoldername)) {
          fs.mkdirSync(userFoldername);
        }
        if (!fs.existsSync(postFoldername)) {
          fs.mkdirSync(postFoldername);
        }
      }

      if (file.fieldname == "profileImage") {
        cb(null, userFoldername);
      } else if (file.fieldname == "postImage") {
        cb(null, postFoldername);
      } else {
        cb(new Error("Invalid field name"), null);
      }
    } catch (error) {
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
