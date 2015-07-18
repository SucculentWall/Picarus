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

var getToggleState = function(id){
  // console.log('getToggleState getting from request store: ', RequestStore.getDisplayToggle(id) );
  return { // {showCommentEntry: , showModal: }
    showCommentEntry : RequestStore.getDisplayToggle(id).showCommentEntry || false,
    showModal : RequestStore.getDisplayToggle(id).showModal || false
  };
};

var getPhotoLikes = function(id){
  // console.log('currently has this many likes: ', RequestStore.getLikes(id));
  return RequestStore.getLikes(id);
};

var checkLiked = function(id){
  // return bool based on whether there is entry in join table
  // console.log('click status: ',RequestStore.getPhotoLikeStatus(currUserId, id));
  return RequestStore.getPhotoLikeStatus(currUserId, id);
};

var Photo = React.createClass({
  
  getInitialState: function(){
    //AppActions.getPhotoLikes();
    var stateObj = getPhotoComments(this.props.data.id);

    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = getToggleState(this.props.data.id).showCommentEntry;
    stateObj.showModal = getToggleState(this.props.data.id).showModal;
    stateObj.likes = getPhotoLikes(this.props.data.id);
    // hold 'unlicked' className to toggle on click
    // console.log('checking....: ',checkLiked(this.props.data.id));
    stateObj.unclicked = checkLiked(this.props.data.id); // NOTE: this needs to be based on db truth (has this user liked this photo) join table time 
    return stateObj;
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.getPhotoLikes();
      // console.log('firing');
    }
  },

  close: function (){
    AppActions.toggleRequestPhotoModal(this.props.data.id);
    // this.setState({ showModal: false });
  },

  open: function (){
    AppActions.toggleRequestPhotoModal(this.props.data.id);
    // this.setState({ showModal: true });
  },

  _openComments: function () {
    // console.log('_openComments, what is this: ', this);
    AppActions.loadComments(this.props.data.id);
    AppActions.toggleCommentDisplay(this.props.data.id);
  },

  // click
  _likeOrUnlike: function() {
    // console.log('current state! : ', this.state.unclicked)
    if (this.state.unclicked === true) {
      // increment
      AppActions.likePhoto(this.props.data.id);
    } else {
      // decrement
      AppActions.unlikePhoto(this.props.data.id);
    }
  },

  // change callbacks
  _onLikeOrUnlike: function() {
    this.setState({unclicked: checkLiked(this.props.data.id)});
    this.setState({likes: getPhotoLikes(this.props.data.id)});
  },

  _onChange: function () {
    // console.log('change triggered on photo');
    if (this.isMounted()) { 
      this.setState(getPhotoComments(this.props.data.id));
      this.setState(getToggleState(this.props.data.id)); 
    }
    // console.log('current state stuff: ', this.state);
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this._onChange);
    RequestStore.addChangeListener(this._onLikeOrUnlike);
    AuthStore.addChangeListener(this._onLog);
  },

  componentWillUnmount: function() {
    // console.log('unmounting ', this.props.data.id);
    RequestStore.removeChangeListener(this._onChange);
    RequestStore.removeChangeListener(this._onLikeOrUnlike);
    AuthStore.removeChangeListener(this._onLog);
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
        <span className="comment-slider" onClick={this._openComments}>Comments</span>
        <ul>
          { this.state.showCommentEntry ? {commentsList} : null}
        </ul>
      </div>
    );
    heart = (
      <div className = {this.state.unclicked ? 'glyphicon glyphicon-heart' : 'glyphicon glyphicon-heart unclicked'} onClick={this._likeOrUnlike}></div>
    );
    likes = (
      <div className='likes'>
        <span> {this.state.likes} likes </span>
        {this.state.loggedIn ? {heart} : null}
      </div>
    );
    console.log(this.props.data.id, ' current state stuff: ', this.state);
    return (
      <li className='photo'>

        {/* Modal, only shows when showModal is true, dialogClassName is the CSS class */}
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          {/* Modal.Header has a closeButton prop (x in the top right) */}
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: <Link to='user' params={{user_id: this.props.data.user_id}} >{this.props.data.username}</Link></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='request-photo' src={'/photos/' + this.props.data.filename} />
          </Modal.Body>
          {/* Modal.Footer includes the comments */}
          <Modal.Footer>
            <span className='modal-description'>{this.props.data.description}</span>
            <a href={'/photos/' + this.props.data.filename} target='_blank'>Full image</a>
            {likes}
            {comments}
          </Modal.Footer>
        </Modal>

        <div className='request-photo'>
          <img onClick={this.open} className='request-photo' src={'/photos/' + this.props.data.filename} />
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