module.exports.booleanVar = (req, res, next) => {
    let administrador = true;
    let metodoHttp = req.method;
    let ruta = req.path;
    administrador 
    ? next()
    : res.json({error: 401, descripción: ruta, metodo: metodoHttp, autorizado: administrador})
}

