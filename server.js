"use strict";
var express = require('express');
var app = express();

app.use(express.static('www'));

var MongoDB = require('mongodb').MongoClient,
    assert  = require('assert');

var url = "mongodb://localhost:27017/paginate";
MongoDB.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to database");
  
});

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
