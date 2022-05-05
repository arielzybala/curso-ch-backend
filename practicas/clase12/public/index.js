const socket = io(); //con esta constante traemos el metodo desde el script previo que esta en el html

socket.on('messageBack', (data)=>{
    console.log(data);
    socket.emit("messageFront", "Front");
    render(data)
});

const render = (data)=>{
    let html = data.map(x =>{
        return `
        <p>${x.nb} ${x.msn} </p>
        `
    }).join(" ")
    document.querySelector("#box").innerHTML = html
}

const addInfo = () =>{
    let dataObj = {
        nb: document.querySelector("#nb").value,
        msn: document.querySelector("#msn").value
    }
    document.querySelector("#msn").value = ""
    socket.emit("dataMsn", dataObj);
    return false
}