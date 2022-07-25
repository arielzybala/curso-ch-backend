const mongoDB = {
    urlToDataBase: 'mongodb://localhost:27017/chatcoderagz',
    options: {
        keepAlive: true,
        autoIndex: false,
        maxPoolSize: 1000,
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }
}

const mongoAtlas = {
    uri: 'mongodb+srv://ariel:Tita@agzch.gs9x3.mongodb.net/?retryWrites=true&w=majority',
    advancedOptions : {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    secret: 'valorSecreto'
}

const firebaseURL = "http://chatcoderagz.firebaseio.com";
const firebaseDB = {
    "type": "service_account",
    "project_id": "chatcoderagz",
    "private_key_id": "9e7c3bf27c43ed0f6fe496b02d7cf5fcc9a9c922",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCck1NWV6b9S/Wl\nQzpAuHcd0ojD9aODOrsKmDosDqq2fdK4HgsWh5u2p3kMaCJxk0sJBU7khCYFSHLM\nyBSo2GMVt7zjEzCZzu3iKhyu4eIwRd+9nFuwJd7kB7pvYswTQpuNu9+cz3TwWJif\nLnqPjrkVxjFwHzAfDWrRtczIWezuec5WxSPMVBP6dlRjDsn7Uba1ow+sH4tRlpLg\nacpbRBHUMelgEwqtNkH14rIvpQNW4ScgNT9Ahq94dvovz20nOs1j4sr8QR270Vov\n5uO29WvMlZijD1n5kIqYP0xel2JqD/sSQMThcseB2mxmydbEdSZC6575CcDMReaj\n0BbesjMtAgMBAAECggEADGzZjm7Gwu+R9xMqboPk+gIg1dIqr2mL+ceCSEhCrlg2\nTmOd9CP/TKOmJMCnyRUL/ZOFAvfkr4MkDxGqqAqB9HGABRIbB32nHY1DePJWeYe1\n/W1IzmX29egSGLBBqx6cSwdXc7F34XHabLlqwvUrxWlUt4XWEwTEzw8LCPQv6+2x\nTwHxfa4GqN6HASGruFH/85BeOhTLlLF9WGdt7QkGNkMtF5AyrJa0esl8Mk38b2aF\nK0xD7RqqBYCLpXEL2InGLZN/sZ2lPXgbE2dkVEWcQkcCPFCDb4whYPfY+LjnxOgs\n4GZHmtqiHPSLtKnTcjpqg6gIeiF8VDZIHzavn3RfQQKBgQDQ3HGsyhDypYxiHiIa\nDxqaiaSHHcrgfqFe2VFCcNX/Fdt4n/j6x57CpxAzhDMJTUgK1OV2iJa+qa1zII7R\n27tKj9+hslQE51YaF5iMl1DH1oQGrX5iMkWy8ZvzCrl5efI1tzBHUrUtiYyDJ00s\n3L+blVVpYmRIQBgWJUeAMX5zQQKBgQC/6e2lUn74L5SvVFwf5QrbXaIHH/U28JZG\nAwvECCnclVcAWUJgfIrIK+/LxtEgZo8mz/kBBkW060KDFd0MxqMzKsKnFiaY6qoP\nU3ychVrBFSC+IkYS9ZJX6SDMZZTDkvm8z82O8HNALn3lco4SOD7wCdE40R0WHXgv\n8G8sL8GA7QKBgQDDjkPZFvE7YAnLLI+deprcKxgjcp+sBqStHCjbXq7fQeXWUWJb\n3GAnvSiMM7FdekCD88ZNb6JFLrW6X7eZgnUgYQlwanoEhV223HT23g7CrXW8kuEM\nrClaXKI5s8bpmGZSKQ1JGoWM94bangfCg4Xb9LyeCYP/qhNjWNBTlQPigQKBgQCw\nwnr5zDPZz6k4m5CGZ+VKCsGTomGuioU+UsvhcEtuObZ6QbwbNlp059Ljc2lmWE/9\nRYxo3ygQ7KbEKb0BaWsjU30ZfBNswKaFmzWozEK8mAMiXFsCV2DEy5pD6EPOpm6S\n8yq3PsxIDwox7QLh0SBW4hPsKt6JYfcy4Fbk8c9eOQKBgAkgRGZ1vCvGgAQAL+iD\nL5yG3jEda8afiTLioaf7U/USrNnAxs+4ZHO0WJV6z8pBHQbOLkhnggrYSwjaY42p\nZAKOoO/gGuYPDy0S8+kb6+v6vM+m6S8RhVcVP14E7ZXbdYeX98badQub1OkR+12K\n3jGq7kEBkK91q2EhZcnZmWyB\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-9r4r0@chatcoderagz.iam.gserviceaccount.com",
    "client_id": "100560763856650454069",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9r4r0%40chatcoderagz.iam.gserviceaccount.com"
  }


const fileSystemDB = {
    path: "./src/db/fs/"
}



module.exports = {mongoDB, firebaseDB, firebaseURL, fileSystemDB, mongoAtlas}