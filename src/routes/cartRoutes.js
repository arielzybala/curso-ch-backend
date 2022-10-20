const express = require("express");
const controllers = require("../controllers/cartControllers");
const { checkCartOpen } = require("./middleware/openCart");
const { Router } = express;
const router = new Router();

router.use(checkCartOpen); /* ESTE MIDDLEWARE:
TIENE LA FUNCIÓN DE CREAR EL CARRITO EN LA BASE DE DATOS Y DEJARLO EN UNA COOKIE, O NEXT()*/

router.get("/", controllers.getAll);

router.put("/:id/", controllers.putInCart);

router.delete("/:id/", controllers.deleteCart);

module.exports = router;

/*Explicación sobre aspecto de arquitectura: El middleware "checkCartOpen" debería estar en la carpeta de controllers para mantener el patrón MVC, pero según mi interpretación, si tenes en el cluster un espacio dedicado a una base de datos para las "ordenes de compra" efectivamente realizadas, como se pide en las pautas del proyecto. Para qué tener una base de datos para los carritos de compra(?), salvo que busqué registrar o hacer un seguimiento de cuántos usuarios o qué productos seleccionan y luego no piden, otra opción no tiene sentido, es mejor usar una cookie e ir indicando modificaciones en el payload y buscar de usar telemetricas en los microservicios*/
