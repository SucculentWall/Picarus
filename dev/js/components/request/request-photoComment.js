var React = require('react');
var Link = require('react-router').Link;


var PhotoComment = React.createClass({
  render: function(){
    return (
      <li className = 'comment'>
        <span className='photo-comment'>{this.props.data.text}</span>
        <span className='comment-username'>Submitted by: <Link to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></span>
      </li>
    );
  }
});

module.exports = PhotoComment;