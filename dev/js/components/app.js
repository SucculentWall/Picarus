var React = require('react');
var Feed = require('./feed/app-feed');
var Gallery = require('./gallery/app-gallery');
var Header = require('./header/app-header');
var SelectedRequest = require('./request/app-request');
var Profile = require('./profile/app-profile');
var Signin = require('./signin/app-signin');
var Template = require('./app-template');
var dbUtils = require('../utils/database-utils');
require('../actions/socket-actions.js');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

require('events').EventEmitter.defaultMaxListeners = 0;


var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function(){
    return (
      <Template>
        <RouteHandler />
        <Feed />
      </Template>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="home" path="/" handler={Gallery} />
    <Route name="search" path="search/:query" handler={Gallery}/>
    <Route name='tags' path='tags/:tagname' handler={Gallery} />
    <Route name='user' path='/user/:user_id' handler={Profile} />
    <Route name='requests' path='/requests/:requestId' handler={SelectedRequest}/>
  </Route>
);

module.exports = function(){
  Router.run(routes, Router.HashLocation, function(App) {
    React.render(<App />, document.getElementById('main'));
  });
};