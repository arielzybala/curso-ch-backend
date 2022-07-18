/**
 * Conceptos de persistencia de una SESSION en memoria
 
 * 
 * 1) MEMORYSTORE: es lo que se hizo en la primera clase de cookies
 * Es una carga que cuando se reinicia el servidor, se pierde la información
 * 
 * 2) FILESTORE:
 * Escribe archivos que almacenan datos de la session.
 * Se accede por el id de la session
 * duran lo que indicamos por el ciclo de vida {maxAge:}
 * persisten a los reinicios de servidor.
 * TIENE DIFICULTADES PARA ESCALAR.
 * 
 * 3) REDIS
 * Trabaja en memoria, pero con persistencia de datos en archivos.
 * Tiene X keys, que busca como se busca en un diccionario, para traer un valor determinado
 * Actua como un map o diccionario:
 * se puede usar de base de datos,
 * se puede usar como caché
 * se puede usar como broker de mensajes
 * 
 * 
 * DEFINICIÓN: motor en memoria que mediante una key permite guardar valores
 * la estructura de datos que permite es amplia:
 * strings
 * listas
 * hashes
 * set
 * y más
 * 
 * PERSISTENCIA
 * En memory del server y guarda en files, copias de seguridad ""puntuales"".
 * 
 * ES FIABLE Y ESTABLE
 * GCP y AWS tiene o usan REDIS
 * 
 * set
 * COMMAND KEYS
 * Son binarias y seguras
 * 
 * 
 * 
 * 4) MONGO ATLAS - MONGO
 * Para arrancar hay que instalar el paquete para instalar es connect-mongo
 * Es un tipo de STORE, que permite almacenar los datos de las Session en la base de datos de MONGODB
 * 
 * 
 * 
 * 
 */

