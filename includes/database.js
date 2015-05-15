module.exports = (function() {
  var MongoDB = require('mongodb').MongoClient,
      assert  = assert || require('assert'),
      config = require('./config.js');

  MongoDB.connect(config.mongo, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to database");
    
    db.close();
  });

  return MongoDB;
})();
