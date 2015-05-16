var MongoDB = require('mongodb').MongoClient,
    assert  = assert || require('assert'),
    config = require('./config.js'),
    connection = null;

module.exports = function(callback) {
  if( connection == null ) {
    MongoDB.connect(config.mongo, function(err, db) {
      assert.equal(null, err);
      connection = db;     
      console.log('first connect to database');
      callback(connection);
    });
  } else {
    callback(connection);
  }
}
