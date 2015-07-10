var React = require("react");

var MakeRequest = React.createClass({
  render: function(){
    return (
      <form className="req-form" onSubmit={}>
        <input id="req-text" type="text" placeholder="Make a request" />
      {/*TODO: add tags too? */}
        <input type="submit" />
      </form>
    );
  }
});

module.exports = MakeRequest;