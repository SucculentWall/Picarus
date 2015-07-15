var React = require("react");

var RequestHeader = React.createClass({
  render: function(){
    var tagsList = [];
    var tags = this.props.data.tags;
    for (var i=0; i<tags.length; i++) {
      tagsList.push(<span>{tags[i].tagname} </span>);
    }
    return (
      <div className = "req-header">
        <h1 className = "req-title">{this.props.data.text}</h1>
        <h3 className = "req-username">Requested By : {this.props.data.username} </h3>
        <p>Tags: {tagsList}</p>
      </div>
    );
  }
});

module.exports = RequestHeader;