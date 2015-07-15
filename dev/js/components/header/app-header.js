var React = require("react");
var Link = require('react-router').Link;
var AuthStore = require("../../stores/app-authStore");
var Auth = require("../app-auth");

// dummy data, change when server hooked
var Header = React.createClass({
  getInitialState: function() {
    return {loggedIn : AuthStore.loggedIn()};
  },

  _handleLogout: function() {
    FB.logout(function() {
      checkLoginState();
      location.hash = '/';
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
    return (
      <div className = "nav">
        <Link to="/"><span id="logo">Icarus</span></Link>
        { this.state.loggedIn ? <span><span>Hello {AuthStore.getUsername()} </span><span onClick={this._handleLogout}>Logout</span></span> : <Auth/> }
        <Link to="/request" className="sign">Request</Link>
        <Link to="/" className="sign">Gallery</Link>
      </div>
    );
  }
});

module.exports = Header;