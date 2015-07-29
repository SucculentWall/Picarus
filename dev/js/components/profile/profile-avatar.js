var React = require('react');

var Modal = require('react-bootstrap').Modal;
var AppActions = require('../../actions/app-actions');

var ProfileAvatar = React.createClass({
  getInitialState: function(){
    return { 
      photo: null,
      showModal: false,
      preview: null,
    };
  },

  close: function (){
    this.setState({ showModal: false });
  },

  open: function (){
    // only open avatar change modal if the user is authenticated
    if (this.props.data.user_id === this.props.data.authId) {
     this.setState({ showModal: true });
    }
  },

  _handleFile: function(e){
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      preview = <div class='preview'><p>Preview:</p><img id='preview' src={e.target.result}/></div>;
      self.setState({preview: true});
    };

    reader.readAsDataURL(e.target.files[0]);

    // select the event target (the selected image file)
    var file = e.target.files[0];
    var size = e.target.files[0].size;
    
    // save to state
    this.setState({
      photo: file,
      size: size
    });
  },

  _onSubmit: function(e){
    e.preventDefault();
    // photo from state
    var photo = this.state.photo;
    // user_id from data passed down
    var user_id = this.props.data.user_id;
    // size
    var size = this.state.size;
    // action
    AppActions.addAvatar(photo, user_id, size);
    // clear file value
    React.findDOMNode(this.refs.file).value = null;
    this.setState({preview : null, showModal: false});
  },



  render: function(){
    var self = function (data) {
      return (
        <div>
          <Modal show={data.state.showModal} onHide={data.close}>
            <Modal.Header closeButton>
              <Modal.Title modalClassName='modal-title'>Change Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <form className='avatar-form' onSubmit={data._onSubmit} encType='multipart/form-data'>
                {data.state.preview ? preview :null}
                <input ref='file' type='file' onChange={data._handleFile} required />
                <input type='submit' value='Change Avatar' />
              </form>
            </Modal.Footer>
          </Modal>
          { data.props.data.avatar === null ? null : <img className='avatar' onClick={data.open} src={process.env.PHOTOS_THUMBHOST+data.props.data.avatar}/>}
          <p>Click avatar to change</p>
        </div>
        );
    };
    var other = (
      <div>
        { this.props.data.avatar === null ? null : <img className='avatar' src={process.env.PHOTOS_THUMBHOST+this.props.data.avatar}/>}
      </div>
    );
    return (
      <div>
      {this.props.data.user_id !== this.props.data.authId ? other : self(this) }
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title modalClassName='modal-title'>Change Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <form className='avatar-form' onSubmit={this._onSubmit} encType='multipart/form-data'>
              {this.state.preview ? preview :null}
              <input ref='file' type='file' onChange={this._handleFile} required />
              <input type='submit' value='Change Avatar' />
            </form>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = ProfileAvatar;