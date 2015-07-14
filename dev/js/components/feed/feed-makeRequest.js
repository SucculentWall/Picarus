var React = require("react");
var AppActions = require("../../actions/app-actions");

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

    AppActions.addRequest(text, 'BOB', refinedTags); //Hardcoded 'BOB', change later
    React.findDOMNode(this.refs.text).value = '';
    React.findDOMNode(this.refs.tags).value = '';
  },
  render: function(){
    return (
      <form className="req-form" onSubmit={this._onSubmit}>
        <input className="request-input" ref="text" type="text" placeholder="Make a request" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;