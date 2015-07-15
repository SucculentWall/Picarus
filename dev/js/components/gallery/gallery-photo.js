var React = require("react");

var photoTemplateClasses = [
  //column layout for 1st row of photos (adds up to 12)
  'col-xs-4',
  'col-xs-4',
  'col-xs-4',

  //column layout for 2nd row of photos
  'col-xs-6',
  'col-xs-6',

  'col-xs-3',
  'col-xs-6',
  'col-xs-3'
  //layouts repeat
]

var GalleryPhoto = React.createClass({
  render: function(){
    var numTemplates = photoTemplateClasses.length;

    return (
      <img className={"galleryphoto " + photoTemplateClasses[this.props.count%numTemplates]} src={'/photos/' + this.props.data.filename} />
    );
  }
});

module.exports = GalleryPhoto;