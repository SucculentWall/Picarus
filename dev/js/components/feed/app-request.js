var React = require("react");

var Request = React.createClass({
  render: function(){
    return (
      <li className = "req">
        <span className = "req-description">{this.props.data.description}</span>
        <span className = "req-tags">{this.props.data.tags}</span>
        <span className = "req-location">{this.props.data.location}</span>
      </li>
    );
  }
});

module.exports = Request;