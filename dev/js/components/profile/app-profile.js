var React = require('react');
var AppActions = require('../../actions/app-actions');
var AuthStore = require('../../stores/app-authStore');
var UserStore = require('../../stores/app-userStore');
var ProfileHeader = require('./profile-header');
var ProfileAvatar = require('./profile-avatar');
var ProfileRequest = require('./profile-request');
var ProfileComment = require('./profile-comment');
var ProfilePhoto = require('./profile-photo');
var Auth = require('../app-auth');

var getData = function(){
  return {
    authId: AuthStore.getId(),
    user_id: UserStore.getUserId(),
    FacebookId: UserStore.getFacebookId(),
    username: UserStore.getUsername(),
    joinDate: UserStore.getJoinDate(),
    karma: UserStore.getUserKarma(),
    requests: UserStore.getRecentUserRequests(5),
    comments: UserStore.getRecentUserComments(5),
    photos: UserStore.getUserPhotos(),
    avatar: UserStore.getAvatar()
  };
};

var Profile = React.createClass({
  getInitialState: function(){
    return {
      authId: '',
      user_id: '',
      FacebookId: '',
      username: '',
      joinDate: '',
      karma: 0,
      requests: [],
      comments:[],
      photos:[],
      avatar: null
    };
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.getProfileInfo(params.user_id);
    }
  },

  _onLog: function () {
    this.setState({authId: AuthStore.getId()});
  },

  _onChange: function () {
    this.setState(getData());
  },

  componentDidMount: function() {
    var user_id = this.props.params.user_id;
    AppActions.getProfileInfo(user_id);
    AuthStore.addChangeListener(this._onLog);
    UserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },
  render: function () {
    if (!this.state.user_id) return (<div className = 'request col-xs-8 container'>User does not exist!</div>);
    var i, j;
    var profileRequests = [];
    var profileComments = [];
    var profilePhotos = [];
    if (this.state.requests && this.state.comments && this.state.photos) {
      for (i = 0; i < this.state.requests.length; i++) {
        profileRequests.push(<ProfileRequest key={i} data={this.state.requests[i]} />);
      }
      for (i = 0; i < this.state.comments.length; i++) {
        profileComments.push(<ProfileComment key={i} data={this.state.comments[i]} />);
      }
      for (i = 0; i < this.state.photos.length; i++) {
        profilePhotos.push(<ProfilePhoto key={i} count={i} data={this.state.photos[i]} />);
      }
    }

    return (
      <div className = 'request col-xs-8 container'>
        <ProfileHeader data={this.state} />
        <ProfileAvatar data={this.state} />
        <h2 className='prof-cat'>Karma: {this.state.karma}</h2>
        <div>
          <h2 className='prof-cat'>Recent Requests: </h2>
            {profileRequests}
        </div>
        <div>
          <h2 className='prof-cat'>Recent Comments: </h2>
            {profileComments}
        </div>
        <div>
          <h2 className='prof-cat'>Uploaded Photos: </h2>
            {profilePhotos}
        </div>
      </div>
    );
  }
});

module.exports = Profile;