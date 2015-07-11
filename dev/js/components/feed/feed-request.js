var React = require("react");
var AppActions = require("../../actions/app-actions");
var Link = require("react-router-component").Link;

var Request = React.createClass({
  _handleClick: function(e) {
    console.log(this.props.data.id);
    AppActions.pickRequest(this.props.data.id);
  },
  render: function(){
    return (
      <li className = "req">
        <Link href="/request" onClick={this._handleClick}>
          <span className = "req-username">{this.props.data.username}</span>
          <span className = "req-text">{this.props.data.text}</span>
          {this.props.data.id}
        </Link>
      </li>
    );
  }
});

module.exports = Request;

