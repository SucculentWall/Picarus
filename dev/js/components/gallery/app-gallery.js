var React = require("react");
var classNames = require("classnames");
var AppActions = require("../../actions/app-actions");
var GalleryStore = require("../../stores/app-galleryStore");
var GalleryPhoto = require("./gallery-photo");
var GalleryHeader = require("./gallery-header");
var Request = require("./gallery-request");
var AuthStore = require("../../stores/app-authStore");
var i;

var getData = function(){
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
    obj.photoPage = 0;
    obj.reqPage = 0;
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

  _photoPageTurn: function(i) {
    this.setState({photoPage : i});
  },
  _reqPageTurn: function(i) {
    this.setState({reqPage : i});
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

    for (var i = 0; i < photosList.length; i++) {
      photos.push(<GalleryPhoto key={photosList[i].id} count={photoCount} data={photosList[i]} />);
      photoCount++;
    };

    var photoPages = Math.ceil(photoCount/16);
    var photoButtons = [];
    var photoPageClasses;
    for (i = photoPages-1; i >=0; i--) {
      photoPageClasses = classNames('page-button', {'active': this.state.photoPage === i});
      photoButtons.push((<li className={photoPageClasses} onClick={this._photoPageTurn.bind(this, i)} key={i}>{i+1}</li> ));
    }

    var requests = [];
    var requestsList = this.state.requests;
    var requestCount = 0;

    for (var i = 0; i < requestsList.length; i++) {
      requests.push(<Request key={requestsList[i].id} count={requestCount} data={requestsList[i]} />);
      requestCount++;
    };

    var requestPages = Math.ceil(requestCount/16);
    var requestButtons = [];
    var reqPageClasses;
    for (i = requestPages.length-1; i >= 0; i--) {
      reqPageClasses = classNames('page-button', {'active': this.state.reqPage === i});
      requestButtons.push((<li className={reqPageClasses} onClick={this._reqPageTurn.bind(this, i)} key={i}>{i+1}</li> ));
    }

    var photoClasses = classNames('header-tag','col-xs-6',{'active': this.state.searchPhotos});
    var requestClasses = classNames('header-tag','col-xs-6',{'active': this.state.searchRequests});

    
    var searchHeader = (
      <div className = "filterbar">
        <span className={photoClasses} onClick={this._searchPhotos}>PHOTOS ({photoCount})</span><span className={requestClasses} onClick={this._searchRequests}>REQUESTS ({requestCount})</span>
      </div>
    );

    var displayResults = this.state.searchPhotos ? this.state.photoPage*16 : this.state.reqPage*16;
    var total = this.state.searchPhotos ? photoCount : requestCount;

    return (
      <div className = "gallery col-md-8 clearfix">
        { !this.props.params.query ? <GalleryHeader data={this.state.tags} /> : searchHeader }
        <div className='col-xs-12'>
          <ul className="page-button-ul">
            { this.state.searchPhotos && total > 16 ? photoButtons : requestButtons }
          </ul>
          <span className='page-display'> Displaying { total ? displayResults+1 : 0 } - {Math.min(displayResults+16, total)} of {total} results </span>
        </div>
        <div>
          { this.state.searchPhotos ? photos.splice(this.state.photoPage*16,(this.state.photoPage*16)+16) : requests.splice(this.state.reqPage*16,(this.state.reqPage*16)+16) }
        </div>
      </div>
    );
  }
});

module.exports = Gallery;