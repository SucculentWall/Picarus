var React = require("react");

// dummy data, change when server hooked
var GalleryHeader = React.createClass({
  render: function(){
    return (
      <div className = "filterbar">
        <span> Hottest </span>| 
        <span> Sexiest </span>|
        <span> Cutest </span>|
        <span> Coolest </span>
      </div>
    );
  }
});

module.exports = GalleryHeader;