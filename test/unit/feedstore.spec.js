var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var FeedStore = require('../../dev/js/stores/app-feedStore');
var AppDispatcher = require('../../dev/js/dispatchers/app-dispatcher');

describe('FeedStore', function() {
  var stub;
  
  before(function() {
    stub = sinon.stub(FeedStore, 'emitChange');
    AppDispatcher.dispatch({
      type: 'RECEIVE_REQUESTS',
      data: {
        data: [
        {
          created_at: "2015-07-19T14:53:05.548Z",
          id: 1,
          likes: 0,
          text: "#cats",
          updated_at: "2015-07-19T14:53:05.548Z",
          user: {
            FacebookId: "12341673",
            avatar: "defaultAvatar.png",
            created_at: "2015-07-19T14:52:59.505Z",
            id: 1,
            karma: 2,
            updated_at: "2015-07-19T14:52:59.505Z",
            username: "JP Ji"
          }
        },
        {
          created_at: "2015-07-19T14:53:05.548Z",
          id: 2,
          likes: 2,
          text: "#dogs",
          updated_at: "2015-07-19T14:53:05.548Z",
          user: {
            FacebookId: "123419803",
            avatar: "defaultAvatar.png",
            created_at: "2015-07-19T14:52:59.505Z",
            id: 3,
            karma: 1,
            updated_at: "2015-07-19T14:52:59.505Z",
            username: "Edwin Lin"
          }
        },
        {
          created_at: "2015-07-19T14:53:05.548Z",
          id: 3,
          likes: 0,
          text: "#puppies",
          updated_at: "2015-07-19T14:53:05.548Z",
          user: {
            FacebookId: "124215115",
            avatar: "defaultAvatar.png",
            created_at: "2015-07-19T14:52:59.505Z",
            id: 2,
            karma: 2,
            updated_at: "2015-07-19T14:52:59.505Z",
            username: "Ning Xia"
          }
        }]
      }
    });
  });

  after(function() {
    FeedStore.emitChange.restore();
  });
  describe('the FeedStore', function(){

    it('should be an object', function(){
      expect(FeedStore).to.be.an('object');
    });

    it('should have a getAllRequests method', function(){
      expect(FeedStore).to.have.property('getAllRequests');
    });

    it('getAllRequests should retrieve requests', function(){
      var obj = FeedStore.getAllRequests();
      expect(obj).to.be.an('object');
      expect(obj[1]).to.be.an('object');
      expect(obj[2]).to.be.an('object');
      expect(obj[3]).to.be.an('object');
    });


    it('should have a getRequest method', function(){
      expect(FeedStore).to.have.property('getRequest');
    });
    
    it('getRequest should retrieve a request', function(){
      expect(FeedStore.getRequest(1)).to.be.an('object');
      expect(FeedStore.getRequest(2)).to.be.an('object');
      expect(FeedStore.getRequest(3)).to.be.an('object');
    });

    it('should have a emitChange method', function(){
      expect(FeedStore).to.have.property('emitChange');
    });

    it('emitChange should be called on feed changes', function(){
      expect(stub.calledOnce).to.equal(true);
    });
    
    it('should log out users', function () {
      AppDispatcher.dispatch({
        type: 'UPDATE_FEED',
        data: {
          created_at: "2015-07-19T14:53:05.548Z",
          id: 4,
          likes: 0,
          text: "#marcus",
          updated_at: "2015-07-19T14:53:05.548Z",
          user: {
            FacebookId: "12390715",
            avatar: "defaultAvatar.png",
            created_at: "2015-07-19T14:52:59.505Z",
            id: 7,
            karma: 2,
            updated_at: "2015-07-19T14:52:59.505Z",
            username: "Albert Tang"
          }
        }
      });
      expect(FeedStore.getRequest(4)).to.be.an('object');
    });

    it('emitChange should be called on feed update', function(){
      expect(stub.calledTwice).to.equal(true);
    });
    
    it('should have a addChangeListener method', function(){
      expect(FeedStore).to.have.property('addChangeListener');
    });
    
    it('should have a removeChangeListener method', function(){
      expect(FeedStore).to.have.property('removeChangeListener');
    });
    
  });
});

