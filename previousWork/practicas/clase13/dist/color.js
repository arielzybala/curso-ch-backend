"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var red = randomNum(0, 225);
var green = randomNum(0, 225);
var blue = randomNum(0, 225);

var Contenedor = /*#__PURE__*/function () {
  function Contenedor(red, green, blue) {
    _classCallCheck(this, Contenedor);

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  _createClass(Contenedor, [{
    key: "getNewColor",
    value: function getNewColor() {
      console.log("El color es RGB( ".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ")"));
    }
  }]);

  return Contenedor;
}();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var color = new Contenedor(red, green, blue);
module.exports = {
  color: color
};