var React = require('react');
var AppActions = require('../../actions/app-actions');

var PhotoUpload = React.createClass({
  getInitialState: function() {
    return { photo: null };
  },
  _onSubmit: function(e){
    e.preventDefault();
    // username from ref in form
    var username = this.refs.username.props.value;
    // request_id from data passed down from app-request
    var request_id = this.props.data.id;
    // photo from state
    var photo = this.state.photo;
    // action
    AppActions.addPhoto(photo, username, request_id);
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
    // TODO: validation and view refresh
    return (
      <form onSubmit={this._onSubmit} enctype="multipart/form-data">
        <input ref="username" id="req-text" type="text" placeholder="BOB" />
        <input ref="file" id="req-text" type="file" onChange={this._handleFile} />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;