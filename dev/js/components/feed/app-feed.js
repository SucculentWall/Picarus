var React = require("react");
var Request = require("./feed-request");
var MakeRequest = require("./feed-makeRequest");
var FeedStore = require("../../stores/app-feedStore");

// dummy data, change when server hooked
var photoRequests = [
  {
    description: "JP's bike",
    tags: ["bicycle", "handsome asian"],
    location: "san francisco"
  },
  {
    description: "Albert sleeping",
    tags: ['whiteboarding', 'handsome asian'],
    location: 'san francisco'
  }
];

var getPhotoRequests = function(){
  return {photoRequests: FeedStore.getAllRequests()};
};

var Feed = React.createClass({
  getInitialState: function(){
    return getPhotoRequests();
  },
  _onChange: function () {
    console.log('change triggered');
    this.setState(getPhotoRequests());
  },

  componentDidMount: function() {
    console.log('mounted');
    FeedStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
  },
  render: function(){
    photoRequests = [];
    var reqs = this.state.photoRequests;
    for (var key in reqs) {
      photoRequests.push(<Request data={reqs[key]} />);
    }
    return (
      <div className = "feed">
        <MakeRequest />
        <ul>
          {photoRequests}
        </ul>
      </div>
    );
  }
});

module.exports = Feed;