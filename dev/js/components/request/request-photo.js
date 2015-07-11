var React = require("react");

var Photo = React.createClass({
  render: function(){
    console.log('Photo render ',this.props.data);
    return (
      <li className = "photo">
        <span className = "photo-username">User Id: {this.props.data.user_id}</span>
        <img className = "requestphoto" src={'/photos/' + this.props.data.filename} />
      </li>
    );
  }
});

module.exports = Photo;