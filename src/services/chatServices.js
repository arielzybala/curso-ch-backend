const { messagesDao } = require("../dao/index");
const { UserService } = require("./userService");
const service = new UserService();
const cookie = require("cookie");
const { handleEmail } = require("../utils/nodemailer");
const { logger } = require("../utils/logger");
const jwt = require("jsonwebtoken");

class ChatService {
  constructor() {
    this.dao = messagesDao;
  }
  async listAllMessages() {
    const db = await this.dao.listAll();
    let messages = [];
    db.map((object) => {
      //se desarticula la cada objeto author, para crear otro que tenga lo necesario para imprimirse en la view
      //por cada iteración del array de mensajes se crea un objeto que consta de text,time,email y avatar
      messages.push(
        object.author.message.map((_e, indexArrayMsg, arrayMsg) =>
          [
            { text: arrayMsg[indexArrayMsg].text },
            { time: arrayMsg[indexArrayMsg].time },
          ].concat(
            { email: object.author.email },
            { avatar: object.author.avatar }
          )
        )
      );
    });
    //con el flat lo aplano, para que todos los mensajes queden una misma tira de array
    const allMessages = messages.flatMap((e) => e);
    //sort para que las fechas luego se impriman en orden, desde el último mensaje enviado hasta el primero que haya sido enviado.
    const sortAllMessages = allMessages.sort((a, b) => {
      let currVal = new Date(a[1].time);
      let nextVal = new Date(b[1].time);
      if (currVal > nextVal) return -1;
      if (currVal < nextVal) return 1;
      return 0;
    });
    return sortAllMessages;
  }

  async listByEmail(email) {
    const db = await this.dao.listAll();
    
    if (db.length <= 0) return [];

    const indexAuthor = db.findIndex((e) => e.author.email == email);
    
    return await db[indexAuthor].author;
  }

/*
OBSERVACIÓN: Esto contradice las pautas del proyecto final

MOTIVO: No tiene sentido lo solicitado. Para dar una contestación ya esta el chat grupal
al ver sólo los mensajes de un usuario, es mejor habilitar la posibilidad de responder de manera individual
*/
  async sendEmailResponse(data, email, token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, content) => {
      if (err) return logger.error("Token invalido");

      const user = await service.takeUserById(content.id);
      //Handlea un correo para contestar a las preguntas del usuario.
      let message = `El usuario ${user.nickname}, con correo: ${user.email} le ha respondido: `;
      return await handleEmail(data, email, message);
    });
  }

  async saveMessage(cookies, messages) {
    /*
    Parsea las cookies y despues se usa la del token 
    para hacerla pasar por un servicio de usuario que hace todo el trabajo
    */
    const cookiesParsed = cookie.parse(cookies);
    const user = await service.takeUserFromCookie(cookiesParsed["jwt"]);
    
    const db = await this.dao.listAll();
    //check para db sin comentarios
    if (db.length >= 0) {
      const indexUserRepeat = db.findIndex((e) => e.author.idUser == user.id);
      //check para ver que el usuario no esté en la db
      if (!indexUserRepeat) {
        //agrega los mensajes al usuario
        db[indexUserRepeat].author.message =
          db[indexUserRepeat].author.message.concat(messages);
        return await this.dao.update(db[indexUserRepeat]);
      }
    }
    //trae los datos del usuario - estructura y guarda el contenido en la db
    const { email, age, nickname, avatar, id } = user;
    const author = {
      email,
      age,
      nickname,
      avatar,
      idUser: id,
      message: [messages],
    };
    return await this.dao.save({ author });
  }
}
//Hay una mejor mamera de hacer estos: user solo el id de la db User(como llave foranea). Reduce el contenido en 4 datos por cada usuario que comenta.
module.exports = { ChatService };
