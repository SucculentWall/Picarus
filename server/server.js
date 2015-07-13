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
var photoRouter = require('./routes/photoRouter');
var tagRouter = require('./routes/tagRouter');

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

// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
  socket.on('newRequest', function(createdRequest){
    console.log('sup!');
    io.emit('updateRequest');
  });
});

// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
  socket.on('newRequest', function(createdRequest){
    console.log('sup!');
    io.emit('updateRequest');
  });
});

// listen on port
var port = process.env.PORT || 8888;
app.listen(port);
console.log('Server started on port: ', port);