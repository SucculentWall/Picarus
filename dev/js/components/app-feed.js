var React = require('react');

// dummy data, change when server hooked
var photoRequests = [
  {
    description: "JP's bike",
    tags: ['bicycle', 'handsome asian'],
    location: 'san francisco'
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
      return (
        <li>
          <span>{request.description}</span>
          <span>{request.tags}</span>
          <span>{request.location}</span>
        </li>
      )
    });
    return (
      <div>
        <ul>
          {photoRequests}
        </ul>
      </div>
    );
  }
});

module.exports = Feed;