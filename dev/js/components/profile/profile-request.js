var React = require('react');
var Link = require('react-router').Link;

var ProfileRequest = React.createClass({
  render: function(){
    if (!this.props.data) {
      return (<div></div>);
    }
    else {
      var formattedDate = new Date(this.props.data.created_at).toLocaleString();
      return (
        <div>
          {formattedDate}  <Link to='requests' params={{requestId: this.props.data.id}} className='recent'>{this.props.data.text}</Link>
        </div>
      );
    }
  }
});

module.exports = ProfileRequest;

