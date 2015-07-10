var React = require("react");

var Request = React.createClass({
  render: function(){
    return (
      <li className = "req">
        <span className = "req-username">{this.props.data.username}</span>
        <span className = "req-text">{this.props.data.text}</span>
      </li>
    );
  }
});

module.exports = Request;