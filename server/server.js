// database
var db = require('./db/config');
// express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
// routes
var userRouter = require('./routes/userRouter');
var requestRouter = require('./routes/requestRouter');

// for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// for logging
app.use(morgan('dev'));
// for serving /dist files at URL/
app.use(express.static(path.join(__dirname, '../dist')));

// routing
app.use('/users', userRouter);
app.use('/requests', requestRouter);

// listen on port
var port = process.env.PORT || 8888;
app.listen(port);
console.log('Server started on port: ', port);