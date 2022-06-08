module.exports.booleanVar = (req, res, next) => {
    let admin = true;
    let methodHttp = req.method;
    let route = req.path;
    admin 
    ? next()
    : res.json({error: 401, description: route, metodo: methodHttp, autorizado: admin})
}