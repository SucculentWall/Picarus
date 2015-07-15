var React = require("react");
var AppActions = require('../../actions/app-actions');
var RequestStore = require("../../stores/app-requestStore");
var PhotoComment = require("./request-photoComment");
var MakeComment = require("./request-makeComment");

var photoComments;

var getPhotoComments = function(id){
  return {photoComments: RequestStore.getComment(id)};
};

var Photo = React.createClass({
  
  getInitialState: function(){
    return getPhotoComments(this.props.data.id);
  },

  _onClick: function () {
    console.log('_onClick, what is this: ', this);
    AppActions.loadComments(this.props.data.id);
  },

  _onChange: function () {
    console.log('change triggered on photo');
    this.setState(getPhotoComments(this.props.data.id));
  },

  componentDidMount: function() {
    RequestStore.addChangeListener(this._onChange);
  },

  render: function(){
    photoComments = [];
    for (var key in this.state.photoComments) {
      photoComments.push(<PhotoComment key={key} data={this.state.photoComments[key]} />);
    }
    return (
      <li className="photo">
        <span className = "photo-username">Submitted by: {this.props.data.username}</span>
        <a href={'/photos/' + this.props.data.filename} target="_blank"><img className = "requestphoto" src={'/photos/' + this.props.data.filename} /></a>
        <p onClick={this._onClick}>Comments</p>
        <ul>
          {photoComments}
        </ul>
        <MakeComment data={this.props.data}/>
      </li>
    );
  }
});

module.exports = Photo;