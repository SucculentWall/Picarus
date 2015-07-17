var React = require("react");
var AppActions = require("../../actions/app-actions");
var RequestStore = require("../../stores/app-requestStore");
var RequestHeader = require("./request-header");
var Photo = require("./request-photo");
var Auth = require("../app-auth");
var PhotoUpload = require("./request-photoUpload");
var AuthStore = require("../../stores/app-authStore");


var getData = function(){
  return {
    id: RequestStore.getId(),
    photos: RequestStore.getPhotos(),
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
      username: '',
      tags: [],
      text: '',
      loggedIn: AuthStore.loggedIn()
    };
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.pickRequest(params.requestId);
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

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
    RequestStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onLog);
    AppActions.pickRequest(this.props.params.requestId);
  },
  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },
  render: function(){
    var photosList = [];
    var photos = this.state.photos;
    for (var i=0; i<photos.length; i++) {
      photosList.push(<Photo key={i} data={photos[i]} />);
    }
    console.log('photos received from Request Store: ', photos);
    return (
      <div className = "request col-xs-8 container">
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
