var React = require("react");
var AppActions = require("../../actions/app-actions");

var MakeRequest = React.createClass({
  _onSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;
    var tags = React.findDOMNode(this.refs.tags).value.split(' ');
    AppActions.addRequest(text, 'BOB', tags); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
    React.findDOMNode(this.refs.tags).value = '';
  },
  render: function(){
    return (
      <form className="req-form" onSubmit={this._onSubmit}>
        <input ref="text" type="text" placeholder="Make a request" />
        <input ref="tags" type="text" placeholder="Tags(with spaces between)" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;