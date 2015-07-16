var React = require("react");
var AppActions = require("../../actions/app-actions");
var AuthStore = require("../../stores/app-authStore");

var MakeRequest = React.createClass({
  _onSubmit: function (e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;

    // checks for #thisIsHashtag
    var tagRegEx = /\S*#(?:\[[^\]]+\]|\S+)/ig;
    var tags = text.match(tagRegEx); // ['#barcelona, #sunset']
    if (tags) {
      var refinedTags = tags.map(function(tag){
        // remove # from tag
        // should store tags uniformly (eg #dogs and #Dogs should be the same tag)
        return tag.substr(1).toLowerCase();
      });
    }

    AppActions.addRequest(text, AuthStore.getUsername(), refinedTags); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function(){
    return (
      <form className="req-form" onSubmit={this._onSubmit}>
        <input className="request-input" ref="text" type="text" placeholder="Make a request" />
        <input className="request-submit submission" type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;