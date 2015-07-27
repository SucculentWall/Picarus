// Previous helper function to test using jsdom
// Switched to using shallow renderer, based on resource here:
// http://simonsmith.io/unit-testing-react-components-without-a-dom/

// module.exports = function(markup) {
//   if (typeof document !== 'undefined') return;
//   var jsdom = require('jsdom').jsdom;
//   global.document = jsdom(markup || '');
//   global.window = document.parentWindow;
//   global.navigator = {
//     userAgent: 'node.js'
//   };
// };