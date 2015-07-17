var React = require('react');
var Link = require('react-router').Link;
var AuthStore = require('../../stores/app-authStore');
var Auth = require('../app-auth');
var Navigation = require('react-router').Navigation;

// dummy data, change when server hooked
var Header = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {loggedIn : AuthStore.loggedIn()};
  },

  _handleLogout: function() {
    FB.logout(function() {
      checkLoginState();
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    text = React.findDOMNode(this.refs.text).value;
    this.transitionTo('search', {query: text});
    React.findDOMNode(this.refs.text).value = '';
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
        <form className="search-form" onSubmit={this._onSubmit}>
          <input className="search-bar" ref="text" type="text" placeholder="Search for photos" />
          <input className="search-submit submission" type="submit" />
        </form>
        { AuthStore.getUsername() ? <Link to={'/user/' + AuthStore.getId()} paramstwo={{user_id: 3}} className='sign'>Hello, {AuthStore.getUsername()}! </Link> : null }
        <Link to='/' className='sign'>Gallery</Link>
        { this.state.loggedIn ? <span className='sign' onClick={this._handleLogout}>Logout</span> : <Auth/> }
      </div>
    );
  }
});

module.exports = Header;