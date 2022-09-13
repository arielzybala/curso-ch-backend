const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
const model = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  codesCountry: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
};


const regExp = {
	usuario: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nickname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{11,14}$/ // 7 a 14 numeros.
  
}