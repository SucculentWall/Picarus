var React = require('react');
var Header = require('./header/app-header.js');

var Template = React.createClass({
  render:function(){
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Template;