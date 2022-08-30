const {productsDao} = require("../dao/index");
const { asPOJO } = require("../utils/implements");


//Ruta para buscar todos los productos puestos como stock de la tienda es: http://localhost:8080/api/products/  
const getAllProducts = async (req, res, next) => {
    const data = await productsDao.listAll()
    res.render("products", {products: data})
};

const getProductDetail = async (req, res, next) => {
    const data = await productsDao.listById(req.params.id)
    res.render("productDetail", {product: data})
};

const addOneProduct = async (req, res, next) => {
    await productsDao.save(req.body)
    res.json("ok")
    
}


module.exports = {
    getAllProducts,
    getProductDetail,
    addOneProduct
}
