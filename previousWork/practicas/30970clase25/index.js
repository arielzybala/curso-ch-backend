/**
 * Autenticación y Autorización
 * 
 * Autenticación
 * IDENTIFICAR A UN USUARIO
 * Medios:
 * 
 * Nombre y Contraseña
 * 
 * Passwordless: se envía un correo, te devuelven un codigo temporal
 * 
 * Por redes sociales: funciana con un intermediario, 
 * se aprovecha que el trabajo de ingreso de datos lo tiene el perfil de la red social
 * 
 * Datos Biométricos: Un programa intermedio toma datos de la cara o de la huella y el resultado devuelve un true o un false
 * 
 * JWT (JSON Web Token): trabaja con una clave privada y otra publica. 
 * Es open source, no se necesita guardar en ningun lado. 
 * Es StatesLess, tiene toda la info dentro del mismo json, no necesita de contrastar contraseñas con otros.
 * 
 * OAuth 2.0: Permite que mediante una API(similar a las redes sociales), el usuario pueda hacer login con un perfil,
 * ese perfil devuelva un true y de allí se lo considere usuario para nuestra web o aplicación.
 * 
 *  
 * 
 * 
 * 
 * 
 * Autorización
 * DEFINE INFORMACIÓN, SERVICIOS y RECURSOS, PARA EL USUARIO AUTENTICADO
 * Middleware: Suelen ser funciones intermedias al ingreso de una u otra ruta, 
 * dependiendo de qué clase de usuario esta autenticado
 * 
 * 
 * 
 * 
 * PASSPORT
 * Es un middleware de autenticación de NODEJS
 * Únicamente tiene una función: AUTENTICAR SOLICITUDES
 * 
 * Serializa y deserializa usuarios, es decir que elige
 * 1) qué se guarda en la session
 * 2) cómo se reconstruye
 * 
 * Sus mecanismos se empaquetan de manera modular. Fácil de Mantener y escalable.
 * Manipula distintos tipos de mecanismo de autenticación.
 * Por lo que el desarrollador puede elegir la estrategia más conveniente en su proyecto.
 * Cada mecanismo tiene un módulo:
 * passaport-local
 * passaport.openid
 * passaport-oauth
 * (hay muchas más)
 * 
 * BCRYPT:
 * ////////////NUNCA GUARDAR LOS PASSWORD EN LA BASE DE DATOS//////////////////////// 
 * PORQUE CUALQUIER PERSONA QUE TENGA ACCESO A LA BASE DE DATOS PUEDE USAR LOS DATOS DE LOS USUARIOS Y ACTUAR POR ELLOS
 * 
 * 
 */