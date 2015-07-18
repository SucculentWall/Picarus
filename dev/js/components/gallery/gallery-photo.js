var React = require('react');

var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var GalleryStore = require('../../stores/app-galleryStore');
var PhotoComment = require('../request/request-photoComment');
var MakeComment = require('../request/request-makeComment');
var AuthStore = require('../../stores/app-authStore');
var Modal = require('react-bootstrap').Modal;
var Link = require('react-router').Link;

var photoComments, comments, numTemplates;

var currUserId = AuthStore.getId();

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
];

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id) || []};
};

var getPhotoLikes = function(id){
  var galleryPhotoLikes = GalleryStore.getLikes(id);
  console.log('photo likes from this photo on gallery: ', galleryPhotoLikes);
  return galleryPhotoLikes;
};

var getToggleState = function(id){
  // console.log('getToggleState getting from request store: ', RequestStore.getDisplayToggle(id) );
  return { // {showCommentEntry: , showModal: }
    showCommentEntry : GalleryStore.getDisplayToggle(id).showCommentEntry || false,
    showModal : GalleryStore.getDisplayToggle(id).showModal || false
  };
};

var checkLiked = function(id){
  return GalleryStore.getPhotoLikeStatus(id);
};

var GalleryPhoto = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = getToggleState(this.props.data.id).showCommentEntry;
    stateObj.showModal = getToggleState(this.props.data.id).showModal;
    stateObj.likes = getPhotoLikes(this.props.data.id);
    stateObj.unclicked = checkLiked(this.props.data.id);
    return stateObj;
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    this.setState({ showModal: true });
  },

  _onClick: function () {
    console.log('_onClick, what is this: ', this.props);

    AppActions.loadComments(this.props.data.id);
    this.setState({showCommentEntry: !this.state.showCommentEntry});
  },

  _likeOrUnlike: function() {
    this.setState({unclicked: !this.state.unclicked});
    if (this.state.unclicked === true) {
      // increment
      AppActions.likePhoto(this.props.data.id);
    } else {
      // decrement
      AppActions.unlikePhoto(this.props.data.id);
    }
  },

  _onLikeOrUnlike: function() {
    console.log('I fIRED');
    //AppActions.pickRequest(+this.props.data.requestId);
    console.log('liked/unliked!');
    if (this.isMounted()){
      this.setState({likes: getPhotoLikes(this.props.data.id)});
      this.setState({unclicked: checkLiked(this.props.data.id)});
    }
  },

  _onChange: function () {
    console.log('change triggered on photo');
    if (this.isMounted()){
      this.setState(getPhotoComments(this.props.data.id));
      this.setState({unclicked: checkLiked(this.props.data.id)});
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      // pass in current user and all the photos on this current request page
      AppActions.getPhotoLikes(currUserId);
    }
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this._onChange);
    GalleryStore.addChangeListener(this._onLikeOrUnlike);
    AuthStore.addChangeListener(this._onLog);

    AppActions.getPhotoLikes(currUserId);
  },

  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this._onChange);
    GalleryStore.removeChangeListener(this._onLikeOrUnlike);
    AuthStore.removeChangeListener(this._onLog);
  },

  render: function(){
    numTemplates = photoTemplateClasses.length;
    photoComments = [];
    for (var key in this.state.photoComments) {
      photoComments.push(<PhotoComment key={key} data={this.state.photoComments[key]} />);
    }
    comments = (
      <div>
        <span className="comment-slider" onClick={this._onClick}>Comments</span>
        <ul>
          { this.state.showCommentEntry ? {photoComments} : null}
          { this.state.showCommentEntry && this.state.loggedIn ? <MakeComment data={this.props.data}/> : null }
        </ul>
      </div>
    );
    heart = (
      <div className = {this.state.unclicked ? 'glyphicon glyphicon-heart unclicked' : 'glyphicon glyphicon-heart'} onClick={this._likeOrUnlike}></div>
    );
    likes = (
      <div className='likes'>
        <span> {this.state.likes} likes </span>
        {this.state.loggedIn ? {heart} : null}
      </div>
    );

    return (
      <div className='photo'>
        {/* Modal, only shows when showModal is true, dialogClassName is the CSS class */}
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          {/* Modal.Header has a closeButton prop (x in the top right) */}
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: <Link to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className = 'requestphoto' src={'/photos/' + this.props.data.filename} />
          </Modal.Body>
          {/* Modal.Footer includes the comments */}
          <Modal.Footer>
          <span className='modal-description'>{this.props.data.description}</span>
            <a href={'/photos/' + this.props.data.filename} target='_blank'>Full image</a>
            {likes}
            {comments}
          </Modal.Footer>
        </Modal>
        <div>
          <img onClick={this.open} className={'galleryphoto ' + photoTemplateClasses[this.props.count%numTemplates]} src={'/photos/' + this.props.data.filename} />
        </div>
      </div>
    );
  }
});

module.exports = GalleryPhoto;