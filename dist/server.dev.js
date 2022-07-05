"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Cors = require('cors');

var app = express();

var methodOverride = require('method-override'); //                                                     using middlewares                  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(Cors({
  origin: "*"
}));
app.use(methodOverride('_method'));
app.use('/uploads', express["static"]('uploads')); //                        connection to databse 

var url = "mongodb+srv://shivamBlog:myblogapp@cluster0.fdbty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url).then(function () {
  console.log('MOngoDb connected');
})["catch"](function () {
  console.log('Connection failed to mongoDb');
  process.exit(1);
}); //                        creating strage engine
//                                                   IMPORTING ROUTES

app.use('/user', require('./Routes/Users'));
app.use('/blogs', require('./Routes/Blogs'));
app.listen(2000, function () {
  return console.log('active on port 2000');
});