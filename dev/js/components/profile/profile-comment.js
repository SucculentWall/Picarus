var React = require('react');

var ProfileComment = React.createClass({
  getInitialState: function () {
    return {
      photo_id: 0,
    };
  },
  render: function(){
    if (!this.props.data) return (<div></div>);
    else  {
      var photo_id = this.props.data.photo_id;
      var formattedDate = new Date(this.props.data.created_at).toLocaleString();
      return (
        <div>
          {formattedDate}  <span className="comment">{this.props.data.text}</span>
        </div>
      );
    }
  }
});

module.exports = ProfileComment;