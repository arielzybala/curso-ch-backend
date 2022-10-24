const express = require("express");
const controller = require("../controllers/chatControllers");
const { validatorToken } = require("./middleware/jsonWebToken");
const { Router } = express;
const router = new Router();

router.get("/chat", validatorToken, controller.chatView);
router.get("/chatUser/:id", validatorToken, controller.chatUserView);
router.post("/chatUser/response/:email", validatorToken, controller.chatResMessage);

module.exports = router;
