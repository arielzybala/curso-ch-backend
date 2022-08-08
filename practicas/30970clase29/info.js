/**
 * CLUSTER -----
 * 
 * CLUSTER ES UN MODULO DE NODEJS
 * 
 * Node es singlethread, con: "exe, exeFile, spawn y fork", obtenemos simultaneidad-concurrencia, pero se puede lograr un paralelismo de trabajo en diferentes nucleos de CPU. POR ESO NODE TIENE EL MODULO CLUSTER, para llegar a trabajar distintos flujos de trabajo con los nucles del procesador (se ve en los process ID). 
 * 
 * CON CLUSTER CLONAMOS WORKER'S
 * Tenemos uno maestro y otros esclavos(son copias del principal) del principal
 * 
 * 
 * Como es un modulo y es de node tiene un require('cluster')
 * 
 * 
 * 
 * EL COMANDO PARA MATAR PROCESOS DESDE BASH
 * TASKKILL //PID:**** //F
 * 
 * 
 * 
 * 
 * /////////////////////MODULO FOREVER
 * 
 * INTALAR CON -g PARA QUE SEA GLOBAL, ES LO RECOMENDADO
 * 
 * 
 * FOREVER NOS PERMITE:
 * 1) Seguir mandando comandos en la CLI después de iniciar la API.
 * 2) Hacer que la API, crasheada se reinicie.
 * 
 * NODEMON VS FOREVER
 * Nodemon es para usar en desarrollo
 * Forever se usa tanto en desarrollo como en producción //sirve para reiniciar el server en caso de fallo
 * 
 * 
 * Comandos de forever
 * forever start <filename>
 * forever list: lista todos los procesos
 * forever stop <PID>: te corta un proceso por su id
 * forever stopall: detiene todos los procesos
 * forever --help: muestra ayudas y otros comandos
 *  
 * COMANDOS PARA VER QUE TCP ESTA USANDO Y CUALES SON LOS PROCESOS ETC:
 * 
 * wmic process get name, processId, parentProcessId
 * netstat -nao | findstr TCP
 * 
 * UNA LIBRERIA PARA VER CADA UNO DE LOS PROCESOS EXCLUSIVAMENTE DE NODE
 * npm install find-process -g
 * comando: find-process node
 * comando: find-process -p 8080 node
 * comando: find-process -t port 8080
 * comando: find-process -t pid 1234
 * 
 * 
 * //////////////PM2
 * 
 * npm install pm2 -g
 * 
 * 
 * Product Process Manager (es una libreria que ayuda como nodemon y forever a manejar los procesos)
 * 
 * Manejador productor de procesos: un programa que controla la ejecución de otro proceso
 * PM2 simplifica las aplicaciones de Node para ejecutarlas como cluster
 * 
 * 
 * PRO:
 * Se puede desarrollar la app, sin pensar cómo usar los cluster, y dejar a PM2 que se encargue de crear un número dado de worker processes para ejecutar la aplicación. (ventaja sobre forever) 
 * Con recursos reducidos, gestiona una gran cantidad de trafico
 * Permite monitorizar las api's de manera remota
 * 
 * para iniciar en modo fork (CON MODO FORK ES COMO CON FOREVER LO ABRIS EN PARALELO)
 * pm2 start app.js --name="Server1" --namespace="value" --watch -- 8081
 * pm2 start app.js --name="Server2" --watch -- 8082
 *  
 * para iniciar en modo cluster (CON ESTE MODO ABRIS UN PROCESO Y LOS INSTANCIA EN TANTOS CLUSTER PUEDA) 
 * pm2 start app.js --name="Server3" --watch -i -max -- 8082
 * EN VEZ DE MAX ELEGIS UNA CANTIDAD DE CPUS QUE DESEAS USAR
 * 
 * 
 * 
 * 
 * COMANDOS PM2
 * 
 * DETENER EL PROCESO
 * pm2 stop 
 * 
 * REINICIAR EL PROCESO
 * pm2 restart
 * 
 * ELIMINAR EL PROCESO
 * pm2 delete
 * 
 * Estos 3 se completan con:
 * app_name = Es el name que le ponemos cuando hacemos pm2 start app.js **--name="Server1"
 * namespace = es si la aplicación cuando la iniciaste, le pusiste el flag --namespace con un prefijo en particular. Sino dice default
 * id = es una numeración que pone pm2 a los procesos activos
 * all = efectua esa tarea con todos
 * json_conf = es el espacio para poner una ruta/nombre de un json que indica que procesos elegir
 * 
 * 
 * DESCRIPCIÓN
 * pm2 describe
 * por: id o app_name
 * 
 * MONITOREA
 * pm2 monit
 * (es para logs metricas e información)
 * 
 * LOGS
 * pm2 logs
 * muestra los console log
 * 
 * FLUSH DE LOGS
 * pm2 flush
 * Un flush es borrar el cache de los logs los deja en 0
 * 
 * 
 * HELP
 * pm2 --help
 * 
 */