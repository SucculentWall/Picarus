var React = require("react");
var Link = require('react-router').Link;

// dummy data, change when server hooked
var Header = React.createClass({
  render: function(){
    return (
      <div className = "nav">
        <Link to="/"><span id="logo">Icarus</span></Link>
        <span className="sign">Sign In</span>
        <span className="sign">Sign Up</span>
        <Link to="/request" className="sign">Request</Link>
        <Link to="/" className="sign">Gallery</Link>
      </div>
    );
  }
});

module.exports = Header;