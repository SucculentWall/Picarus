var React = require('react');
var Feed = require('./feed/app-feed')

var App = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Icarus</h1>
        <Feed />
      </div>
    );
  }
});

module.exports = App;