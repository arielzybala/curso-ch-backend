const knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password :'',
      database : 'ecommerceProductos'
    },
    pool: { min : 2 , max : 8 }
  }); 

  knex.schema.createTableIfNotExists("productos", tbl =>{
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.string('brand' , 30);
      tbl.integer('price');
      tbl.string('image');
  })
  .then(()=>{
      console.log("Conectado. Tabla Creada.")
  })
  .catch((err)=>{
    throw err;
  })

  module.exports = knex;


//module.exports.saveAdminProduct = (data) =>{
//  const {name, brand, price, image} = data
//  let dataNew = {
//    name,
//    brand,
//    price,
//    image
//  };
//  knex("productos")
//    .insert(dataNew)
//    .then(() => {
//      console.log("Información ingresada a la tabla");;
//    })
//    .catch((err) => {
//      throw (err, console.log(err));
//    });
//}

 module.exports.saveAdminProduct = (dataNew) => {
   knex("productos")
     .insert(dataNew)
 
     .then(() => {
       console.log("Información ingresada a la tabla");
     })
 
     .catch((err) => {
       throw (err, console.log(err));
     });
 };


  module.exports.showAllProducts = () =>{
    return knex
    .from("productos")
    .select("*")
  }