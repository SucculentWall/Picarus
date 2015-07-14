var fblogin = require('../../fblogin.js');
var React = require("react");
var dbUtils = require('../../utils/database-utils.js');



var _FacebookLoginButton;

// dummy data, change when server hooked
var Signin = React.createClass({
  // statics: {
  //   willTransitionTo: function(transition, params, element) {

  //   }
  // },
  
  // componentDidMount: function () {

  // },
  
  componentWillMount: function() {
    console.log('what is window.fbAsyncInit: ', typeof window.fbAsyncInit);
    _FacebookLoginButton = React.createElement('fb:login-button', { scope: "public_profile,email", onlogin:"checkLoginState()"});
  }, 

  render: function(){
    // Below we include the Login Button social plugin. This button uses
    // the JavaScript SDK to present a graphical Login button that triggers
    // the FB.login() function when clicked.

    // <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    // </fb:login-button>
    console.log('rendering fblogin button');
    return _FacebookLoginButton;
  }
});

module.exports = Signin;