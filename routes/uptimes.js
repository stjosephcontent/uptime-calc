var MINUTES_PER_YEAR = 525949
  , MINUTES_PER_MONTH = 43829.1;
  
var uptime_collection =require('../uptime_collection');

var calc_entry = function(entry) {
	var key;
	console.log('preentry:');
	console.log(entry);
	if (entry.percent !== "") {
		entry.min_per_year = (MINUTES_PER_YEAR * (entry.percent / 100));
		entry.min_per_month = (MINUTES_PER_MONTH * (entry.percent / 100));
		
	} else if (entry.min_per_month !== "") {
		entry.percent = (entry.min_per_month / MINUTES_PER_MONTH) * 100;
		entry.min_per_year = MINUTES_PER_YEAR * (entry.percent / 100);
		
	} else if (entry.min_per_year !== "") {
		entry.percent = (entry.min_per_year / MINUTES_PER_YEAR) * 100;
		entry.min_per_month = (MINUTES_PER_MONTH * (entry.percent / 100));
	}
	
	// turn strings into floats
	for (key in entry) {
		entry[key] = parseFloat(entry[key]);
	}
	console.log('postentry:');
	console.log(entry);
	return entry;
}

exports.post = function(req, res) {
	var body = req.body
	  , partial_entry = {
		  	percent: body.percent,
		  	min_per_year: body.min_per_year,
		  	min_per_month: body.min_per_month
		}
	  , full_entry;

	// only one value should be filled so we calculate the other two values
	full_entry = calc_entry(partial_entry);
	uptime_collection.insert(full_entry);
	
	res.redirect('/');
}
