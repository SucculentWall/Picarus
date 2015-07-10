var React = require("react");

var MakeRequest = React.createClass({
  render: function(){
    return (
      <form className="req-form">
        <input id="req-text" type="text" placeholder="Make a request" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;