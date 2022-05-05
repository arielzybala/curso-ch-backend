"use strict";

var express = require('express');

var app = express();

var _require = require('./color'),
    color = _require.color;

color.getNewColor();
app.listen(8080, function () {
  console.log("Server Run");
});