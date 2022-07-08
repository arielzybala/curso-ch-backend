const mongoDB = {
    urlToDataBase: 'mongodb://localhost:27017/ecommerce',
    options: {
        keepAlive: true,
        autoIndex: false,
        maxPoolSize: 1000,
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }
}
const firebaseURL = "http://ecommerce-agz.firebaseio.com";
const firebaseDB = {
        "type": "service_account",
        "project_id": "ecommerce-agz",
        "private_key_id": "9e883a6fa829b632e1e903162349b47fa3392ec6",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVrRa7uOZExIsy\nq5YCcwNaakrcW9D8Cyl57N4KTS6KRKyOMnGfHywTKusBBX1yBQwxWektsPwdufUG\n15zhLZ8fOmZ6yNfNaJ0cTcWZM+ODWWiqkq2ejSI0ZWNcgHfs+9DYqmWz/uxZdadt\nuH/rwGyYSWFTRSvuH2fNq6EtEOa/7/DGp0eGUsACWyQw+ERZziwgWGguPSGqQaPo\nUS09DXJ/kbFm8mGH9MHwRXNmfqC6ISqIqkfiGfOOSWhnNVA+NeDX3Ou+ClC5xTZe\nkSt+ZvsKZ27/MLgctp+n2WUtYjT5kx844lmB5B9BBPNMulZjETioK7BK6cUg5fdS\nnwAYak21AgMBAAECggEAE2o5Wa5ZSDBKcg8pzTWICNFi1oSebiMwhR1BjAqI7+yK\niYNnk6FigTX+98nzhLe85iXohkG/4kc9zl5nfhoB2vYjVuf4fi+Euago6n99kosl\ndYLDPJ7IAg3ovpX3eGkNpR0tRhTaKZyGVEgrZ7Q1Iefa1QdS9HdkapxJsuPPWrQd\nN4tlWg33CWrI6kXSxild+DFuv0urSXazrS4VAR/VJFDuGHa0DUoJCCz4+WCCkBn7\nS8xttZ/XLXs3QMcuiZvCPW4+UCiol0Xd/aYW8eBMvk3CifnSo+/9a7Fx8yfsnpde\nD2bC5fC/gtQIPzpz+dWyhKf5xZ3LKNjgoJyOWAnHPQKBgQDHjYT0N5J2SsL2u37S\n3Ike61gyXhIPWt6Bn3ptfSXpTqL2oioWc/EdfBbEwGJBxj1QlNn/i5BDbNWNlzbw\nLT1P3RVJ8XKimuy3ylSQEGQ01OU4DQg7vGh9MmmqW3RvcY49aKkcix4ohUemNy2Q\nHqqL/y/gE+ZNE8kiHQp+MCJYZwKBgQDAA8iWqMhiymvPOukLdpSEzarO85maVN5L\n4Ctk61V5d5P7vjk8WkSPCU6orP4MPa7tzeDMxz0GAaPlDSwjojPOKm+WCuZBYWoH\nKT0pVBNCFIx1SkLY5Nk4irstJSsAFnWMqFuekp/bGfM7s1OkUebrd6wHNy1dSmTK\nkHV9w4nHgwKBgAUHuDY/wF1i/Q8jIstF697vp8V9QY9JhxpVXsyrvuzmooz9AXqX\naZiIrDpBbzihOqJxXh1m8zf/4lIzYZskSMtek07N20nmBdmMLB2FjEEYrL6A9Zgr\n46ZkQu2caI72mdNKdBjYGOaElY3HDkr3uuzUfex0E/YVbZiCiuUraXI5AoGAeIRn\nbBh33XnLfQAusWE2CrzDzq0a5cEK3XjQA8Gpnlmtaj6U0gqeKWDgHAKoWaqFlwC3\nbhBHfvOcmPFRmPP/rBD6hKRGrRalY+VAXCZHCBy5pAx+NIA+zrxUixtfB+kQ0r4A\n82B4MR7yibAeeW5mj7hHIyhAsuM0q+dLtyn52l0CgYA/XC5d0rMaH5ysKhuG3Z/L\nFQodaGs5txE7wixUn6IXdTEcGLV9Y6d+Pbug5P433asXWORCXxaJBwzIGhIfwym6\n1O1rO3ONiCy0gAGgfiUjsX4gAQ5ywjaG12/fSrod8cXwDy+yNcKTj8uGVaDzcptr\ngIMTV9U09Fgf3bVtoX04ug==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-oxvhq@ecommerce-agz.iam.gserviceaccount.com",
        "client_id": "105463648517203539485",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oxvhq%40ecommerce-agz.iam.gserviceaccount.com"  
}


const fileSystemDB = {
    path: "./src/db/fs/"
}



module.exports = {mongoDB, firebaseDB, firebaseURL, fileSystemDB}