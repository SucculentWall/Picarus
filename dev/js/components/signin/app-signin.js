var fblogin = require('../../fblogin.js');
var React = require("react");
var dbUtils = require('../../utils/database-utils.js');
var AuthStore = require("../../stores/app-authStore");


var _FacebookLoginButton;

var Signin = React.createClass({
  _handleSignin: function() {
    FB.login(function(response) {
      if (response.authResponse) {
        checkLoginState();
        location.hash = "/";
      }
    });
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onLog);
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onLog);
  },

  render: function(){
    // Below we include the Login Button social plugin. This button uses
    // the JavaScript SDK to present a graphical Login button that triggers
    // the FB.login() function when clicked.

    // <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    // </fb:login-button>
    console.log(this.props);
    return <button className='facebook-button' onClick={this._handleSignin}>Sign In {this.props}</button>;
  }
});

module.exports = Signin;