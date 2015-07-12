var React = require("react");

var Photo = React.createClass({
  render: function(){
    console.log('Photo render ',this.props.data);
    return (
      <li className = "photo">
        <span className = "photo-username">Submitted by: {this.props.data.username}</span>
        <img className = "requestphoto" src={'/photos/' + this.props.data.filename} />
      </li>
    );
  }
});

module.exports = Photo;