var React = require("react");

// dummy data, change when server hooked
var GalleryHeader = React.createClass({
  render: function(){
    var headerTags = [];
    var tags = this.props.data;

    for (var i=0; i<tags.length; i++) {
      headerTags.push(tags[i].tagname);

      //max 5 tags
      if (i > 4) {
        break;
      }
    }

    return (
      <div className = "filterbar">
        {headerTags}
      </div>
    );
  }
});

module.exports = GalleryHeader;