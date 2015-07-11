var React = require("react");

var GalleryPhoto = React.createClass({
  render: function(){
    return (
      <li className = "galleryphoto">
        <span className = "galleryphoto-username">PHOTO-USERNAME-HOLDER</span>
        <span className = "galleryphoto-image">PHOTO-IMAGE</span>
      </li>
    );
  }
});

module.exports = GalleryPhoto;