var React = require("react");

var Photo = React.createClass({
  render: function(){
    return (
      <li className = "photo">
        <span className = "photo-username">Submitted by: {this.props.data.username}</span>
        <a href={'/photos/' + this.props.data.filename} target="_blank"><img className = "requestphoto" src={'/photos/' + this.props.data.filename} /></a>
      </li>
    );
  }
});

module.exports = Photo;