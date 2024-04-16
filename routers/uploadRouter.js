const { Router } = require("express");
const upload = require("multer");
const { resultUpload, renderPage } = require("../controllers/uploadController");
const router = Router();

router.route("/upload").post(upload().single("result"), resultUpload);

router.route("/").get(renderPage);
module.exports = router;
