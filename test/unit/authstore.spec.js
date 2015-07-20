var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var AuthStore = require('../../dev/js/stores/app-authStore');

describe('AuthStore', function() {
  describe('the Authstore methods', function(){

    it('should be an object', function(){
      expect(AuthStore).to.be.an('object');
    });

    it('should have the right methods', function(){
      expect(AuthStore).to.have.property('getId');
    });
  });
});

