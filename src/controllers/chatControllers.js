const { ChatService } = require("../services/chatServices");
const service = new ChatService();

const chatView = (_req, res, _next) => {
  res.render("chatRoom");
};

const chatUserView = async (req, res, _next) => {
    const data = await service.listByEmail(req.params.id)
    res.render("chatUserRoom" , {author: data});
  };

const chatResMessage = async (req, res, _next) => {
   await service.sendEmailResponse(req.body.emailRes, req.params.email, req.cookies.jwt)
   res.status(201).render("emailSended")
}

module.exports = {
  chatView,
  chatUserView,
  chatResMessage
};
