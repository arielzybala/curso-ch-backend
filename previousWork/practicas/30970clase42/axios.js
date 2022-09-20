const { AccountInstance } = require('twilio/lib/rest/api/v2010/account');

const axios = require('axios').default;

const obtenerData = async ()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/post')
    console.log(status)
} 

obtenerData()
.then(()=>{
    console.log('req finalizado')
}).catch((error)=> console.log(error))