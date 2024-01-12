const express = require('express');
const db = require('./config/db');

const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.use('/',require('./routes/movieroutes'));

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/pages',express.static("pages"))


app.listen(port, (err)=>{
    if(err){
        console.log(`Server is not connected`);
        return false;
    }
    console.log(`Server is connected on : ${port}`);
})