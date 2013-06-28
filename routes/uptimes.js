var MINUTES_PER_YEAR = 525949
  , MINUTES_PER_MONTH = 43829.1;
 
var calc_entry = function(entry) {
	var key
	  , pct_down;

	if (entry.percent !== "") {
		pct_down = 100 - (entry.percent);
		entry.min_per_year = ((MINUTES_PER_YEAR * (pct_down / 100)));
		entry.min_per_month = ((MINUTES_PER_MONTH * (pct_down / 100)));
		
	} else if (entry.min_per_month !== "") {
		entry.percent = (((MINUTES_PER_MONTH - entry.min_per_month) / MINUTES_PER_MONTH) * 100);
		pct_down = 100 - (entry.percent);
		entry.min_per_year = ((MINUTES_PER_YEAR * (pct_down / 100)));
		
	} else if (entry.min_per_year !== "") {
		entry.percent = (((MINUTES_PER_YEAR - entry.min_per_year) / MINUTES_PER_YEAR) * 100);
		pct_down = 100 - (entry.percent);
		entry.min_per_month = ((MINUTES_PER_MONTH * (pct_down / 100)));
	}
	
	// turn strings into floats
	for (key in entry) {
		entry[key] = parseFloat(entry[key]);
	}

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
