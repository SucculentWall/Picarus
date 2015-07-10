// database
var db = require('./db/config');
// express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
// routes
var testRouter = require('./routes/test');

// for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// for logging
app.use(morgan('dev'));
// for serving /dist files at URL/
app.use(express.static(__dirname + '/dist'));

// routing
app.use('/test', testRouter);

// listen on port
var port = process.env.PORT || 8888;
app.listen(port);