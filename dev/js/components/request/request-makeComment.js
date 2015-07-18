var React = require('react');
var AppActions = require('../../actions/app-actions');
var AuthStore = require('../../stores/app-authStore');

var MakeComment = React.createClass({
  _onSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;

    // grab the currently logged-in user
    var currUser = AuthStore.getUsername();
    AppActions.addComment(text, currUser, this.props.data.id, this.props.data.request_id); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
  },

  render: function(){
    return (
      <form className='req-form' onSubmit={this._onSubmit}>
        <input className='comment-input' ref='text' type='text' placeholder='Add your comment' />
        <input className='comment-submit submission' type='submit' />
      </form>
    );
  }
});

module.exports = MakeComment;
