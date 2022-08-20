/**
 // SERVIDOR PROXY
 * 
 * Servidor intermediario entre las conexiones de cliente y servidor
 * 
 * función:
 * Filtrado de todos los paquetes entre ambos
 * Oculta las IP's de los clientes y de los usuarios. Evita conexiones directas.
 * Como intermediario ofrece servicios como:
 *          Control de acceso
 *          Registro de Tráfico
 *          Mejora rendimiento - cacheando recursos
 * 
 * DOS TIPOS DE SERV PROXY
 * 
// SERVIDOR PROXY DIRECTO FORWARD
 * 
 * Recibe la petición DE UN CLIENTE y la lleva al servidor
 *
 * La petición creada por el cliente es anónima, porque el IP lo tiene el servidor intermediario, no el server que recibe la petición desde el servidor intermediario
 * Es útil para mejorar la privacidad, y para evitar restricciones como las de contenido geográfico 
 * 
// SERVIDOR PROXY REVERSO 
 * 
 * UN SERVIDOR INTERPONE A OTRO SERVIDOR, para que administre las peticiones recibidas y las devoluciones de las solicitudes.
 * El servidor intermediario: 
 *                  Normalmente lleva la cuestas el cifrado SSL
 *                  Distribuye o balancea las cargas de trabajo entre los cluster declarados
 * 
 * 
 * 
 * AMBOS TIPOS DE SERVIDORES EN SU TRABAJO, CADA UNO A LO SUYO, NO SE SUPERPONEN NUNCA
 * 
 * 
 * 
 * MOTIVOS PARA APLICAR UN SERV REVERSO
 * 
 * 1) Balance de carga: Principal uso - puede distribuir el tráfico a otros servidores(a los cluster) sin afectar la funcionalidad del sitio
 * 
 * 2) Seguridad mejorada: La dirección IP del servidor principal esta oculta, la tiene el intermediario. Y ningún paquete de peticiones va directo al server, sino que el intermediario los recibe.
 * 
 * 3) Potente Caching: El servidor intermediario puede almacenar contenido estatico(multimedia, videos, imagenes, etc)/dinamico (js de front), que ocupa ancho de banda, para que la petición que llega al servidor principal sea meramente funcional
 * 
 * 4) Compresión: Es ideal para comprimir respuestas del servidor antes de enviarlas al cliente
 * 
 * 5) Cifrado SSL: Se puede usar al intermediario para las operaciones que son de cifrardo y descifardo de solicitudes SSL/TLS, dejando que el servidor principal se encargue sólo de servir contenido.
 * 
 * 6) Monitoreo y Registro de Tráfico: El intemediario, captura las peticiones y puede analizarlas. Facilitando la supervisación de los datos entrantes y salientes. 
 * 
 * 
 * 
 * //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * 
 * 
 * 
 * 
 * NGINX
 * 
 * Es un servior web.
 * Orientado a EVENTOS
 * 
 * Nos permite redireccionar el tráfico entrante en función del dominio de dónde vienen.
 * La redirección se elige entre procesos y puertos previamente creados
 * 
 * El servidor proxy escucha por un X puerto y luego nuestra app, puede esta configurada escuchando en otro 
 * ej: S.proxy escucha peticiones en puerto 80, la app en el servidor en el puerto 3000, entre el cliente y el S.proxy su comunicación es por puerto 80, pero entre server Principal y proxy es puerto 3000
 * 
 * Desde la CDM se puede listar y ver los procesos de NGINX;
 * tasklist /fi "imagename eq nginx.exe"
 * tasklist //fi "imagename eq nginx.exe" (EN BASH)
 * 
 * Los COMANDOS para trabajar con nginx es:
 * ./nginx.exe -s stop: para un apagado rápido
 * ./nginx.exe -s quit: para un cierre más elegante
 * ./nginx.exe -s reload: para reiniciar el servidor
 * ./nginx.exe -s reopen: para reabrir logs de archivos.
 * 
 * 
 * 
 * Configuración
 * 
 * http
 * 
 * 
 * UPSTREAM
 * En upstream declaramos el nombre de los nodos con los que trabajamos => node_app{}
 * cuando indicamos dentro de él, el termino server: Ahí lo que estamos diciendo es qué cantidad de culster(primario o worker, ponemos a disposición)
 * weight viene por default en 1, cuando ponemos un weight=N, le estamos diciendo "SON N CANTIDAD DE REQUEST QUE VA A SOPORTAR CADA CLUSTER". Si el primero queda en default 1, y el otro en 3, el segundo tiene el 75% del trabajo.
 * 
 * SERVER
 * Para configurar el servidor nginx ponemos: server{}
 *
 * Dentro de server habrá una 
 * listen => que es el puerto donde opera el nginx.
 * server_name => que es el nombre del server nginx.
 * root=> es donde el server proxy va a ir a buscar los archivos estaticos y dinamicos que hayamos seleccionado
 * 
 * SERVER{LOCATION}
 * location /datos/ { } => es un objeto que va a indicar donde estará el proxy_pass
 * proxy_pass: según qué url se peticiona/qué request genera el cliente (ej: /datos /info /productos), aqui se indica a que UPSTREAM hacer llegar el pedido. // Cada upstream tiene una funcion y tiene un nodo de trabajo para cada request
 * 
 */