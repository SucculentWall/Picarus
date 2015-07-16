var React = require('react');
var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var PhotoComment = require('./request-photoComment');
var MakeComment = require('./request-makeComment');
var Auth = require('../app-auth');
var AuthStore = require('../../stores/app-authStore');
// require specific react-bootstrap component
var Modal = require('react-bootstrap').Modal;

var photoComments;
var currUserId = AuthStore.getId();

var getPhotoComments = function(id){
  // also needs a property for likes
  // console.log("likes: ", this.props.data, this.props.data.likes);
  return {photoComments: RequestStore.getComment(id)};
};

var Photo = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = false;
    stateObj.showModal = false;
    // hold likes as well
    stateObj.likes = this.props.data.likes;
    // hold 'unlicked' className to toggle on click
    stateObj.unclicked = true;
    return stateObj;
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    this.setState({ showModal: true });
  },

  _openComments: function () {
    console.log('_openComments, what is this: ', this);
    AppActions.loadComments(this.props.data.id);
    this.setState({showCommentEntry: !this.state.showCommentEntry});
  },

  _likeOrUnlike: function() {
    this.setState({unclicked: !this.state.unclicked});
  },

  _onChange: function () {
    console.log('change triggered on photo');
    if (this.isMounted()) { this.setState(getPhotoComments(this.props.data.id)); }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onLog);
  },

  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },

  render: function(){

    photoComments = [];
    for (var key in this.state.photoComments) {
      photoComments.push(<PhotoComment key={key} data={this.state.photoComments[key]} />);
    }
    var loggedInSign = this.state.loggedIn ? <MakeComment data={this.props.data}/> : <span><Auth/> to comment</span>;
    photoComments.push(loggedInSign);
    comments = (
      <div>
        <span className="comment-slider" onClick={this._openComments}>Comments</span>
        <ul>
          { this.state.showCommentEntry ? {photoComments} : null}
        </ul>
      </div>
    );
    return (
      <li className='photo'>

        {/* Modal, only shows when showModal is true, dialogClassName is the CSS class */}
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          {/* Modal.Header has a closeButton prop (x in the top right) */}
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: {this.props.data.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='request-photo' src={'/photos/' + this.props.data.filename} />
          </Modal.Body>
          {/* Modal.Footer includes the comments */}
          <Modal.Footer>
            <span className='modal-description'>{this.props.data.description}</span>
            <a href={'/photos/' + this.props.data.filename} target='_blank'>Full image</a>
            <div className='likes'>
              <span> {this.state.likes} likes </span>
              <div className='glyphicon glyphicon-heart unclicked'></div>
            </div>
            {comments}
          </Modal.Footer>
        </Modal>

        <div className='request-photo'>
          <img onClick={this.open} className='request-photo' src={'/photos/' + this.props.data.filename} />
        </div>
        <span className="description">{this.props.data.description}</span>
        <span className='photo-username'>Submitted by: {this.props.data.username}</span>
        {/* can change color with CSS */}
        <div className='likes'>
          <span> {this.state.likes} likes </span>
          <div className = {this.state.unclicked ? 'glyphicon glyphicon-heart unclicked' : 'glyphicon glyphicon-heart'} onClick={this._likeOrUnlike}></div>
        </div>
        {comments}
      </li>
    );
  }
});

module.exports = Photo;