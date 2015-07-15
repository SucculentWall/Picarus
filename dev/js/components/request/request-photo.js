var React = require('react');
var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var PhotoComment = require('./request-photoComment');
var MakeComment = require('./request-makeComment');
var AuthStore = require('../../stores/app-authStore');
// require specific react-bootstrap component
var Modal = require('react-bootstrap').Modal;

var photoComments;

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id)};
};

var Photo = React.createClass({
  
  getInitialState: function(){
    var stateObj = getPhotoComments(this.props.data.id);
    stateObj.loggedIn = AuthStore.loggedIn();
    stateObj.showCommentEntry = false;
    stateObj.showModal = false;
    return stateObj;
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    this.setState({ showModal: true });
  },

  _onClick: function () {
    console.log('_onClick, what is this: ', this);
    AppActions.loadComments(this.props.data.id);
    this.setState({showCommentEntry: !this.state.showCommentEntry});
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
      <li className='photo'>

        {/* Modal, only shows when showModal is true, dialogClassName is the CSS class */}
        <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
          {/* Modal.Header has a closeButton prop (x in the top right) */}
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Submitted by: {this.props.data.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className = 'requestphoto' src={'/photos/' + this.props.data.filename} />
          </Modal.Body>
          {/* Modal.Footer includes the comments */}
          <Modal.Footer>
            <a href={'/photos/' + this.props.data.filename} target='_blank'>Full image</a>
            {comments}
          </Modal.Footer>
        </Modal>

        <span className = 'photo-username'>Submitted by: {this.props.data.username}</span>
        <div>
          <img onClick={this.open} className='requestphoto' src={'/photos/' + this.props.data.filename} />
        </div>
        {comments}
      </li>
    );
  }
});

module.exports = Photo;