var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var dbUtils = require('../../dev/js/utils/database-utils');

describe('the sample set setup', function() {


  describe('one example test', function(){

    it('true should be true', function(){
      expect(true).to.be.true;
    });

  });

  describe('database-utils', function () {
    
    it('should have a method that exists', function() {
      expect(dbUtils).to.have.property('getAllRequests');
    });

  });

});