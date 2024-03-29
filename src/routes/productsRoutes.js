const express = require("express");
const controller = require("../controllers/productsControllers");
const { fileToUpload } = require("./middleware/multer");
const { onlyAdmin, redirectAdmin } = require("./middleware/onlyAdmin");
const { valuesToCheckInventory, validatorUpload } = require("./middleware/validatorExpress");
const { Router } = express;
const router = new Router();

router.get("/", redirectAdmin, controller.getAllProducts);

router.get("/cat/", redirectAdmin, controller.getCategoryProducts);

router.get("/:id", redirectAdmin, controller.getProductDetail);

router.use(onlyAdmin)

router.get("/admin/inventory", controller.getAllProductsAsAdmin);

router.get("/form/addProduct", controller.formAddOneProduct);

router.post("/", fileToUpload.single("thumbnail"), valuesToCheckInventory, validatorUpload, controller.addOneProduct);

router.delete("/:id", controller.deleteOneProduct);

router.get("/update/:id/", controller.formUpdateProduct);

router.put("/:id", fileToUpload.single("thumbnail"), valuesToCheckInventory, validatorUpload,  controller.updateOneProduct);

module.exports = router;
