const Joi = require("joi");

module.exports = {
  createUserSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    
    repeatPassword: Joi.ref("password"),

    nickname: Joi.string().alphanum().pattern(new RegExp("^[a-zA-Z]{3,30}$")).min(3).required(),

    age: Joi.number().integer().required(),

    address: Joi.string().min(3).max(30).required(),

    codesCountry: Joi.string().required(),

    phone: Joi.number().required(),

  }).with("password", "repeatPassword"),
  
  logUserSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
};
