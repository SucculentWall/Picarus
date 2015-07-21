var React = require('react');
var Link = require('react-router').Link;

var ProfileComment = React.createClass({ 
  render: function(){
    var valid = function(data) {
      var formattedDate = new Date(data.created_at).toLocaleString();
      return (
        <p>
          {formattedDate}
          <span className='comment recent'>
            <Link to='requests' params= {{requestId: data.request_id}}> {data.text}</Link>
          </span>
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

module.exports = ProfileComment;