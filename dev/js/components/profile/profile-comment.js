var React = require('react');

var ProfileComment = React.createClass({
  getInitialState: function () {
    return {
      photo_id: 0,
    };
  },
  render: function(){
    if (!this.props.data) return (<div></div>);
    else return (
      <p className = 'comment'>{this.props.data.photo_id}  {this.props.data.created_at}  {this.props.data.text}</p>
    );
  }
});

module.exports = ProfileComment;