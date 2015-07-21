var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var React = require('react/addons');
var MakeRequest = require('../../dev/js/components/feed/feed-makeRequest');

// using shallowRenderer to test React components, following example in this resource: 
// http://simonsmith.io/unit-testing-react-components-without-a-dom/
var createComponent = require('../helper/create-component');

describe('feed-makeRequest component', function() {
  var renderedComponent;

  before('use shallowRenderer to create component', function() {
    renderedComponent = createComponent(MakeRequest);
  });
    
  it('MakeRequest should have a _onSubmit function', function() {
    expect(renderedComponent.type).to.be.equal('form');
  });

});