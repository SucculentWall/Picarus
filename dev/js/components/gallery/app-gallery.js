var React = require("react");
var AppActions = require("../../actions/app-actions");
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

  statics: {
    willTransitionTo: function(transition, params, element) {
      console.log('will transition to app-gallery');
      AppActions.getAllPhotos();
    }
  },

  _onChange: function () {
    console.log('change triggered');
    this.setState(getPhotos());
  },

  componentDidMount: function() {
    console.log('mounted gallery');
    GalleryStore.addChangeListener(this._onChange);
    AppActions.getAllPhotos();
  },
  componentWillUnmount: function() {
    GalleryStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var photos = [];
    var list = this.state.photos;
    var count = 0;
    for (var key in list) {
      photos.push(<GalleryPhoto key={key} count={count} data={list[key]} />);
      count++;
    }
    return (
      <div className = "gallery col-xs-8">
        <GalleryHeader />
        <div>
          {photos}
        </div>
      </div>
    );
  }
});

module.exports = Gallery;