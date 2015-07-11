var React = require("react");
var GalleryStore = require("../../stores/app-galleryStore");
var Request = require("./feed-request");

var getPhotos = function(){
  // TODO: retrieve photo requests from server
  return {photos: GalleryStore.getAllPhotos()};
};

var Gallery = React.createClass({
  getInitialState: function(){
    return getPhotos();
  },
  _onChange: function () {
    console.log('change triggered');
    this.setState(getPhotos());
  },

  componentDidMount: function() {
    console.log('mounted');
    GalleryStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GalleryStore.removeChangeListener(this._onChange);
  },
  render: function(){
    photos = [];
    var list = this.state.photos;
    for (var key in list) {
      photos.push(<GalleryPhoto data={list[key]} />);
    }
    return (
      <div className = "gallery">
        <GalleryHeader />
        <ul>
          {photos}
        </ul>
      </div>
    );
  }
});

module.exports = Gallery;