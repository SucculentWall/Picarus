var React = require('react');

var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var UserStore = require('../../stores/app-userStore');
var PhotoComment = require('../request/request-photoComment');
var MakeComment = require('../request/request-makeComment');
var AuthStore = require('../../stores/app-authStore');
var Modal = require('react-bootstrap').Modal;

var photoComments, comments, numTemplates;

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
  console.log('photo likes from this photo on gallery: ', galleryPhotoLikes);
  return profilePagePhotoLikes;
};

var getToggleState = function(id){
  return { // {showCommentEntry: , showModal: }
    showCommentEntry : UserStore.getDisplayToggle(id).showCommentEntry || false,
    showModal : UserStore.getDisplayToggle(id).showModal || false
  };
};

var ProfilePhoto = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = getToggleState(this.props.data.id).showCommentEntry;
    stateObj.showModal = getToggleState(this.props.data.id).showModal;
    
    return stateObj;
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    this.setState({ showModal: true });
  },

  _onClick: function () {
    AppActions.loadComments(this.props.data.id);
    this.setState({showCommentEntry: !this.state.showCommentEntry});
  },

  _onChange: function () {
    this.setState(getPhotoComments(this.props.data.id));
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
    numTemplates = photoTemplateClasses.length;
    photoComments = [];
    for (var key in this.state.photoComments) {
      photoComments.push(<PhotoComment key={key} data={this.state.photoComments[key]} />);
    }
    comments = (
      <div>
        <p onClick={this._onClick}>Comments</p>
        <ul>
          { this.state.showCommentEntry ? {photoComments} : null}
          { this.state.showCommentEntry && this.state.loggedIn ? <MakeComment data={this.props.data}/> : null }
        </ul>
      </div>
    );
    return (
      <div className='photo'>
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: {this.props.data.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className = 'requestphoto' src={'/photos/' + this.props.data.filename} />
          </Modal.Body>
          <Modal.Footer>
            <span className='modal-description'>{this.props.data.description}</span>
            <a href={'/photos/' + this.props.data.filename} target='_blank'>Full image</a>
            {comments}
          </Modal.Footer>
        </Modal>
        <div>
          <img onClick={this.open} className={'galleryphoto ' + photoTemplateClasses[this.props.count%numTemplates]} src={'/photos/small/' + this.props.data.filename} />
        </div>
      </div>
    );
  }
});

module.exports = ProfilePhoto;