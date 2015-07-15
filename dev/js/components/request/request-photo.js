var React = require('react');
var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var PhotoComment = require('./request-photoComment');
var MakeComment = require('./request-makeComment');
// require specific react-bootstrap component
var Modal = require('react-bootstrap').Modal;
var photoComments, comments;

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id)};
};

var Photo = React.createClass({
  
  getInitialState: function(){
    return {
      photoComments: getPhotoComments(this.props.data.id).photoComments,
      showModal: false
    };
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
  },

  _onChange: function () {
    console.log('change triggered on photo');
    this.setState(getPhotoComments(this.props.data.id));
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this._onChange);
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
          {photoComments}
        </ul>
        <MakeComment data={this.props.data}/>
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