const admin = require("firebase-admin")
const serviceAccount = require("./db/azbackend-firebase-adminsdk-83awg-98cdccd3e1.json")

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"http://azbackend-default-rtdb.firebaseio.com"
})

const db = admin.firestore()
const query = db.collection("users")

    const saveUser = async () =>{
        let doc = query.doc(`${Math.random()}`)
        await doc.create({name: "Ariel", age:"35"})
    }
