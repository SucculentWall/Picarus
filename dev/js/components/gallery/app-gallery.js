var React = require("react");
var GalleryStore = require("../../stores/app-galleryStore");
var GalleryPhoto = require("./gallery-photo");
var GalleryHeader = require("./gallery-header");
var AuthStore = require("../../stores/app-authStore");

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
    console.log('mounted gallery');
    GalleryStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    GalleryStore.removeChangeListener(this._onChange);
  },
  render: function(){
    photos = [];
    var list = this.state.photos;
    for (var key in list) {
      photos.push(<GalleryPhoto key={key} data={list[key]} />);
    }
    return (
      <div className = "gallery col-xs-6">
        <GalleryHeader />
        <ul>
          {photos}
        </ul>
      </div>
    );
  }
});

module.exports = Gallery;