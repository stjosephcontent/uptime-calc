var MongoClient = require('mongodb').MongoClient
  , collection;

MongoClient.connect('mongodb://nodejitsu:529e3a71a342660a125f16d3d6076224@dharma.mongohq.com:10027/nodejitsudb6677555919', function(err, db) {
	if (err) throw err;
	collection = db.collection('uptimes');
});

exports.getAll = function(callback, opts) {
	// we sort by _id because this has the effect of sorting by time entered
	collection.find({}).sort({_id: 1}).toArray(function(err, results) {
		callback(results, opts);
	});
}

exports.insert = function(entry) {
	collection.insert(entry, function(err, docs){ 
		if (err) throw err;
	});
}

exports.remove_all = function() {
	collection.remove({}, function(err) {
		if (err) throw err;
	});
}