var React = require('react');

var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var UserStore = require('../../stores/app-userStore');
var PhotoComment = require('../request/request-photoComment');
var MakeComment = require('../request/request-makeComment');
var AuthStore = require('../../stores/app-authStore');
var Modal = require('react-bootstrap').Modal;

var photoComments, comments, numTemplates;

var currUserId = AuthStore.getId() || 0;

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
  return {photoComments: RequestStore.getComment(id)};
};

var getPhotoLikes = function(id){
  var profilePagePhotoLikes = UserStore.getLikes(id);
  return profilePagePhotoLikes;
};

var getNumComments = function(id){
  return RequestStore.getNumComments(id) || 0;
};

var getToggleState = function(id){
  return { // {showCommentEntry: , showModal: }
    showCommentEntry : UserStore.getDisplayToggle(id).showCommentEntry || false,
    showModal : UserStore.getDisplayToggle(id).showModal || false
  };
};

var checkLiked = function(id){
  currUserId = AuthStore.getId() || 0;
  // return bool based on whether there is entry in join table
  return UserStore.getPhotoLikeStatus(currUserId, id);
};


var ProfilePhoto = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = getToggleState(this.props.data.id).showCommentEntry;
    stateObj.showModal = getToggleState(this.props.data.id).showModal;
    stateObj.likes = getPhotoLikes(this.props.data.id);
    stateObj.unclicked = checkLiked(this.props.data.id);
    stateObj.numComments = getNumComments(this.props.data.id);

    return stateObj;
  },

  close: function (){
    AppActions.togglePhotoModal(this.props.data.id);
    // this.setState({ showModal: false });
  },

  open: function (){
    AppActions.togglePhotoModal(this.props.data.id);
    // this.setState({ showModal: true });
  },

  _onClick: function () {
    AppActions.loadComments(this.props.data.id);
    AppActions.toggleCommentDisplay(this.props.data.id);
  },

  _likeOrUnlike: function() {
    this.setState({unclicked: !this.state.unclicked});
    if (this.state.unclicked === true) {
      // increment
      AppActions.likePhoto(this.props.data.id, currUserId);
    } else {
      // decrement
      AppActions.unlikePhoto(this.props.data.id, currUserId);
    }
  },

  _onLikeOrUnlike: function() {
    if (this.isMounted()){
      this.setState({likes: getPhotoLikes(this.props.data.id)});
      this.setState({unclicked: checkLiked(this.props.data.id)});
    }
  },

  _onChange: function () {
    if (this.isMounted()){
      this.setState(getPhotoComments(this.props.data.id));
      this.setState(getToggleState(this.props.data.id)); 

      this.setState({unclicked: checkLiked(this.props.data.id)});
      this.setState({numComments: getNumComments(this.props.data.id)});
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
    AppActions.getPhotoLikes(currUserId, RequestStore.getPhotos());
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      // pass in current user and all the photos on this current request page
      AppActions.getPhotoLikes(currUserId);
      AppActions.loadComments(this.props.data.id);
    }
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onLog);
    UserStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onLikeOrUnlike);

    RequestStore.addChangeListener(this._onChange);

    AppActions.getPhotoLikes(currUserId);
    AppActions.loadComments(this.props.data.id);

    // // commenting out for now, throwing error on user change
    // if (this.state.showModal){
    //   AppActions.togglePhotoModal(this.props.data.id);
    // }
    // if (this.state.showCommentEntry) {
    //   AppActions.toggleCommentDisplay(this.props.data.id);
    // }
  },

  componentWillUnmount: function() {    
    UserStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onLikeOrUnlike);

    RequestStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);

    // // commenting out for now, throwing error on user change
    // if (this.state.showModal){
    //   AppActions.togglePhotoModal(this.props.data.id);
    // }
    // if (this.state.showCommentEntry) {
    //   AppActions.toggleCommentDisplay(this.props.data.id);
    // }
  },

  render: function(){
    numTemplates = photoTemplateClasses.length;
    photoComments = [];
    for (var key in this.state.photoComments) {
      photoComments.push(<PhotoComment key={key} data={this.state.photoComments[key]} />);
    }
    comments = (
      <div>
        <p onClick={this._onClick}> {this.state.numComments} Comments</p>
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
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: {this.props.data.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className = 'requestphoto' src={process.env.PHOTOS_HOST + this.props.data.filename} />
          </Modal.Body>
          <Modal.Footer>
            <span className='modal-description'>{this.props.data.description}</span>
            <a href={process.env.PHOTOS_HOST + this.props.data.filename} target='_blank'>Full image</a>
            {likes}
            {comments}
          </Modal.Footer>
        </Modal>
        <div>
          <img onClick={this.open} className={'gallery-photo ' + photoTemplateClasses[this.props.count%numTemplates]} src={process.env.PHOTOS_THUMBHOST + this.props.data.filename} />
        </div>
      </div>
    );
  }
});

module.exports = ProfilePhoto;