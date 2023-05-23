import mongoose from "mongoose"

// @TODO: Extrair pro enviroments 
mongoose.connect("mongodb://tccurbstads.com:27017/urbs", {
    auth: {
        password: "!@MongoConta",
        username: "contaMongo"
    },
    authSource: 'admin',
});

let db = mongoose.connection;

export default db;