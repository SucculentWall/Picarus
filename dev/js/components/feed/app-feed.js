var React = require("react");
var Request = require("./app-request");
var MakeRequest = require("./app-makeRequest");

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
  // TODO: retrieve photo requests from server
  // dummy data
   return {photoRequests: photoRequests}
}

var Feed = React.createClass({
  getInitialState: function(){
    return getPhotoRequests();
  },
  render: function(){
    var photoRequests = this.state.photoRequests.map(function(request){
      return <Request data={request} />
    });
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