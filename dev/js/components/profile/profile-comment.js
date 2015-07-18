var React = require('react');
var Link = require('react-router').Link;

var ProfileComment = React.createClass({ 
  render: function(){
    if (!this.props.data) return (<div></div>);
    var formattedDate = new Date(this.props.data.created_at).toLocaleString();
    return (
      <div>
        {formattedDate} <span className='comment recent'><Link to='requests' params= {{requestId: this.props.data.request_id}}>{this.props.data.text}</Link></span>
      </div>
    );
  }
});

module.exports = ProfileComment;