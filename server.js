"use strict";
var express = require('express');
var app = express();
var MongoDB = require('./includes/database');

app.use(express.static('www'));

// Sample GET
app.get('/', function(req, res){
  // Sample QUERY STR
  var sample_qval = req.query.sample || null;

  res.status(200).send("OK");
});

var server = app.listen(3000, 'localhost', function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server is listening at http://%s:%s", host, port);
});
