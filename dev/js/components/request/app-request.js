var React = require("react");
var RequestStore = require("../../stores/app-requestStore");
var RequestHeader = require("./request-header");
var Photo = require("./request-photo");
var PhotoUpload = require("./request-photoUpload");

var getCommentsAndPhotos = function(){
  return {
    comments: RequestStore.getAllComments(),
    photos: RequestStore.getAllPhotos()
  };
};

var Request = React.createClass({
  getInitialState: function(){
    return getCommentsAndPhotos();
  },
  _onChange: function () {
    console.log('change triggered');
    this.setState(getCommentsAndPhotos);
  },

  componentDidMount: function() {
    console.log('mounted');
    RequestStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var photosList = [];
    var photos = this.state.photos;
    for (var key in photos) {
      photosList.push(<Photo data={photos[key]} />);
    }
    return (
      <div className = "request">
        <RequestHeader />
        <ul>
          {photosList}
        </ul>
        <PhotoUpload />
      </div>
    );
  }
});

module.exports = Request;