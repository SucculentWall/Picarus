var React = require("react");

// dummy data, change when server hooked
var GalleryHeader = React.createClass({
  render: function(){
    return (
      <div className = "filterbar">
        <span>Albert</span>
        <span>JP</span>
        <span>Ning</span>
        <span>Edwin</span>
      </div>
    );
  }
});

module.exports = GalleryHeader;