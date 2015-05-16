"use strict";
var connectdb = require('./includes/database');
var news_model = require('./includes/news_model.js');
var express = require('express');
var path = require('path');
var app = express();
var mongodb;

// This is for serving files like css and js files
// more to the point when url is pointed to 
// http://localhost:3000/somefile.ext
app.use(
  express.static(__dirname + '/www', {
    etag: false,
    lastModified: false
  })
);

app.get('/', function(req, res){
  //TODO: This is could get ugly and turn into callback hell
  // so writing a small minimal version of promise defer

  news_model.getCount(mongodb, function(count) {
    // Express documentation sucks so it doesn't mention that
    // sendFile doesn't work with the static module
    res.sendFile( path.join(__dirname, '/www/home.html') );
  });
});

connectdb(function(db){
    var server = app.listen(3000, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;
    mongodb = db;
    console.log("Server is listening at http://%s:%s", host, port);
  });
});
