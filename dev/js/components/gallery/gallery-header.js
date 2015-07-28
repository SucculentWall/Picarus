var React = require("react");
var GalleryHeaderTag = require("./gallery-headerTag");

var GalleryHeader = React.createClass({
  render: function(){
    var headerTags = [];
    var tags = this.props.data;

    //show max of 5 tags
    for (var i=0; ((i<tags.length) && (i<5)); i++) {
      if (tags[i].tagname) {
        headerTags.push(<GalleryHeaderTag key={i} data={tags[i]} />);
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