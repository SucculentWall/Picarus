var dbUtils = require('./utils/database-utils.js');
var AppActions = require('./actions/app-actions.js');

window.checkLoginState = function () {
  FB.getLoginStatus(function(response) {
    FB.api('/me', function (resp) {
      dbUtils.findOrCreateUser(response.authResponse.userID.toString(),resp.name, response);
    });  
  });
};

window.fbAsyncInit = function() {
  FB.init({
    appId      : '503699336462357',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.3
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    FB.api('/me', function (resp) {
      dbUtils.findOrCreateUser(resp.id.toString(),resp.name, response);
    });
  });

};

// Load the SDK asynchronously
(function(doc, scrip, facebookjssdk) {
  var js, fjs = doc.getElementsByTagName(scrip)[0];
  if (doc.getElementById(facebookjssdk)) return;
  js = doc.createElement(scrip); 
  js.facebookjssdk = facebookjssdk;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
// function testAPI() {
//   console.log('Welcome!  Fetching your information.... ');
//   FB.api('/me', function(response) {
//     console.log('Successful login for: ' + response.name);
//     document.getElementById('status').innerHTML =
//       'Thanks for logging in, ' + response.name + '!';
//   });
// }