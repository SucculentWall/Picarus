var React = require("react"),
    Link = require('react-router-component').Link;

// dummy data, change when server hooked
var Header = React.createClass({
  render: function(){
    return (
      <div className = "nav">
        <Link href="/"><span id="logo">Icarus</span></Link>
        <span className="sign">Sign In</span>
        <span className="sign">Sign Up</span>
        <Link href="/request" className="sign">Request</Link>
        <Link href="/" className="sign">Gallery</Link>
      </div>
    );
  }
});

module.exports = Header;