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

  statics: {
    willTransitionTo: function(transition, params, element) {
      console.log('will transition to');
      AppActions.pickRequest(params.requestId);
    }
  },

  _onChange: function () {
    console.log('change triggered');
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
    console.log('mounted app-request');
    console.log('requesting data: ', this.props.params.requestId);
    AppActions.pickRequest(this.props.params.requestId);
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