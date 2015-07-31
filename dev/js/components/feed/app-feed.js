var React = require("react");
var AppActions = require("../../actions/app-actions");
var Request = require("./feed-request");
var MakeRequest = require("./feed-makeRequest");
var FeedStore = require("../../stores/app-feedStore");
var AuthStore = require("../../stores/app-authStore");
var Auth = require("../app-auth");

var photoRequests;

var getPhotoRequests = function(){
  return {photoRequests: FeedStore.getAllRequests()};
};

var Feed = React.createClass({
  getInitialState: function(){
    var obj = getPhotoRequests();
    obj.loggedIn = AuthStore.loggedIn();
    obj.count = 20;
    return obj;
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.getAllRequests();
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  _onChange: function () {
    this.setState(getPhotoRequests());
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onLog);
    AppActions.getAllRequests();
  },
  
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },

  loadMore: function() {
    this.setState({count: this.state.count+20});
  },
  
  render: function(){
    photoRequests = [];
    var reqs = this.state.photoRequests;
    for (var i = reqs.length-1; i >= 0; i--) {
        photoRequests.push(<Request ref={reqs[i].id} key={reqs[i].id} data={reqs[i]} />);
    }
    return (
      <div className = "feed col-md-4">
        <div className="request-title"><h2>Picture Requests</h2></div>
        { this.state.loggedIn ? <MakeRequest /> : <span><Auth /> to make a Request</span> }
        <div className="recent-requests"> Recent Requests </div>
        <div className='feed-list'>
          <ul>
            {photoRequests.slice(0,this.state.count)}
          </ul>
          {this.state.count < photoRequests.length ? <button onClick={this.loadMore}> Load more requests </button> : <div> Displaying all requests </div>}
        </div>
      </div>
    );
  }

});

module.exports = Feed;