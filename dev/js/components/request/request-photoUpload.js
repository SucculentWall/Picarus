var React = require('react');
var AppActions = require('../../actions/app-actions');
var axios = require('axios');

var PhotoUpload = React.createClass({
  getInitialState: function() {
    return { photo: null };
  },
  _onSubmit: function(e){
    e.preventDefault();
    var username = this.refs.username.props.value;
    var request_id = this.props.data.id;
    var photo = this.state.photo;
    AppActions.addPhoto(photo, username, request_id);
  },
  handleFile: function(e){
    // select the event target (the selected image file)
    var file = e.target.files[0];
    this.setState({
      photo: file
    });
  },
  render: function(){
    return (
      <form onSubmit={this._onSubmit} enctype="multipart/form-data">
        <input ref="username" id="req-text" type="text" placeholder="BOB" />
        <input ref="file" id="req-text" type="file" onChange={this.handleFile} />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;