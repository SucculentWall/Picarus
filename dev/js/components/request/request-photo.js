var React = require('react');

var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var PhotoComment = require('./request-photoComment');
var MakeComment = require('./request-makeComment');
var Auth = require('../app-auth');
var AuthStore = require('../../stores/app-authStore');
var Link = require('react-router').Link;
// require specific react-bootstrap component
var Modal = require('react-bootstrap').Modal;

var currUserId = AuthStore.getId();

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id) || []};
};

var getNumComments = function(id){
  return RequestStore.getNumComments(id) || 0;
};

var getToggleState = function(id){
  return { // {showCommentEntry: , showModal: }
    showCommentEntry : RequestStore.getDisplayToggle(id).showCommentEntry || false,
    showModal : RequestStore.getDisplayToggle(id).showModal || false
  };
};

var getPhotoLikes = function(id){
  return RequestStore.getLikes(id) || 0;
};

var checkLiked = function(id){
  currUserId = AuthStore.getId();
  // return bool based on whether there is entry in join table
  return RequestStore.getPhotoLikeStatus(currUserId, id);
};

var Photo = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = getToggleState(this.props.data.id).showCommentEntry;
    stateObj.showModal = getToggleState(this.props.data.id).showModal;

    // likes
    stateObj.likes = getPhotoLikes(this.props.data.id);
    // based on db truth (has this user liked this photo) from join table  
    stateObj.unclicked = checkLiked(this.props.data.id); 
    // number of comments
    stateObj.numComments = getNumComments(this.props.data.id);
    return stateObj;
  },

  close: function (){
    AppActions.toggleRequestPhotoModal(this.props.data.id);
  },

  open: function (){
    AppActions.toggleRequestPhotoModal(this.props.data.id);
  },

  _openComments: function () {
    // console.log('_openComments, what is this: ', this);
    AppActions.loadComments(this.props.data.id);
    AppActions.toggleRequestCommentDisplay(this.props.data.id);
  },

  // click, this needs to change the store so a re-render happens (unclicked is not being reset for some reason)
  _likeOrUnlike: function() {
    if (this.state.unclicked === true) {
      // increment
      AppActions.likePhoto(this.props.data.id, currUserId);
      // needs to affect likelog
    } else {
      // decrement
      AppActions.unlikePhoto(this.props.data.id, currUserId);
    }
  },

  // change callbacks
  _onLikeOrUnlike: function() {
    if (this.isMounted()){
      this.setState({unclicked: checkLiked(this.props.data.id)});
      this.setState({likes: getPhotoLikes(this.props.data.id)});
    }
  },

  _onChange: function () {
    if (this.isMounted()) { 
      this.setState(getPhotoComments(this.props.data.id));
      this.setState(getToggleState(this.props.data.id)); 
      this.setState({numComments: getNumComments(this.props.data.id)});
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
    this.setState({unclicked: checkLiked(this.props.data.id)});

    AppActions.getPhotoLikes(currUserId, RequestStore.getPhotos());
  },
  
  componentDidMount: function() {
    AuthStore.addChangeListener(this._onLog);
    RequestStore.addChangeListener(this._onChange);
    RequestStore.addChangeListener(this._onLikeOrUnlike);

    AppActions.getPhotoLikes(currUserId, RequestStore.getPhotos());
    AppActions.loadComments(this.props.data.id);

    // if (this.state.showModal){
    //   AppActions.toggleRequestPhotoModal(this.props.data.id);
    // }
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onLog);
    RequestStore.removeChangeListener(this._onChange);
    RequestStore.removeChangeListener(this._onLikeOrUnlike);
  },

  render: function(){

    var commentsList = [];
    for (var i = 0; i < this.state.photoComments.length; i++) {
      commentsList.push(<PhotoComment key={i} data={this.state.photoComments[i]} />);
    }

    var loggedInSign = this.state.loggedIn ? <MakeComment data={this.props.data}/> : <span><Auth/> to comment</span>;
    commentsList.push(loggedInSign);
    comments = (
      <div>
        <span className="comment-slider" onClick={this._openComments}> {this.state.numComments} Comments</span>
        <ul>
          { this.state.showCommentEntry ? {commentsList} : null}
        </ul>
      </div>
    );
    heart = (
      <div className = {this.state.unclicked ? 'glyphicon glyphicon-heart unclicked' : 'glyphicon glyphicon-heart'} onClick={this._likeOrUnlike}></div>
    );
    likes = (
      <div className='likes'>
        <span className='likes-count'> {this.state.likes} likes </span>
        {this.state.loggedIn ? {heart} : null}
      </div>
    );

    return (
      <li className='photo'>

        {/* Modal, only shows when showModal is true, dialogClassName is the CSS class */}
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          {/* Modal.Header has a closeButton prop (x in the top right) */}
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: <Link className='user-link' to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='request-photo-modal' src={process.env.PHOTOS_HOST + this.props.data.filename} />
          </Modal.Body>
          {/* Modal.Footer includes the comments */}
          <Modal.Footer>
            <span className='modal-description'>{this.props.data.description}</span>
            <a href={process.env.PHOTOS_HOST + this.props.data.filename} target='_blank'>Full image</a>
            {likes}
            {comments}
          </Modal.Footer>
        </Modal>

        <div className='request-photo'>
          <img onClick={this.open} className='request-photo' src={process.env.PHOTOS_THUMBHOST + this.props.data.filename} />
        </div>
        <span className="description">{this.props.data.description}</span>
        <span className='photo-username'>Submitted by: <Link to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></span>
        {likes}
        {comments}
      </li>
    );
  }
});

module.exports = Photo;