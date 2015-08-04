var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var UserStore = require('../../dev/js/stores/app-userStore');
var AppDispatcher = require('../../dev/js/dispatchers/app-dispatcher');

describe('UserStore', function() {

  var stub;

  describe('UserStore initiating', function(){

    it('should be an object', function(){
      expect(UserStore).to.be.an('object');
    });

    it('should have change listener methods', function(){
      expect(UserStore).to.have.property('addChangeListener');
      expect(UserStore.addChangeListener).to.be.a('function');
      expect(UserStore).to.have.property('removeChangeListener');
      expect(UserStore.removeChangeListener).to.be.a('function');
    });
  });

  describe('UserStore receiving profile information', function(){
  
    before(function() {

      stub = sinon.stub(UserStore, 'emitChange');

      AppDispatcher.dispatch({
        type: 'RECEIVE_PROFILE_INFO',
        data : {
          id: 1,
          FacebookId: '10206142917946099',
          username: 'Albert Tang',
          created_at: '2015-07-18T23:30:35.735Z',
          updated_at: '2015-07-21T02:14:17.314Z',
          karma: 5
        }
      });

    });

    after(function() {
      UserStore.emitChange.restore();
    });

    it('should receive the user ID', function(){
      expect(UserStore).to.have.property('getUserId');
      expect(UserStore.getUserId).to.be.a('function');
      expect(UserStore.getUserId()).to.not.equal('1');
      expect(UserStore.getUserId()).to.equal(1);
    });

    it('should receive the Facebook ID', function(){
      expect(UserStore).to.have.property('getFacebookId');
      expect(UserStore.getFacebookId).to.be.a('function');
      expect(UserStore.getFacebookId()).to.not.equal(10206142917946099);
      expect(UserStore.getFacebookId()).to.equal('10206142917946099');
    });

    it('should receive the username', function(){
      expect(UserStore).to.have.property('getUsername');
      expect(UserStore.getUsername).to.be.a('function');
      expect(UserStore.getUsername()).to.equal('Albert Tang');
    });

    it('should receive the join date', function(){
      expect(UserStore).to.have.property('getJoinDate');
      expect(UserStore.getJoinDate).to.be.a('function');
      expect(UserStore.getJoinDate()).to.not.equal('2015-07-18 16:30:35.735-07');
      expect(UserStore.getJoinDate()).to.equal('2015-07-18T23:30:35.735Z');
    });

    it('should receive user karma', function(){
      expect(UserStore).to.have.property('getUserKarma');
      expect(UserStore.getUserKarma).to.be.a('function');
      expect(UserStore.getUserKarma()).to.not.equal('5');
      expect(UserStore.getUserKarma()).to.equal(5);
    });

    it('should emit change upon receiving data', function(){
      expect(stub.calledOnce).to.equal(true);
    });

  });

  describe('UserStore updating avatar information', function(){

    before(function() {

      stub = sinon.stub(UserStore, 'emitChange');

      AppDispatcher.dispatch({
        type: 'UPDATE_AVATAR',
        filename: 'exampleAvatar.png',
        id: 1
      });

    });

    after(function() {
      UserStore.emitChange.restore();
    });
  
    it('should update avatar', function(){
      expect(UserStore).to.have.property('getAvatar');
      expect(UserStore.getAvatar).to.be.a('function');
      expect(UserStore.getAvatar()).to.equal('exampleAvatar.png');
    });

    it('should emit change upon receiving data', function(){
      expect(stub.calledOnce).to.equal(true);
    });

  });

  describe('UserStore updating request information', function(){

    before(function() {

      stub = sinon.stub(UserStore, 'emitChange');

      var request1 = {
          id: 1,
          user_id: 1,
          text: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_FEED',
        data: request1
      });

    });

    after(function() {
      UserStore.emitChange.restore();
    });
  
    it('should update based on feed', function(){
      
      var request1 = {
          id: 1,
          user_id: 1,
          text: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      expect(UserStore).to.have.property('getAllUserRequests');
      expect(UserStore.getAllUserRequests).to.be.a('function');
      expect(UserStore.getAllUserRequests()).to.be.an('array');
      expect(UserStore.getAllUserRequests()[0].text).to.equal('test');

      expect(UserStore).to.have.property('getRecentUserRequests');
      expect(UserStore.getRecentUserRequests).to.be.a('function');
      expect(UserStore.getRecentUserRequests()).to.be.an('array');
      expect(UserStore.getRecentUserRequests(5)[0].text).to.equal('test');

    });

    it('should emit change upon receiving data', function(){
      expect(stub.calledOnce).to.equal(true);
    });

    it('should not update data from a different user', function(){

      var request2 = {
        id: 2,
        user_id: 2,
        text: 'different user',
        updated_at: '2015-07-21T05:49:58.779Z',
        created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_FEED',
        data: request2
      });

      expect(UserStore.getAllUserRequests().length).to.equal(1);
      expect(UserStore.getRecentUserRequests(5).length).to.equal(1);
      expect(stub.calledOnce).to.equal(true);
    });

    it('should should record the most recent requests', function(){
      var request;
      for (var i = 1; i < 10; i++) {
        request = {
          id: i,
          user_id: 1,
          text: 'new comment ' + i,
          created_at: '2015-07-2' + i +'T06:00:00.000Z',
        };
        AppDispatcher.dispatch({
          type: 'UPDATE_FEED',
          data: request
        });
      }
      expect(UserStore.getAllUserRequests().length).to.equal(10);
      expect(UserStore.getRecentUserRequests(10).length).to.equal(10);
      expect(UserStore.getRecentUserRequests(5).length).to.equal(5);
      expect(UserStore.getAllUserRequests()[0].text).to.equal('test');
      expect(UserStore.getRecentUserRequests(1)[0].text).to.equal('new comment 9');
      expect(stub.callCount).to.equal(10);
    });

  });
    
  describe('UserStore updating comment information', function(){

    before(function() {

      stub = sinon.stub(UserStore, 'emitChange');

      var comment1 = {
          id: 1,
          user_id: 1,
          photo_id: 1,
          request_id: 1,
          text: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_COMMENT',
        data: comment1
      });

    });

    after(function() {
      UserStore.emitChange.restore();
    });
  
    it('should update based on comments', function(){
      
      var comment1 = {
          id: 1,
          user_id: 1,
          photo_id: 1,
          request_id: 1,
          text: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      expect(UserStore).to.have.property('getAllUserComments');
      expect(UserStore.getAllUserComments).to.be.a('function');
      expect(UserStore.getAllUserComments()).to.be.an('array');
      expect(UserStore.getAllUserComments()[0].text).to.equal('test');
      expect(UserStore.getAllUserComments()[0].request_id).to.equal(1);

      expect(UserStore).to.have.property('getRecentUserComments');
      expect(UserStore.getRecentUserComments).to.be.a('function');
      expect(UserStore.getRecentUserComments()).to.be.an('array');
      expect(UserStore.getRecentUserComments(5)[0].text).to.equal('test');
      expect(UserStore.getRecentUserComments(5)[0].request_id).to.equal(1);

    });

    it('should emit change upon receiving data', function(){
      expect(stub.calledOnce).to.equal(true);
    });

    it('should not update data from a different user', function(){

      var comment2 = {
        id: 2,
        user_id: 2,
        photo_id: 1,
        request_id: 1,
        text: 'different user',
        updated_at: '2015-07-21T05:49:58.779Z',
        created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_COMMENT',
        data: comment2
      });

      expect(UserStore.getAllUserComments().length).to.equal(1);
      expect(UserStore.getRecentUserComments(5).length).to.equal(1);
      expect(stub.calledOnce).to.equal(true);
    });

    it('should should record the most recent comments', function(){
      var comment;
      for (var i = 1; i < 10; i++) {
        comment = {
          id: i,
          user_id: 1,
          photo_id: 1,
          request_id: 1,
          text: 'new comment ' + i,
          created_at: '2015-07-2' + i +'T06:00:00.000Z',
        };
        AppDispatcher.dispatch({
          type: 'UPDATE_COMMENT',
          data: comment
        });
      }
      expect(UserStore.getAllUserComments().length).to.equal(10);
      expect(UserStore.getRecentUserComments(10).length).to.equal(10);
      expect(UserStore.getRecentUserComments(5).length).to.equal(5);
      expect(UserStore.getAllUserComments()[0].text).to.equal('test');
      expect(UserStore.getRecentUserComments(1)[0].text).to.equal('new comment 9');
      expect(stub.callCount).to.equal(10);
    });
  });

  describe('UserStore updating photo information', function(){

    before(function() {

      stub = sinon.stub(UserStore, 'emitChange');

      var photo1 = {
          id: 1,
          user_id: 1,
          request_id: 1,
          likes: 1,
          filetype: 'png',
          filename: 'test.png',
          description: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_REQUEST',
        data: photo1
      });

    });

    after(function() {
      UserStore.emitChange.restore();
    });

    it('should update based on photos', function(){
      
      var photo1 = {
          id: 1,
          user_id: 1,
          request_id: 1,
          likes: 1,
          filetype: 'png',
          filename: 'test.png',
          description: 'test',
          updated_at: '2015-07-21T05:49:58.779Z',
          created_at: '2015-07-21T05:49:58.779Z'
      };

      expect(UserStore).to.have.property('getUserPhotos');
      expect(UserStore.getUserPhotos).to.be.a('function');
      expect(UserStore.getUserPhotos()).to.be.an('array');
      expect(UserStore.getUserPhotos()[0].filename).to.equal('test.png');
      expect(UserStore.getUserPhotos()[0].request_id).to.equal(1);

    });

    it('should emit change upon receiving data', function(){
      expect(stub.calledOnce).to.equal(true);
    });

    it('should not update data from a different user', function(){

      var photo2 = {
        id: 1,
        user_id: 2,
        request_id: 1,
        likes: 1,
        filetype: 'png',
        filename: 'different_user.png',
        description: 'different user',
        updated_at: '2015-07-21T05:49:58.779Z',
        created_at: '2015-07-21T05:49:58.779Z'
      };

      AppDispatcher.dispatch({
        type: 'UPDATE_REQUEST',
        data: photo2
      });

      expect(UserStore.getUserPhotos().length).to.equal(1);
      expect(stub.calledOnce).to.equal(true);
    });

    it('should should record the most recent photos', function(){
      var photo;
      for (var i = 1; i < 10; i++) {
        photo = {
          id: i,
          user_id: 1,
          request_id: 1,
          likes: 1,
          filetype: 'png',
          filename: 'new_photo_' + i + '.png',
          description: 'new photo ' + i,
          created_at: '2015-07-2' + i +'T06:00:00.000Z',
        };
        AppDispatcher.dispatch({
          type: 'UPDATE_REQUEST',
          data: photo
        });
      }
      expect(UserStore.getUserPhotos().length).to.equal(10);
      expect(UserStore.getUserPhotos()[0].filename).to.equal('test.png');
      expect(stub.callCount).to.equal(10);
    });

  });

describe('UserStore updating toggle information', function(){

    before(function() {
      stub = sinon.stub(UserStore, 'emitChange');
    });

    after(function() {
      UserStore.emitChange.restore();
    });

    it('should update comment based on toggle', function(){

      expect(UserStore).to.have.property('getDisplayToggle');
      expect(UserStore.getDisplayToggle).to.be.a('function');
      expect(UserStore.getDisplayToggle(1)).to.be.an('object');
      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(undefined);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(undefined);

      AppDispatcher.dispatch({
        type: 'TOGGLE_COMMENT',
        data: 1
      });
      
      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(true);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(undefined);
      expect(stub.calledOnce).to.equal(true);

      AppDispatcher.dispatch({
        type: 'TOGGLE_COMMENT',
        data: 1
      });

      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(false);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(undefined);

    });

    it('should update modal based on toggle', function(){

      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(false);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(undefined);

      AppDispatcher.dispatch({
        type: 'TOGGLE_MODAL_PHOTO',
        data: 1
      });
      
      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(false);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(true);
      expect(stub.calledThrice).to.equal(true);

      AppDispatcher.dispatch({
        type: 'TOGGLE_MODAL_PHOTO',
        data: 1
      });

      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(false);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(false);

    });

    it('should reset display settings', function(){

      AppDispatcher.dispatch({
        type: 'TOGGLE_MODAL_PHOTO',
        data: 1
      });

      AppDispatcher.dispatch({
        type: 'TOGGLE_COMMENT',
        data: 1
      });

      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(true);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(true);

      AppDispatcher.dispatch({
        type: 'TOGGLE_RESET',
        data: 1
      });

      expect(UserStore.getDisplayToggle(1).showCommentEntry).to.equal(false);
      expect(UserStore.getDisplayToggle(1).showModal).to.equal(false);
      expect(stub.callCount).to.equal(7);

    });

  });

  describe('UserStore updating likes and karma information', function(){
    
    before(function() {
      stub = sinon.stub(UserStore, 'emitChange');
      var like = {
        data: {
          id: 1
        },
        config: {
          data: {
            like: true
          }
        }
      };
      AppDispatcher.dispatch({
        type: 'LIKE_PHOTO',
        data: like
      });
    });

    after(function() {
      UserStore.emitChange.restore();
    });

    it('should update like', function(){
      expect(UserStore).to.have.property('getPhotoLikeStatus');
      expect(UserStore.getPhotoLikeStatus).to.be.a('function');

    });

  });

});

