
/*
 * GET home page.
 */
var uptime_collection =require('../uptime_collection');

var renderindex = function(uptimes, opts) {
	console.log(uptimes);
	opts.res.render('index', {uptimes: uptimes});
}

exports.index = function(req, res){
	var options = {res: res};

	uptime_collection.getAll(renderindex, options);

};

