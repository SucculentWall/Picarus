var React = require('react');
var Feed = require('./feed/app-feed');
var Header = require('./header/app-header');
var Request = require('./request/app-request');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Header />
        <Feed />
        <Request />
      </div>
    );
  }
});

module.exports = App;