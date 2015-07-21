var React = require('react');
var Link = require('react-router').Link;

var ProfileRequest = React.createClass({
  render: function(){
    var valid = function(data) {
      var formattedDate = new Date(data.created_at).toLocaleString();
      return (
        <p>
          {formattedDate}
          <Link to='requests' params={{requestId: data.id}} className='recent'> {data.text}</Link>
        </p>
      );
    };
    return (
      <div>
        {!this.props.data ? null : valid(this.props.data)}
      </div>
    );
  }
});

module.exports = ProfileRequest;

