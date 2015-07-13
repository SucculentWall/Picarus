var React = require('react');
var Feed = require('./feed/app-feed');
var Gallery = require('./gallery/app-gallery');
var Header = require('./header/app-header');
var Request = require('./request/app-request');
var Router = require('react-router-component');
var Template = require('./app-template');
var Locations = Router.Locations;
var Location = Router.Location;

var App = React.createClass({
  render: function(){
    return (
      <Template>
        <Locations>
          <Location path="/" handler={Gallery} />
          <Location path="/request/:requestId" handler={Request} />
        </Locations>
        <Feed />
      </Template>
    );
  }
});

module.exports = App;