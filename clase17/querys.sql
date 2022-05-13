create table productos(
    id INT PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT

);

select * from productos;

insert into productos (nombre, descripcion) values ("Ariel" , "Argentino");
insert into productos (nombre, descripcion) values ("Dario" , "Chileno");
insert into productos (nombre, descripcion) values ("Camilo" , "Colombiano");

update productos set nombre = "Camilo" where nombre = "Ariel";

delete from productos where id="1";

truncate productos;