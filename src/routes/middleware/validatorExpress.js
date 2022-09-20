const { body, validationResult } = require("express-validator");

const validatorExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res.status(400).render("errorValidationExpress", { error: message });
  }
  next();
};


const passwordConfirmation = async (value, { req }) => {
if (value !== req.body.password) {
  throw new Error('Los Passwords ingresados no son iguales');
}
return true;
}

const valuesToCheck = [
  body("email", "El email ingresado no es correcto").exists().isEmail(),
  body("password", "El password ingresado no cumple con al menos 4 caracteres")
  .exists()
  .isLength({ min: 4 }),
  body('repeatPassword').custom(passwordConfirmation),
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

const newProductDataValid = [
  body("title").exists().isString(),
  body("price").exists().isNumeric(),
  body("text").exists().isString(),
  body("thumbnail").exists().isString(),
  body("code").exists().isString()

]


module.exports = { valuesToCheck, validatorExpress, newProductDataValid };
