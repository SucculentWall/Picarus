var React = require('react');
var AppActions = require('../../actions/app-actions');
var AuthStore = require("../../stores/app-authStore");
var preview = null;

var PhotoUpload = React.createClass({
  getInitialState: function() {
    return { photo: null };
  },
  _onSubmit: function(e){
    e.preventDefault();
    //Username from AuthStore
    var username = AuthStore.getUsername();
    // request_id from data passed down from app-request
    var request_id = this.props.data.id;
    // photo from state
    var photo = this.state.photo;
    // tags from data passed down from app-request
    var tags = this.props.data.tags.map(function(tagObj){
      return tagObj.tagname;
    });
    
    var description = React.findDOMNode(this.refs.file).value;


    // action
    AppActions.addPhoto(photo, username, request_id, tags, description);
    // clear file value
    React.findDOMNode(this.refs.file).value = null;
    React.findDOMNode(this.refs.description).value = null;
    this.setState({preview : false});
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
    // BOB is the placeholder in the username for now, but any valid username can be submitted
    return (
      <form onSubmit={this._onSubmit} encType="multipart/form-data">
        {this.state.preview ? preview :null}
        <input ref="file" type="file" onChange={this._handleFile} required />
        <input className="photo-description" ref="description" type="text" placeholder="write a short description" required />
        <input className="submission" type="submit" value="Submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;