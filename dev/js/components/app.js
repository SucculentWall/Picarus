var React = require('react');
var Feed = require('./feed/app-feed');
var Header = require('./header/app-header');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Header />
        <Feed />
      </div>
    );
  }
});

module.exports = App;