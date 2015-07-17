var React = require('react');
var GalleryStore = require('../../stores/app-galleryStore');
var RequestStore = require('../../stores/app-requestStore');
var Modal = require('react-bootstrap').Modal;
var Link = require('react-router').Link;

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id)};
};


var ProfileComment = React.createClass({
  getInitialState: function () {
    var photo_id = this.props.data.photo_id;
    return {
      photo: GalleryStore.getPhoto(photo_id),
      showModal: false
      // photoComments: RequestStore.getComment(photo_id),
    };
  },
  
  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    this.setState({ showModal: true });
  },

  render: function(){
    if (!this.props.data) return (<div></div>);
    else  {
      var formattedDate = new Date(this.props.data.created_at).toLocaleString();
      // {comments}

      // using Modal gives context Mixin errors

      // <Modal show={this.state.showModal} onHide={this.close} dialogClassName='modalcontent'>
      //   <Modal.Header closeButton>
      //     <Modal.Title modalClassName='modal-title'>See <Link to={'/requests/' + this.state.photo.request_id}>Request</Link></Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <img className = 'requestphoto' src={'/photos/' + this.state.photo.filename} />
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <a href={'/photos/' + this.state.photo.filename} target='_blank'>Full image</a>
      //   </Modal.Footer>
      // </Modal>
      return (
        <div>
          {formattedDate}  <Link to={'/requests/' + this.state.photo.request_id} className="comment recent">{this.props.data.text}</Link>
        </div>
      );
    }
  }
});

module.exports = ProfileComment;