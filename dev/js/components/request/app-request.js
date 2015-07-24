var React = require('react');
var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var RequestHeader = require('./request-header');
var Photo = require('./request-photo');
var Auth = require('../app-auth');
var PhotoUpload = require('./request-photoUpload');
var AuthStore = require('../../stores/app-authStore');

var currUserId = AuthStore.getId() || 0;

var getData = function(){
  return {
    id: RequestStore.getId(),
    photos: RequestStore.getPhotos(),
    user_id: RequestStore.getUserId(),
    username: RequestStore.getUsername(),
    tags: RequestStore.getTags(), // [{tagname: 'dogs'}, {}, {} ]
    text: RequestStore.getText()
  };
};

var SelectedRequest = React.createClass({
  getInitialState: function(){
    return {
      id: '',
      photos: [],
      user_id: '',
      username: '',
      tags: [],
      text: '',
      loggedIn: AuthStore.loggedIn()
    };
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.pickRequest(params.requestId);
      var currUserId = AuthStore.getId() || 0;
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  _onChange: function () {
    this.setState(getData());
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onLog);
    RequestStore.addChangeListener(this._onChange);
    AppActions.pickRequest(this.props.params.requestId);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onLog);
    RequestStore.removeChangeListener(this._onChange);
  },
  
  render: function(){
    var photosList = [];
    var photos = this.state.photos;
    for (var i=0; i<photos.length; i++) {
      photosList.push(<Photo key={i} data={photos[i]} />);
    }
    return (
      <div className = 'request col-xs-8 container'>
        <RequestHeader data={this.state} />
        <ul>
          {photosList}
        </ul>
        { this.state.loggedIn ? <PhotoUpload data={this.state} /> : <span><Auth/> to upload photos</span> }
      </div>
    );
  }
});

module.exports = SelectedRequest;
