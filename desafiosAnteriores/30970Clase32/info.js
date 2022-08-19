/*
TEST DE CARGA A SERVIDORES MANUALES
La prueba de carga es un subconjunto de la prueba de rendimiento, donde probamos la respuesta del sistema bajo diferentes condiciones de carga simulando que varios usuarios acceden a la aplicación al mismo tiempo. Esta prueba suele medir la velocidad y la capacidad de la aplicación.
*/

/*
ARTILLERY (Sólo se puede usar en backend, no en el front)

Es una dependencia de node, para realizar test de carga a servidores.
Cuenta con herramientas para enviar cargas elevadas de trabajo a aplicaciones escalables

Maneja dos tipos de pruebas de rendimiento:
Pruebas de carga: es para estresar al sistema.
Pruebas Funcionales Continuas: es para verificar que funciona del modo esperado. 

Cómo instalar
npm install -g artillery

Configurar
const express = require('express')
const cluster = require('cluster')
const {cpus} = require('os')

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv3 == 'CLUSTER'




En mean response/sec (tiempo de la mediana)
Los tiempos de respuesta en cluster bajan y en fork suben
*/

/*
PROFILING
Es el análisis de rendimiento:
El objetivo es averiguar el tiempo dedicado a la ejecución de diferentes partes del programa.
Puede mostrar la traza de ejecución o un resumen estadístico de los eventos observados.


node --prof index.js
node --prof-process

node --prof-process archivo.log > resultado_Archivo.log


TICKS: Cuantos funciones dentro de los ticks. 
JavaScript: Cómo es la repartición de tiempo por cada pieza de codigo utilizada.
GC: cuantas llamadas al garbage colector
Shared Libraries: cuantas a share libraries - que son de acceso a sistema
C++: cantidad de llamadas al sistema por debajo, suele aumentar cuando tenemos que imprimir algo por pantalla

*/




/*
AUTOCANON
Es una dependencia de node, nos ayuda a realizar un test de carga, cuya evaluación en comparativa http /1.1.

0X
Es una dependencia de node, que perfila y genera gráficos de flama interactivos para un proceso Node en un solo comando.

----> Los test son por código y no por consola(como con artillery)


Autocanon se instala como dependecia de proyecto.
npm i autocannon --save
0X lo instalamos de forma global
npm i -g 0x


Test
consola git bash 1

npm run start


en postman
http://localhost:8080/newUser?username=dani&password=qwerty123


consola git bash 2

npm run test

*/