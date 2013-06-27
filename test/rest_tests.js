var request = require('superagent')
  , expect = require('chai').expect;
  
describe('Suite one', function() {
	it ('get index', function(done) {
		request.get('localhost:3000').end(function(res) {
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.text).to.contain('Uptime percentages');
			done();
		});
	});
	
	it('post uptimes', function(done) {
		request
			.post('localhost:3000/uptimes')
			.send({percent: '50', min_per_month: '', min_per_year: ''})
			.set('X-API-Key', 'foobar')
			.set('Accept', 'application/json')
			.end(function(error, res) {
				done();
			});
	});
});
