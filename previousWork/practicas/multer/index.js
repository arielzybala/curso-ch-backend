const express = require('express');
const app = express();
const multer  = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination : function(req, file, cb){
    if(!fs.existsSync(__dirname + '/public/temp')){
      fs.mkdirSync(__dirname + 'public/temp')
    }
    cb(null, './public/temp')
  },
  filename: function(req, file, cb){

    cb(null, file.filename + '-' + Date.now()+ '.' + file.mimetype.split('/')[1]);
  }
})

const upload = multer({storage})

app.get('/upload', upload.single('file') , async(req, res)=>{
  console.log('Files=====>' , req.file)
  res.json({status: 'ok' , data : req.file})
})

app.post()

app.listen(PORT, () => {
    console.log(`Server run on ${PORT}`);
});