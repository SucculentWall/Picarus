var React = require('react');
var AppActions = require('../../actions/app-actions');
var RequestStore = require('../../stores/app-requestStore');
var RequestHeader = require('./request-header');
var Photo = require('./request-photo');
var Auth = require('../app-auth');
var PhotoUpload = require('./request-photoUpload');
var AuthStore = require('../../stores/app-authStore');
var classNames = require('classnames');

var currUserId = AuthStore.getId() || 0;

var getData = function(){
  return {
    id: RequestStore.getId(),
    photos: RequestStore.getPhotos(),
    user_id: RequestStore.getUserId(),
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
      user_id: '',
      username: '',
      tags: [],
      text: '',
      loggedIn: AuthStore.loggedIn(),
      page: 0
    };
  },

  statics: {
    willTransitionTo: function(transition, params, element) {
      AppActions.pickRequest(params.requestId);
      var currUserId = AuthStore.getId() || 0;
    }
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  _onChange: function () {
    this.setState(getData());
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onLog);
    RequestStore.addChangeListener(this._onChange);
    AppActions.pickRequest(this.props.params.requestId);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onLog);
    RequestStore.removeChangeListener(this._onChange);
  },

  _pageTurn: function(i) {
    this.setState({page : i});
  },
  
  render: function(){
    
    var photosList = [];
    var photos = this.state.photos;
    for (var i=0; i<photos.length; i++) {
      photosList.push(<Photo key={i} data={photos[i]} />);
    }
    var total = photosList.length;
    var photoPages = Math.ceil(total/8);
    var photoButtons = [];
    var photoPageClasses;
    for (i = photoPages-1; i >=0; i--) {
      photoPageClasses = classNames('req-page-button', {'active': this.state.page === i});
      photoButtons.push((<li className={photoPageClasses} onClick={this._pageTurn.bind(this, i)} key={i}>{i+1}</li> ));
    }
    return (
      <div className = 'request col-md-8 container'>
        <RequestHeader data={this.state} />
        <div className='page-list col-xs-12'>
          <ul className="page-button-ul">
            { total > 8 ? photoButtons : null }
          </ul>
          <span className='req-page-display'> Displaying { total ? this.state.page*8+1 : 0 } - {Math.min(this.state.page*8+8, total)} of {total} results </span>
        </div>
        <ul>
          {photosList.splice(this.state.page*8,(this.state.page*8)+8)}
        </ul>
        { this.state.loggedIn ? <PhotoUpload data={this.state} /> : <span><Auth text='to upload photos'/></span> }
      </div>
    );
  }
});

module.exports = SelectedRequest;
