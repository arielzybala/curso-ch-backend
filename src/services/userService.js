const { usersDao } = require("../dao/index");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");
const phoneCodes = require("../utils/countryCodes");
const { handleEmail } = require("../utils/nodemailer");

class UserService {
  constructor() {
    this.dao = usersDao;
  }
  async bringsCodesPhone() {
    return await phoneCodes();
  }

  async sendEmailToAdmin(emailUser, message) {
    const user = await usersDao.listByEmail(emailUser);
    return await handleEmail(
      [user.email, user.nickname, user.address, user.phone],
      process.env.USERNM,
      message
    );
  }
  async takeUserFromCookie(cookieJWT) {
    const user = await checkTokenJwt(cookieJWT);
    return await usersDao.listById(user.id);
  }

  async takeUserById(id) {
    const user = await usersDao.listById(id);
    return user;
  }
}

module.exports = {
  UserService,
};
