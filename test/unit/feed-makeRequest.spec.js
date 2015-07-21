var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

require('../helper/testdom')('<!doctype html><html><body></body></html>');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var MakeRequest = require('../../dev/js/components/feed/feed-makeRequest');


describe('feed-makeRequest component', function() {

  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <MakeRequest />
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var formComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'form'
    );

    this.formElement = formComponent.getDOMNode();
  });

    
  it('<form> should have class of req-form', function() {
    expect(this.formElement.classList.contains("req-form")).to.be.true;
  });


});