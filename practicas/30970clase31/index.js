const compression = require('compression')
const express = require('express')
 
const app = express()
app.use(compression())
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
   
    // send a ping approx every 2 seconds
    const timer = setInterval(() => {
      res.write('data: ping\n\n')
   
      // !!! this is the important part
      res.flush()
    }, 2000)
   
    res.on('close', () => {
      clearInterval(timer)
    })
  })




  
app.listen(8080, (err) => {
    !err ? console.log(8080) : console.log("error server not run " + err);
  });