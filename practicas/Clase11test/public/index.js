const socket = io(); //con esta constante traemos el metodo desde el script previo que esta en el html

socket.on('messageBack', (data)=>{
    console.log(data);
    socket.emit("messageFront", "Front");
});
//socket.on es el metodo que va a leer los mensajes del canal y data es la información del backend
//con esto volvemos a comunicarnos dentro del canal, esta vez desde el front para el back. Con un nuevo primer parametro, que le va a servir al back para recibir los mensajes desde el front