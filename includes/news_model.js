

module.exports.getCount = function(db, callback) {
  db.collection('articles').count(function(err, count){
    callback(count);
  });
}

module.exports.seedDatabase = function(db, callback) {
  console.log("seeding the database");
}
