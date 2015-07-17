var React = require('react');
var AuthStore = require('../../stores/app-authStore');
var Modal = require('react-bootstrap').Modal;
var preview = null;


var ProfileAvatar = React.createClass({
  getInitialState: function(){
    return { 
      photo: null,
      showModal: false
    };
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    // only open avatar change modal if the user is authenticated
    if (this.props.data.user_id === AuthStore.getId()) {
     this.setState({ showModal: true });
    }
  },

  _onSubmit: function(e){
    e.preventDefault();
    // photo from state
    var photo = this.state.photo;
  },

  _handleFile: function(e){
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      preview = <span class="preview">Preview: <img id='preview' src={e.target.result}/></span>;
      self.setState({preview: true});
    };

    reader.readAsDataURL(e.target.files[0]);

    // select the event target (the selected image file)
    var file = e.target.files[0];
    // save to state
    this.setState({
      photo: file
    });
  },

  render: function(){
    var avatarNote = (<div></div>);
    if (this.props.data && this.props.data.user_id === AuthStore.getId()) {
      var avatarNote = (<p>Click avatar to edit</p>);
    }
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Change Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this._onSubmit} encType="multipart/form-data">
              {this.state.preview ? preview :null}
              <input ref="file" type="file" onChange={this._handleFile} required />
              <input type="submit" value="Change Avatar" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <p>TODO: Upload avatar to database, image restrictions, cropping, etc</p>
          </Modal.Footer>
        </Modal>
        <img onClick={this.open} src='img/defaultAvatar.png'/>
        {avatarNote}
      </div>
    );
  }
});

module.exports = ProfileAvatar;