const socket = io();
socket.on("message", (data)=>{
    console.log(data);
    
    socket.emit("menssage_client", "Gracias")
})
const render = (data) => {
    let html = data
    .map((x)=>{
        return `
        <p>${x.nmb} ${x.msn}</p>
        `
    })
    .join(" ");
    document.querySelector("#caja").innerHTML = html;
}

const addInfo = () =>{
    let dataObj = {
        nombre: document.querySelector("#").value
    }
}