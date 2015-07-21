var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var AuthStore = require('../../dev/js/stores/app-authStore');
var AppDispatcher = require('../../dev/js/dispatchers/app-dispatcher');

describe('AuthStore', function() {
  var stub;
  
  before(function() {
    stub = sinon.stub(AuthStore, 'emitChange');
    AppDispatcher.dispatch({
      type: 'LOGGED_IN',
      data : {
        FacebookId: '234523452',
        avatar: "whatever.png",
        created_at: "2015-07-19T14:52:59.505Z",
        id: 1,
        karma: 2,
        updated_at: "2015-07-19T14:52:59.505Z",
        username: "Edwin Lin"
      },
      token: {
        accessToken: "6zydqDoHQYFZBStvSqQC7tQL9UWnZBZCjYLHTr6ZAEeMUOGx4v1dOxNgZAXnFIZD",
        expiresIn: 4428,
        signedRequest: "H1b2Xw.eyJhbGdvcml0aG0iOiJITUFMTAzNzM1NTE3MDQwNzMzIn0",
        userID: "1010234440345733"
      }
    });
  });

  after(function() {
    AuthStore.emitChange.restore();
  });
  describe('the Authstore', function(){

    it('should be an object', function(){
      expect(AuthStore).to.be.an('object');
    });

    it('should have a getId method', function(){
      expect(AuthStore).to.have.property('getId');
    });

    it('getId should retrieve the user id', function(){
      expect(AuthStore.getId()).to.equal(1);
    });

    it('should have a loggedIn method', function(){
      expect(AuthStore).to.have.property('loggedIn');
    });

    it('loggedIn should return the log in status', function(){
      expect(AuthStore.loggedIn()).to.equal(true);
    });

    it('should have a getFacebookId method', function(){
      expect(AuthStore).to.have.property('getFacebookId');
    });

    it('getFacebookId should retrieve the facebook id', function(){
      expect(AuthStore.getFacebookId()).to.equal('234523452');
    });
    
    it('should have a getUsername method', function(){
      expect(AuthStore).to.have.property('getUsername');
    });

    it('getUsername should retrieve the username', function(){
      expect(AuthStore.getUsername()).to.equal('Edwin Lin');
    });

    it('should have a getToken method', function(){
      expect(AuthStore).to.have.property('getToken');
    });
    
    it('getToken should retrieve the username', function(){
      expect(AuthStore.getToken()).to.be.an('object');
    });

    it('should have a emitChange method', function(){
      expect(AuthStore).to.have.property('emitChange');
    });

    it('emitChange should be called on log in', function(){
      expect(stub.calledOnce).to.equal(true);
    });
    
    it('should log out users', function () {
      AppDispatcher.dispatch({
        type: 'NOT_LOGGED_IN'
      });
      expect(AuthStore.loggedIn()).to.equal(false);
    });

    it('emitChange should be called on log out', function(){
      expect(stub.calledTwice).to.equal(true);
    });
    
    it('should have a addChangeListener method', function(){
      expect(AuthStore).to.have.property('addChangeListener');
    });
    
    it('should have a removeChangeListener method', function(){
      expect(AuthStore).to.have.property('removeChangeListener');
    });
    
  });
});

