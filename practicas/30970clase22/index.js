const norm = require("normalizr");

const empresa = require("./blog.json");

const util = require("util");
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}
/*

const gerenteSchema = new norm.schema.Entity("gerente");
const posicionSchema = new norm.schema.Entity("posicion");
const empleadosSchema = new norm.schema.Entity("posicion", {
  posicion: posicionSchema,
  gerente: gerenteSchema,
});

const normalizado = norm.normalize(empresa, [empleadosSchema]);
print(normalizado);

const desnormalizado = norm.denormalize(
  normalizado.result,
  [empleadosSchema],
  normalizado.entities
);
print(desnormalizado);
*/
const richard = require("./data.json");

const jefeSchema = new norm.schema.Entity("jefe");
const areaSchema = new norm.schema.Entity("area");
const clusterSchema = new norm.schema.Entity("cluster");
const workerSchema = new norm.schema.Entity("worker");
const enterpriceSchema = new norm.schema.Entity("enterprice", {
    jefe: jefeSchema,
    area: areaSchema,
    cluster_antiguedad: clusterSchema,
    empleados: workerSchema,
});

const normalizado2 = norm.normalize(richard, [enterpriceSchema]);
print(normalizado2);

const desnormalizado2 = norm.denormalize(
    normalizado2.result,
    [enterpriceSchema],
    normalizado2.entities
  );
  print(desnormalizado2);