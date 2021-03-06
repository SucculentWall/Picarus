// database
var db = require('./db/config');

// express
var express = require('express');
var session = require('express-session')
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
  console.log('connected');
});
module.exports = io;

// routes
var requestRouter = require('./routes/requestRouter');
var photoRouter = require('./routes/photoRouter');
var userRouter = require('./routes/userRouter');
var tagRouter = require('./routes/tagRouter');
var commentRouter = require('./routes/commentRouter');
var searchRouter = require('./routes/searchRouter');
var authRouter = require('./routes/authRouter');

// passport auth
var passport = require('./utils/auth.js').passport;
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'HotChickenWingsOnDemand'
}));
app.use(passport.initialize());
app.use(passport.session());

// for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// for logging
app.use(morgan('dev'));

app.get('/main', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'main.html'));
});

// for serving /dist files at URL/
app.use(express.static(path.join(__dirname, '../dist')));

// routing
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);
app.use('/api/photos', photoRouter);
app.use('/api/tags', tagRouter);
app.use('/api/comments', commentRouter);
app.use('/api/search', searchRouter);
app.use('/api/logout', authRouter);

// listen on port
var port = process.env.PORT || 8888;
http.listen(port);
console.log('Server started on port: ', port);