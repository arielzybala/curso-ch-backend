const multer = require("multer");
const {usersDao} = require("../../dao/index");
const mimeTypes = require("mime-types");
const { logger } = require("../../utils/logger");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: async function (req, file, cb) {
    const findUser = await usersDao.listByEmail(req.body.email);
    if (!findUser) {
      cb("", String(Date.now()) + "." + mimeTypes.extension(file.mimetype));
    } else {
      logger.info("El Usuario ya tiene una foto almacenada")
      cb("", String(Date.now()) + "." + mimeTypes.extension(file.mimetype));
    }
  },
});
const uploader = multer({ storage: storage });

const deposit = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/media/products");
  },
  filename: async function (req, file, cb) {
    cb("", file.filename + '-' + String(Date.now()) + "." + mimeTypes.extension(file.mimetype))
  },
});
const fileToUpload = multer({ storage: deposit });

module.exports = fileToUpload;


module.exports = {uploader, fileToUpload};
