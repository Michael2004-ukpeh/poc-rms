const multer = require("multer");
const path = require("path");
const AppError = require("./AppError");

let allowedImages;
// TODO Write File filter for images more than 2mb and documents more than 5mb
// Multer config
module.exports = multer({
  dest: "uploads/",
  storage: multer.diskStorage({}),

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".xlsx") {
      cb(new AppError("File type is not  supported", 400), false);
    }

    cb(null, true);
  },
});
