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
        <Link to="requests" params={{requestId: this.props.data.id}} >
          <span className = "req-username">{this.props.data.username}</span>
          <span className = "req-text">{this.props.data.text}</span>
          {this.props.data.id}
        </Link>
      </li>
    );
  }
});

module.exports = Request;

