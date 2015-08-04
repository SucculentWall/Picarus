var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _user = {};

var _logOut = function() {
  _user = {};
};

var _logIn = function(data, token) {
  _user.FacebookId = data.FacebookId;
  _user.id = data.id;
  _user.username = data.username;
  _user.token = token;
};

var AuthStore = assign({},EventEmitter.prototype, {
  loggedIn: function() {
    return _user.username !== undefined;
  },

  getId: function() {
    return _user.id || 0;
  },

  getFacebookId: function() {
    return _user.FacebookId;
  },

  getUsername: function() {
    return _user.username;
  },

  getToken: function() {
    return _user.token;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    case AppConstants.LOGGED_IN:
      _logIn(action.data, action.token);
      AuthStore.emitChange();
      break;

    case AppConstants.NOT_LOGGED_IN:
      _logOut();
      AuthStore.emitChange();
      break;

    default:
  }
});


module.exports = AuthStore;

