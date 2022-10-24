💫💫💫 *Bienvenido al Repositorio del Proyecto HARDWAREBULLS* 💫💫💫
Autor: Ariel Gustavo Zybala

Información a tener en cuenta para la evaluación:


Archivo: Consigna Proyecto Final Curso Back End----👉RESPUESTA DE INTERPRETACIÓN👈

I) Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.

🧭Respuesta: Se entiende que pide un grupo de rutas CRUD para Carrito y para Productos

II) Se implementará una API RESTfull con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.

🧭Respuesta: Se entiende que requiere punto lo solicitado en punto (I) y sistema de persistencia.

III) Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token).

🧭Respuesta: Se entiende que el ingreso o la creación de usuario deben a su vez crear de manera temporal un Token, que por un tiempo limitado permitan al usuario realizar acciones en las rutas de la API. Se usará como medio de transporte la cookie.

IV) Los productos ingresados se almacenarán en una base de datos MongoDB.

🧭Respuesta: Se interpreta, por visión integral de todas las pautas de la PPT y del Documento de pautas, que el DAO y el DTO, deben tener al menos MongoDB como sistema de persistencia. Se interpreta MongoDB en su forma DBaaS

V) El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.

🧭Respuesta: Se interpreta usar Passport

VI) El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.

🧭Respuesta: Se interpreta, por visión integral de todas las pautas de la PPT y del Documento de pautas, que se debe fijar una configuración de Session y Session Storage a modo "disponible" dentro del código, pero sin un fin específico, puesto que el fin conocido en el curso para las Session's ya se cubre con lo requerido en JWT y las cookies.

VII) Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.

🧭Respuesta: Se interpreta el uso de Socket.io

VIII) La arquitectura del servidor estará basada en capas (MVC)

🧭Respuesta: Ya predispuesto en el texto de la PPT, se interpreta necesario construir el código con el PATRÓN: Model, View, Controller 

IX) El servidor podrá tomar configuraciones desde un archivo externo.

🧭Respuesta: Ya predispuesto en el texto de la PPT, se interpreta uso de DotEnv

X) Dispondrá de una vista creada con pug, que permita ver la configuración del servidor.

🧭Respuesta: Se interpreta, por visión integral de todas las pautas de la PPT y del Documento de pautas, uso de un template engine y creación de una ruta para un admin que permita ver: ArgumetosEntrada, NombrePlataforma, VersionNodeJS, MemoriaTotalReservada, PathEjecucion, ProcessID, CarpetaProyecto y NumeroDeCPUS.

XI) Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.

🧭Respuesta: Se interpreta uso de Nodemailer. La casilla de correo en modo desarrollo debe ser ingresada por consola momento de iniciar la app, en modo producción será una casilla previamente creada por el desarrollador y serán entregadas dirección y password al docente para la evaluación.

XII) En caso de detectar algún error, el servidor enviará una vista implementada con ejs, que contenga el id y el detalle completo.

🧭Respuesta: Se interpreta uso de un logger (en mi caso winston), la vista será de acceso para el user Admin.

XIII) Dos opciones para el frontend: desarrollo por parte del estudiante, ó se proporcionará uno para hacer las pruebas necesarias.

🧭Respuesta: Se interpreta que debe ser creada por el desarrollador.

/////////////////
Requisitos base:

A) Inicio: Al momento de requerir la ruta base ‘/’

I) Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.
II) El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.
III) Si un usuario se loguea exitosamente o está en sesión activa, la ruta ‘/’ hará una re dirección a la ruta del carrito /productos
IV) La ruta "/productos" devolverá el listado de todos los productos disponibles para la compra.
V) La ruta "/productos/:categoria" devolverá los productos por la categoría requerida.
VI) Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta "/carrito".
VII) Se podrán modificar y borrar por su id a través de la ruta "/carrito:id".

B) Flow:

I) Se puede solicitar un producto específico con la ruta /productos/:id, donde id es el id del item generado por MongoDB y devolver la descripción del producto ( foto, precio, selector de cantidad).


C) Si se ingresa a /productos/:id y el producto no existe en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.

1) Contener rutas que permitan:

C)Ingresar un nuevo producto. Método Post
R)Listar Productos de la base de datos. Método Get
U)Modificar un producto. Método Put
D)Borrar un producto. Método Delete

ESTRUCTURA-SCHEMA DE UN PRODUCTO:
Nombre del producto
Precio Unitario
Descripción
Categoría
Link para foto: Puede almacenar de manera Static. 🦾MULTER



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

Archivo: Clase48-Manejo de dependencias con Deno.ppt

1) Debe tener patrón de diseño MVC. 
1.A) En la capa de persistencia con los DAOs/DTOs: debe soportar el o los sistemas de persistencia elegidos. En caso de ser más de uno, utilizar una factory.

2) El servidor debe disponer de configuraciones mediante variables de entorno con dos ambientes: Desarrollo y Producción.
2.A) Las variables configurables son Puerto, la Persistencia Elegida, "String de Conexión a la base de datos", API KEYS.
2.B) En la configuración desarrollo usar base de datos y servidores locales.
¿A qué se refiere con "String de Conexión a la base de datos"? 

3) Subir el desarrollo completo a Heroku o algún PASS de preferencia, en modo "Producción" de tal forma que se pueda utilizar los parámetros adecuados de funcionamiento y la persistencia en la nube a través de bases de datos como servicio (DBaaS).

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



* (#) previousWork(carpeta dedicada a almacenar practicas de clase y desafíos anteriores)