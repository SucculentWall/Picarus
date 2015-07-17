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
  var ProfileInfo = UserStore.getProfileInfo();
  return {
    FacebookId: ProfileInfo.FacebookId,
    joinDate: ProfileInfo.created_at,
    user_id: ProfileInfo.id,
    karma: ProfileInfo.karma,
    photos: ProfileInfo.photos,
    comments: ProfileInfo.comments,
    requests: ProfileInfo.requests,
    username: ProfileInfo.username
  };
};

var Profile = React.createClass({
  getInitialState: function(){
    return {
      FacebookId: '',
      joinDate: '',
      user_id: '',
      karma: 0,
      photos:[],
      comments:[],
      requests: [],
      username: ''
    };
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.getProfileInfo(params.user_id);
    }
  },

  // _onLog: function () {
  //   this.setState({loggedIn: AuthStore.loggedIn()});
  // },

  _onChange: function () {
    this.setState(getData());
  },
  // componentDidUpdate: function(){
  //   console.log('did componentDidUpdate');
  // },
  // componentWillUpdate: function(){
  //   console.log('will componentWillUpdate');
  //   AppActions.pickRequest(this.props.params.requestId);
  //   RequestStore.removeChangeListener(this._onChange);
  // },
  componentDidMount: function() {
    var user_id = this.props.params.user_id;
    AppActions.getProfileInfo(user_id);
    UserStore.addChangeListener(this._onChange);
    // AppActions.pickRequest(this.props.params.requestId);
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  //   AuthStore.removeChangeListener(this._onLog);
  },
  render: function () {
      // FB.api('/me', 
      // {
        // fields: 'id,name,picture'
      // } 
      // ,function (response) {
      //   console.log(response);
        // FB.api({
        //     method: 'fql.query',
        //     query: 'SELECT pid, src_big, src_big_height, src_big_width FROM photo WHERE aid IN ( SELECT aid FROM album WHERE owner="' + response.id + '" AND name = "Profile Pictures")'
        //   },
        //   function (data) {
        //     console.log(data);
        //   }
        // );

      // });
    var i;
    var profilePhotos = [];
    for (i = 0; i < this.state.photos.length; i++) {
      profilePhotos.push(<ProfilePhoto count={i} data={this.state.photos[i]} />);
    }
    var profileRequests = [];
    for (i = this.state.requests.length; i >= this.state.requests.length-5; i--) {
      profileRequests.push(<ProfileRequest data={this.state.requests[i]} />);
    }

    var profileComments = [];
    for (i = this.state.comments.length; i >= this.state.comments.length-5; i--) {
      profileComments.push(<ProfileComment data={this.state.comments[i]} />);
    }


    // var photosList = [];
    // var photos = this.state.photos;
    // for (var i=0; i<photos.length; i++) {
    //   photosList.push(<Photo key={i} data={photos[i]} />);
    // }
    return (
      <div className = 'request col-xs-8 container'>
        <ProfileHeader data={this.state} />
        <ProfileAvatar />
        <p>Karma: {this.state.karma}</p>
        <div>
          <h2>Recent Requests</h2>
          {profileRequests}
        </div>
        <div>
          <h2>Recent Comments</h2>
          {profileComments}
        </div>
        <div>
          <h2>Uploaded Photos</h2>
          {profilePhotos}
        </div>
      </div>
    );
  }
});

module.exports = Profile;