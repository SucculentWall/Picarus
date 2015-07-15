var React = require("react");
var AppActions = require("../../actions/app-actions");
var Link = require("react-router").Link;

var Request = React.createClass({
  // _handleClick: function(e) {
  //   AppActions.pickRequest(this.props.data.id);
  // },
  render: function(){
    return (
      <li className = "req">
        <Link className = "req" to="requests" params={{requestId: this.props.data.id}} >
          <span className = "req">{this.props.data.text}</span>
          <span className = "req">{this.props.data.username}</span>
        </Link>
      </li>
    );
  }
});

module.exports = Request;

