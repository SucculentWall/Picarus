var React = require("react");

var ProfileHeader = React.createClass({
  render: function(){
    return (
      <div>
        <h1>{this.props.data.username}</h1>
      </div>
    );
  }
});

module.exports = ProfileHeader;