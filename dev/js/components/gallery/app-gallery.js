var React = require("react");
var classNames = require("classnames");
var AppActions = require("../../actions/app-actions");
var GalleryStore = require("../../stores/app-galleryStore");
var GalleryPhoto = require("./gallery-photo");
var GalleryHeader = require("./gallery-header");
var Request = require("./gallery-request");
var AuthStore = require("../../stores/app-authStore");

var getData = function(){
  // TODO: retrieve photo requests from server
  return {
    photos: GalleryStore.getAllPhotos(),
    tags: GalleryStore.getAllTags(),
    requests: GalleryStore.getAllRequests(),
  };
};

var Gallery = React.createClass({
  getInitialState: function(){
    var obj = getData();
    obj.searchPhotos = true;
    obj.searchRequests = false;
    return obj;
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      if (params.tagname) {
        AppActions.getPhotosForTag(params.tagname);
        AppActions.getAllTags();
      } else if (params.query) {
        AppActions.getPhotosForSearch(params.query);
        AppActions.getRequestsForSearch(params.query);
        AppActions.getAllTags();
      } else {
        AppActions.getAllPhotos();
        AppActions.getAllTags();
      }
    }
  },

  _onChange: function () {
    this.setState(getData());
  },

  _searchRequests: function() {
    this.setState({searchRequests: true, searchPhotos: false });
  },

  _searchPhotos: function() {
    this.setState({searchPhotos: true, searchRequests: false});
  },

  componentDidMount: function() {
    GalleryStore.addChangeListener(this._onChange);
    if (this.props.params.tagname) {
      AppActions.getPhotosForTag(this.props.params.tagname);
      AppActions.getAllTags();
    } else if (this.props.params.query) {
      AppActions.getPhotosForSearch(this.props.params.query);
      AppActions.getRequestsForSearch(this.props.params.query);
      AppActions.getAllTags();
    } else {
      AppActions.getAllPhotos();
      AppActions.getAllTags();
    }
  },
  componentWillUnmount: function() {
    GalleryStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var photos = [];
    var photosList = this.state.photos;
    var photoCount = 0;

    for (var key in photosList) {
      photos.push(<GalleryPhoto key={key} count={photoCount} data={photosList[key]} />);
      photoCount++;
    }

    var requests = [];
    var requestsList = this.state.requests;
    requestCount = 0;

    for (key in requestsList) {
      requests.push(<Request key={key} count={requestCount} data={requestsList[key]} />);
      requestCount++;
    }

    var photoClasses = classNames('header-tag','col-xs-6',{'active': this.state.searchPhotos});
    var requestClasses = classNames('header-tag','col-xs-6',{'active': this.state.searchRequests});


    var searchHeader = (
      <div className = "filterbar">
        <span className={photoClasses} onClick={this._searchPhotos}>PHOTO RESULTS ({photoCount})</span><span className={requestClasses} onClick={this._searchRequests}>REQUEST RESULTS ({requestCount})</span>
      </div>
    );

    return (
      <div className = "gallery col-xs-8">
        { !this.props.params.query ? <GalleryHeader data={this.state.tags} /> : searchHeader }
        <div>
          { this.state.searchPhotos ? photos : requests }
        </div>
      </div>
    );
  }
});

module.exports = Gallery;