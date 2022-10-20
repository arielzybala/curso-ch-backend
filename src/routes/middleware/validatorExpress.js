const { body, validationResult } = require("express-validator");

const validatorExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res
      .status(400)
      .render("errorValidationExpress", {
        error: message,
        scripts: "/js/errors/redirectRoot.js",
      });
  }
  next();
};

const validatorUpload = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res
      .status(400)
      .render("errorValidationExpress", {
        error: message,
        scripts: "../../js/errors/redirectRootProducts.js",
      });
  }
  next();
};

const validatorUploadOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res
      .status(400)
      .render("errorValidationOrder", {
        error: message,
        scripts: "/js/errors/redirectRootOrders.js",
      });
  }
  next();
};

const passwordConfirmation = async (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Los Passwords ingresados no son iguales");
  }
  return true;
};

const valuesToCheck = [
  body("email", "El email ingresado no es correcto").exists().isEmail(),
  body("password", "El password ingresado no cumple con al menos 4 caracteres")
    .exists()
    .isLength({ min: 4 }),
  body("repeatPassword").custom(passwordConfirmation),
  body("nickname", "Por favor ingrese un nombre correcto")
    .exists()
    .isLength({ min: 3 }),
  body("age").exists().isNumeric(),
  body("address", "Por favor ingrese un domicilio como el sugerido")
    .exists()
    .isLength({ min: 10 }),
  body("phone", "Por favor ingrese un número de teléfono correcto")
    .exists()
    .isNumeric()
    .isLength({ min: 11 }),
];

const valuesToCheckInventory = [
  body("title", "Debe ingresar un nombre de producto")
    .exists()
    .isString()
    .isLength({ min: 10 }),
  body("price", "Debe ingresar un precio de Producto").exists().isNumeric(),
  body("text", "Debe ingresar una descripción del Producto")
    .exists()
    .isString()
    .isLength({ min: 10 }),
  body("category", "Debe ingresar una categoría de Producto")
    .exists()
    .isString()
    .isLength({ min: 6 }),
];

const valuesToCheckOrders = [
  body("email", "El email ingresado no es correcto").exists().isEmail(),
  body("address", "Por favor ingrese un domicilio como el sugerido")
    .exists()
    .isLength({ min: 10 }),
  body("orderNumber", "Número incorrecto de Orden").exists().isNumeric(),
  body("state", "Un estado correcto").exists().isString(),
];

module.exports = {
  valuesToCheck,
  validatorExpress,
  valuesToCheckInventory,
  validatorUpload,
  valuesToCheckOrders,
  validatorUploadOrder,
};
