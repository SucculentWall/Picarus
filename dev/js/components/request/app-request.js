var React = require("react");
var AppActions = require("../../actions/app-actions");
var RequestStore = require("../../stores/app-requestStore");
var RequestHeader = require("./request-header");
var Photo = require("./request-photo");
var PhotoUpload = require("./request-photoUpload");

var getData = function(){
  return {
    id: RequestStore.getId(),
    photos: RequestStore.getPhotos(),
    username: RequestStore.getUsername(),
    tags: RequestStore.getTags(), // [{tagname: 'dogs'}, {}, {} ]
    text: RequestStore.getText()
  };
};

var Request = React.createClass({
  getInitialState: function(){
    return {
      id: '',
      photos: [],
      username: '',
      tags: [],
      text: ''
    };
  },

  _onChange: function () {
    console.log('change triggered');
    this.setState(getData());
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
    for (var i=0; i<photos.length; i++) {
      photosList.push(<Photo key={i} data={photos[i]} />);
    }
    return (
      <div className = "request col-xs-6">
        <RequestHeader data={this.state} />
        <ul>
          {photosList}
        </ul>
        <PhotoUpload data={this.state} />
      </div>
    );
  }
});

module.exports = Request;