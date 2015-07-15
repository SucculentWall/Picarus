var React = require('react');
var Link = require('react-router').Link;
var AuthStore = require('../../stores/app-authStore');
var Auth = require('../app-auth');

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
      <div className = 'nav'>
        <Link to='/'><span id='logo'>Picarus</span></Link>
        { AuthStore.getUsername() ? <span className='sign'>Hello, {AuthStore.getUsername()}! </span> : null }
        <Link to='/' className='sign'>Gallery</Link>
        { this.state.loggedIn ? <span className='sign' onClick={this._handleLogout}>Logout</span> : <Auth/> }
      </div>
    );
  }
});

module.exports = Header;