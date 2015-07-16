var React = require("react");
var Link = require("react-router").Link;

var GalleryHeaderTag = React.createClass({
  render: function(){
    return (
      <Link className="header-tag" to="tags" params={{tagname: this.props.data.tagname}} >
        {this.props.data.tagname}
      </Link>
    );
  }
});

module.exports = GalleryHeaderTag;