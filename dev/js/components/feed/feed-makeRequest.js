var React = require("react");
var AppActions = require("../../actions/app-actions");

var MakeRequest = React.createClass({
  _onSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;
    AppActions.addRequest(text, 'BOB'); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function(){
    return (
      <form className="req-form" onSubmit={this._onSubmit}>
        <input ref="text" id="req-text" type="text" placeholder="Make a request" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;