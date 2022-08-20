const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/*
 * las estrategias se empiezan a definir cuando queremos encargarnos de hacer el cómo va a suceder:
 * que el usuario se registre
 * que el usuario se logee
 *
 * */

const bcrypt = require("bcrypt"); //con esto haseamos un pedazo de string

const users = []; //esta sería la base de datos

// registración (es local porque construimos la constante previamente como local).
passport.use(
  "registracion",
  new LocalStrategy((username, password, cb) => {
    //username y password son los valores que le van a llegar desde el req.body <-----

    //acá ponemos los chequeos de que no sea repetido (iríamos a la base de datos, consultamos si existe)
    const user = users.find((u) => u.username === username);
    if (user) return cb(new Error("Ya existe"));

    //con esto haseamos la contraseña
    const passwordHaseado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    /*
    diferencia entre hashing y encriptación: 
    Hash: El contenido es usado como la clave, es de longitud fija. El objetivo es convertir el texto inicial y hacerlo lo mas difícil para volver a ser el original.
    Encriptado: El encriptado además de convertir los datos en una serie de caracteres, usa claves.
    */

    const usuarioCreado = { username, password: passwordHaseado };

    //acá iriamos a la base de datos y agregaríamos el usuario
    users.push({ username, password: passwordHaseado });

    cb(null, usuarioCreado);
    // el callback es para que tenga retorno y uso modular
    // acá si pones cb(null, false) se registra, pero no authentica
    // si pones cb(null, usuarioCreado), se registra y authentica
  })
);

//estrategia de autenticación, cuando ya tenemos en la base de datos al usuario registrado. Y entramos en la dinámica de "ver que el usuario y la contraseña sean las correctas para volver a loguearse"
passport.use(
  "autentication",
  new LocalStrategy((username, password, cb) => {
    //primero constatar en la base de datos que esta el usuario
    const user = user.find((u) => u.username === username);
    if (!user || bcrypt.compareSync(password, user.password))
    //luego con bcrypt, comparar como viene el user.password con el word que nos trae el id de la base de datos
      return cb(
        new Error("Usuario no tiene registro, o la contraseña es incorrecta")
      );
      cb(null, user);
  })
);

//SERIALIZAR UN USUARIO y DESERIALIZAR UN USUARIO

passport.serializeUser((usuario, cb) => {
  cb(null, usuario.username);
}); // cuando serializas, se eligue "que guardas en la cookie"

passport.deserializeUser((username, cb) => {
  const user = users.find((usr) => usr.username == username);
  cb(null, user); // cuando des-seliazas, se elige que se reconstruye de lo que elegimos guardar
});

module.exports = passport;
