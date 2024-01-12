const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/movie");

const db = mongoose.connection;

db.on("connected",(err)=>{
    if(err){
        console.log(`DB is not connected`);
        return false;
    }
    console.log(`DB is not connected`);

});

module.exports=db;