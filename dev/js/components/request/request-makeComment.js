var React = require("react");
var AppActions = require("../../actions/app-actions");
var AuthStore = require("../../stores/app-authStore");

var MakeComment = React.createClass({
  _onSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;
    console.log('this.props.data: ', this.props.data);

    // grab the currently logged-in user
    var currUser = AuthStore.getUsername();
    AppActions.addComment(text, currUser, this.props.data.id); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
  },

  render: function(){
    return (
      <form className="req-form" onSubmit={this._onSubmit}>
        <input className="request-input" ref="text" type="text" placeholder="Add your comment" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeComment;
