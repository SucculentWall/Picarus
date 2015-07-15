var React = require("react");

var PhotoComment = React.createClass({
  render: function(){
    return (
      <li className = "comment">
        <span className="photo-comment">{this.props.data.text}</span>
        <span className="comment-username">Submitted by: {this.props.data.username}</span>
      </li>
    );
  }
});

module.exports = PhotoComment;