const autocannon = require("autocannon");
const { PassThrough } = require("stream");

const run = (url) => {
  const buf = [];
  const outputStream = new PassThrough();
  //estas dos constantes un array vacío y un stream de salida
  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });
  //aca se define como hacer la prueba
  autocannon.track(inst, { outputStream });
  //aca se define la inspección de la prueva y ese outputStream dicen donde queremos que se escriban los resultados de salida
  outputStream.on("data", (data) => buf.push(data));
  //aca indica que es en el array vacío BUF
  inst.on("done", () => {
    //cuando termina de capturar todos los datos que fueron llegando en el buf. acá se indica donde queremos que se escriba(la consola)
    process.stdout.write(Buffer.concat(buf));
  });
}
console.log("Running all benchmarks in parallel...");

run("http://localhost:8080/auth-nobloq?username=dani&password=qwerty123");
run("http://localhost:8080/auth-bloq?username=dani&password=qwerty123");
//aca se ven que rutas se van a ejecutar



//http://localhost:8080/newUser?username=dani&password=qwerty123

