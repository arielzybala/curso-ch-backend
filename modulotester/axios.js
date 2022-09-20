const axios = require("axios").default;

const getAllProductData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    console.log(response.statusText);
    console.log(response.status.toPrecision());
  } catch (error) {
    console.error(error.message);
  }
};

const getOneProductDetail = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/1");
    console.log(response.statusText);
    console.log(response.status.toPrecision());
  } catch (error) {
    console.error(error.message);
  }
};

const addOneProduct = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/products/", {
      "title": "Test Nombre Producto",
      "price": 1000,
      "text": "Test Descripción Producto",
      "thumbnail": "TestNombreImagen.jpg",
      "code": "Test código de producto",
    });
    console.log(response.statusText);
    console.log(response.status.toPrecision());
  } catch (error) {
    console.error(error.message);
  }
};

const updateOneProduct = async () => {
  try {
    await axios.put("http://localhost:8080/api/products/", {
      "title": "Test Nombre Producto Actualizado",
      "price": 1001,
      "text": "Test Descripción Producto Actualizado",
      "thumbnail": "TestNuevoNombreImagen.jpg",
      "code": "Test código de producto Actualizado",
      "id": 17,
    });
    console.log(response.statusText);
    console.log(response.status.toPrecision());
  } catch (error) {
    console.error(error.message);
  }
};

const deleteOneProduct = async () => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/api/products/17"
    );
    console.log(response.statusText);
    console.log(response.status.toPrecision());
  } catch (error) {
    console.error(error.message);
  }
};
/** 
 * 
 getAllProductData().then(() => {
     console.log('Request')
    })
    
    getOneProductDetail().then(()=>{
        console.log('Request')
    })
    
    addOneProduct().then(()=>{
        
    })
    */

/** 
   deleteOneProduct().then(()=>{
       console.log('Request')
    })
    */

Promise.all([
  getAllProductData(),
  getOneProductDetail(),
  addOneProduct(),
  updateOneProduct(),
  deleteOneProduct(),
]).then(function (result) {
  const allInventary = result[0];
  const oneOnDetail = result[1];
  const oneNewProduct = result[2];
  const updateProduct = result[3];
  const deleteByOne = result[0];
});
