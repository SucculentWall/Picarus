// // using shallowRenderer to test React components, following example in this resource: 
// // http://simonsmith.io/unit-testing-react-components-without-a-dom/

// var React = require('react/addons');
// var TestUtils = React.addons.TestUtils;
// var shallowRenderer = TestUtils.createRenderer();

// var createComponent = function (component, props) {
//   if (arguments.length > 2) {
//     var children = Array.prototype.slice.call(arguments, 2);  
//   } else {
//     children = [];
//   }
  
//   shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children [0]));
//   return shallowRenderer.getRenderOutput();
// }


// module.exports = createComponent;