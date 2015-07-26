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

    if (text!==''){
      this.transitionTo('search', {query: text});
    }
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
      <nav className="navbar navbar-default">
        <div className="container-fluid header-container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand"> <Link to='/'><span id='logo'>Picarus</span></Link> </div>
          </div>

          <div className="collapse navbar-collapse navbar-header navbar-right" id="bs-navbar-collapse-1">
            <form className="navbar-form navbar-left search-form" role="search" onSubmit={this._onSubmit}>
              <div className="form-group">
                <input  className="search-bar" ref="text" type="text" placeholder="Search for photos" required/>
                <i className='glyphicon glyphicon-search search-submit' onClick={this._onSubmit} required></i>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              { AuthStore.getUsername() ? <li className='sign'><Link to={'/user/' + AuthStore.getId()} paramstwo={{user_id: 3}}>Hi, {AuthStore.getUsername().split(' ')[0]}!</Link></li>: null }
              { this.state.loggedIn ? <li className='sign' onClick={this._handleLogout}>Logout</li> : <li className="header-sign"><Auth /></li> }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;