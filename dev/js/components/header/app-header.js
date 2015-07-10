var React = require("react"),
    Logo = require("./header-logo"),
    Signin = require("./header-signin"),
    Signup = require("./header-signup");

// dummy data, change when server hooked
var Header = React.createClass({
  render: function(){
    return (
      <div className = "nav">
        <Logo />
        <Signin />
        <Signup />
      </div>
    );
  }
});

module.exports = Header;