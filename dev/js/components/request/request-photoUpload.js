var React = require("react");
var AppActions = require("../../actions/app-actions");

var PhotoUpload = React.createClass({
  render: function(){
    return (
      <form action="/photos" enctype="multipart/form-data" className="req-form" method="post">
        <input ref="file" id="req-text" type="file" value="Choose a File" />
        <input ref="text" id="req-text" type="text" placeholder="Choose a Filename" />
        <input type="submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;