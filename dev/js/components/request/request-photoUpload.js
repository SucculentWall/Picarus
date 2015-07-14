var React = require('react');
var AppActions = require('../../actions/app-actions');

var PhotoUpload = React.createClass({
  getInitialState: function() {
    return { photo: null };
  },
  _onSubmit: function(e){
    e.preventDefault();
    // username from ref in form
    var username = React.findDOMNode(this.refs.username).value;
    // request_id from data passed down from app-request
    var request_id = this.props.data.id;
    // photo from state
    var photo = this.state.photo;
    // tags from data passed down from app-request
    var tags = this.props.data.tags.map(function(tagObj){
      return tagObj.tagname;
    });
    // action
    AppActions.addPhoto(photo, username, request_id, tags);
    // clear file value
    React.findDOMNode(this.refs.file).value = null;
  },
  _handleFile: function(e){
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
        <input ref="username" type="text" placeholder="BOB" required />
        <input ref="file" type="file" onChange={this._handleFile} required />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;