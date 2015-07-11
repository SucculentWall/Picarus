var React = require("react");

var Photo = React.createClass({
  render: function(){
    return (
      <li className = "photo">
        <span className = "photo-username">PHOTO-USERNAME-HOLDER</span>
        <span className = "photo-image">PHOTO-IMAGE</span>
      </li>
    );
  }
});

module.exports = Photo;