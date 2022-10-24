const { CartService } = require("../../services/cartServices");
const service = new CartService();

module.exports = async (req, res, next) => {
  const data = await service.bringCartById(req.cookies.cart.id);
  if (data.products.length <= 0) {
    return res.status(400).json({message: "No tiene productos"});
  }
  next();
};
