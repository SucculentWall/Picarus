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

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


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

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// passport.use(new FacebookStrategy({
//     clientID: '503701019795522',
//     clientSecret: 'a937806ce8c1410f102e6d708861bfe7',
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ username: profile.id })
//     .then(function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// var ensureAuthenticated = function (req, res) {
//   if (req.isAuthenticated()) { res.status(202).send(req.user.username); }
//   else { res.status(400).send('please sign in'); }
// };

// app.use(passport.initialize());
// app.use(passport.session());
//app.use('/', ensureAuthenticated);

//app.use('/auth', passport.authenticate('facebook'), function (req,res) {});
app.use('/photos', express.static(path.join(__dirname, '../photos')));

// routing
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);
app.use('/api/photos', photoRouter);
app.use('/api/tags', tagRouter);

// listen on port
var port = process.env.PORT || 8888;
http.listen(port);
console.log('Server started on port: ', port);