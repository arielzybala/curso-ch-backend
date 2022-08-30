const multer = require("multer");
const Users = require("../../models/userModel");
const mimeTypes = require("mime-types");
const { logger } = require("../../utils/logger");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: async function (req, file, cb) {
    const findUser = await Users.findOne({ email: req.body.email });
    if (!findUser) {
      cb("", String(Date.now()) + "." + mimeTypes.extension(file.mimetype));
    } else {
      logger.info("El Usuario ya tiene una foto almacenada")
      cb("", String(Date.now()) + "." + mimeTypes.extension(file.mimetype));
    }
  },
});
const uploader = multer({ storage: storage });

module.exports = uploader;
