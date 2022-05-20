const knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password :'',
      database : 'myapp'
    },
    pool: { min : 2 , max : 8 }
  });

  knex.schema.createTableIfNotExists("users", tbl =>{
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.string('email' , 128);
      tbl.string('password', 12).notNullable();  
  })
  .then(()=>{
      console.log("Conectado. Tabla Creada.")
  })
  .catch((err)=>{
    throw err;
  })

  module.exports = knex;