// database
var db = require('./db/config');
// express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var User = require('./controllers/userController');
// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
module.exports = io;
// routes
var userRouter = require('./routes/userRouter');
var requestRouter = require('./routes/requestRouter');
var photoRouter = require('./routes/photoRouter');
var tagRouter = require('./routes/tagRouter');
var commentRouter = require('./routes/commentRouter');


io.on('connection', function (socket) {
  console.log('connected');
});

// for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// for logging
app.use(morgan('dev'));
// for serving /dist files at URL/
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/photos', express.static(path.join(__dirname, '../photos')));

// routing
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);
app.use('/api/photos', photoRouter);
app.use('/api/tags', tagRouter);
app.use('/api/comments', commentRouter);

// listen on port
var port = process.env.PORT || 8888;
http.listen(port);
console.log('Server started on port: ', port);