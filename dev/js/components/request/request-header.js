var React = require('react');
var Link = require('react-router').Link;

var RequestHeader = React.createClass({
  render: function(){
    console.log('request header data ', this.props.data);
    var tagsList = [];
    var tags = this.props.data.tags;
    for (var i=0; i<tags.length; i++) {
      tagsList.push(<span>{tags[i].tagname} </span>);
    }
    return (
      <div className = 'req-header'>
        <h1 className = 'req-title'>{this.props.data.text}</h1>
        <h3 className = 'req-username'>Requested By : <Link to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></h3>
        <p>Tags: {tagsList}</p>
      </div>
    );
  }
});

module.exports = RequestHeader;