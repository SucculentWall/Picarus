var React = require("react");
var Link = require('react-router').Link;

// dummy data, change when server hooked
var Auth = React.createClass({
  render: function(){
    return (
      <div>
        <Link to="/signin">Sign In</Link>
      </div>
    );
  }
});

module.exports = Auth;