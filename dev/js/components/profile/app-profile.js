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
    UserStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onLog);
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },
  render: function () {
    var valid = function (data) {
      var i, j;
      var profileRequests = [];
      var profileComments = [];
      var profilePhotos = [];
      for (i = 0; i < 5; i++) {
        profileRequests.push(<ProfileRequest key={i} data={data.requests[i]} />);
        profileComments.push(<ProfileComment key={i} data={data.comments[i]} />);
      }
      for (i = 0; i < data.photos.length; i++) {
        profilePhotos.push(<ProfilePhoto key={i} count={i} data={data.photos[i]} />);
      }
      return (
        <div>
          <ProfileHeader data={data} />
          <ProfileAvatar data={data} />
          <h2 className='prof-cat'>Karma: {data.karma}</h2>
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
    };

    return (
      <div className = 'request col-md-8 container'>
        { this.state.user_id ? valid(this.state) : null }
      </div>
      );
  }
});

module.exports = Profile;