const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Cors = require('cors')
const app= express();
const methodOverride = require('method-override');

//                                                     using middlewares                  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(Cors({
    origin: "*",
 }));
app.use(methodOverride('_method'))
app.use('/uploads',express.static('uploads'))
//                        connection to databse 
const url ="mongodb+srv://shivamBlog:myblogapp@cluster0.fdbty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url)
.then(()=>{
    console.log('MOngoDb connected')
}) 
.catch(()=>{
    console.log('Connection failed to mongoDb');
    process.exit(1);
})



//                        creating strage engine


//                                                   IMPORTING ROUTES
app.use('/user',require('./Routes/Users')) ;
app.use('/blogs',require('./Routes/Blogs'));




app.listen(2000,()=>console.log('active on port 2000'))


