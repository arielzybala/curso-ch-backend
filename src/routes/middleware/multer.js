const multer = require("multer");
const Users = require("../../models/userModel");
const mimeTypes = require("mime-types");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: async function (req, file, cb) {
    const findUser = await Users.findOne({ email: req.body.email });
    if (!findUser) {
      cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
    } else {
      cb(null);
    }
  },
});
const uploader = multer({ storage: storage });

module.exports = uploader;
