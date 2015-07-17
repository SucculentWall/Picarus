var React = require("react");

var ProfileHeader = React.createClass({
  render: function(){
    return (
      <div className='prof-header'>
        <h1 className='prof-name'>{this.props.data.username}</h1>
      </div>
    );
  }
});

module.exports = ProfileHeader;