var express = require('express')
  , app = express()
  , path = require('path')
  , http = require('http')
  , sprintf = require('sprintf');

GLOBAL.uptime_collection =require('./uptime_collection');
 
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.locals.sprintf = require('sprintf').sprintf;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', require('./routes/index').index);
app.post('/uptimes', require('./routes/uptimes').post);
app.get('/removeall', require('./routes/removeall').get);