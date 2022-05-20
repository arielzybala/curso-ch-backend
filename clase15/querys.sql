/*



COMANDO INGRESO A LA BASE DE DATOS SQL, configurando el host, puerto y ruta
mysql -h 127.0.0.1 -P 3306 -u root -p

COMANDO PARA SALIR
exit


SENTENCIAS

CON ESTE COMANDO VEMOS TODAS LAS BASES DE DATOS
show databases;

CON ESTE COMANDO CREAMOS UNA TABLA
create database %nombre de la base de datos%;

CON ESTE COMANDO SE BORRA UNA BASE DE DATOS
drop database %nombre de la base de datos%;

INGRESAR A UNA TABLA
use %nombre de la base de datos%;



*/


/*COMANDO PARA CREAR UNA TABLA*/
create table productos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre TEXT,
    descripcion TEXT
);


/*COMANDO PARA VER CONTENIDO DE UNA TABLA*/
select * from productos;


/*COMANDO PARA AGREGAR UN DATO*/
insert into productos (nombre, descripcion) values ("Ariel" , "Argentino");
insert into productos (nombre, descripcion) values ("Dario" , "Chileno");
insert into productos (nombre, descripcion) values ("Camilo" , "Colombiano");

/*COMANDO PARA ACTUALIZAR UN DATO*/
update productos set nombre = "Camilo" where nombre = "Ariel";

/*COMANDO PARA BORRAR UN DATO*/
delete from productos where id="1";

/*COMANDO PARA BORRAR TODOS LOS DATOS DE LA TABLA*/
truncate productos;


/*////////////////////SQLITE3//////////////////////////*/
