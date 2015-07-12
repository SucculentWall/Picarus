var React = require("react");
var AppActions = require("../../actions/app-actions");

var PhotoUpload = React.createClass({
  render: function(){
    return (
      <form action="/photos" enctype="multipart/form-data" className="req-form" method="post">
        <input ref="request_id" id="req-text" type="text" value={this.props.data.id} />
        <input ref="username" id="req-text" type="text" value="BOB" />
        <input ref="file" id="req-text" type="file"/>
        <input type="submit" />
      </form>
    );
  }
});

module.exports = PhotoUpload;