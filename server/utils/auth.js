var FBKeys = require('../../FBKeys.js')

// facebook authentication using passport and passport-facebook-token modules
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;

passport.use('facebook-token', new FacebookTokenStrategy({
    clientID        : FBKeys.FB_APP_ID,
    clientSecret    : FBKeys.FB_SECRET
  },

  function(accessToken, refreshToken, profile, done) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>facebook-token retrieved profile successfully!');

    var user = {
        'name' : profile.displayName,
        'id'   : profile.id,
        'token': accessToken
    }

    // You can perform any necessary actions with your user at this point,
    // e.g. internal verification against a users table,
    // creating new user entries, etc.

    return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

var restrictBySession = function (req, res, next) {
  if (req.session.passport.user) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> accessRestriction OK');
    next();
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> accessRestriction: access denied!');
    res.status(401).send('Access Denied.  Sign in first!');
  }
}

module.exports.passport = passport;
module.exports.accessRestriction = restrictBySession;