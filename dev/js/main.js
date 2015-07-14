var fblogin = require('./fblogin.js');
var App = require('./components/app');
var React = require('react');
var dbUtils = require('./utils/database-utils');
var banana = 'banana';
dbUtils.getAllRequests();

React.render(<App />, document.getElementById('main'));