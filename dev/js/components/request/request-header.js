var React = require("react");

var RequestHeader = React.createClass({
  render: function(){
    return (
      <div className = "req-header">
        <h1 className = "req-title">HOLDER-TEXT</h1>
        <h3 className = "req-username">Requested By : HOLDER-NAME </h3>
      </div>
    );
  }
});

module.exports = RequestHeader;