var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var AppActions = require('../../dev/js/actions/app-actions');

describe('AppActions to Server integration', function() {

  beforeEach(function () {
    var request, response, stub, JSONdata;
    jasmine.Ajax.install();
  });

  afterEach(function () { 
    jasmine.Ajax.uninstall();
  });

  it('should get profile info', function(done){
    stub = sinon.stub(AppActions, 'receiveProfileInfo');
    var stub2 = sinon.stub(AppActions, 'toggleReset');
    AppActions.getProfileInfo(1);
    
    setTimeout(function () {
      request = jasmine.Ajax.requests.mostRecent();

      JSONdata = {
        id: 1,
        FacebookId: '10206142917946099',
        username: 'Albert Tang',
        avatar: 'defaultAvatar.png',
        created_at: '2015-07-18T23:30:35.735Z',
        updated_at: '2015-07-21T02:14:17.314Z',
        comments: [],
        requests: [],
        photos: [ {filename:'test.png' } ],
        karma: 5
      };

      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: JSON.stringify(JSONdata)
      });
      
      setTimeout(function(){
        expect(request.url).to.equal('/api/users/1');
        expect(stub.callCount).to.equal(1);
        expect(stub.args[0][0].username).to.equal('Albert Tang');
        expect(stub.args[0][0].photos[0].filename).to.equal('test.png');
        done();
      });

    });

  });

  it('should get request info', function(done){
    stub = sinon.stub(AppActions, 'receiveAllRequests');
    AppActions.getAllRequests();
    
    setTimeout(function () {
      request = jasmine.Ajax.requests.mostRecent();

      JSONdata = [{
        id: 1,
        text: 'father\'s day',
        likes: 0,
        user_id: 1,
        created_at: '2015-07-21T16:54:37.945Z',
        updated_at: '2015-07-21T16:54:37.945Z',
        user: {
          id: 1,
          FacebookId: '10206142917946099',
          username: 'Jalbert Tang',
        }
      }];

      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: JSON.stringify(JSONdata)
      });
      
      setTimeout(function(){
        expect(request.url).to.equal('/api/requests');
        expect(stub.callCount).to.equal(1);
        expect(stub.args[0][0].data[0].text).to.equal('father\'s day');
        done();
      });

    });    

  });

  it('should get tag info', function(done){
    stub = sinon.stub(AppActions, 'receiveTags');
    AppActions.getAllTags();
    
    setTimeout(function () {
      request = jasmine.Ajax.requests.mostRecent();

      JSONdata = [{
        id: 1,
        tagname: 'china',
        photos_count: 1
      }];

      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: JSON.stringify(JSONdata)
      });
      
      setTimeout(function(){
        expect(request.url).to.equal('/api/tags');
        expect(stub.callCount).to.equal(1);
        expect(stub.args[0][0].data[0].tagname).to.equal('china');
        done();
      });

    });    

  });    

  it('should add comments', function(done){
    stub = sinon.stub(AppActions, 'receiveComments');
    AppActions.addComment('text', 'username', 1, 1);  
    
    setTimeout(function () {
      request = jasmine.Ajax.requests.mostRecent();

      JSONdata = {
        config: {
          data: {
            username: 'username',
            photo_id: 1,
            request_id: 1,
            text: 'text'
          },
          headers: {},
          method: 'post',
          url: '/api/comments'
        },
        data: 'comment added',
        headers: {},
        status: 200,
        statusText: 'OK'
      };

      request.respondWith(JSONdata);
      
      setTimeout(function(){
        expect(request.url).to.equal('/api/comments');
        expect(stub.callCount).to.equal(1);
        done();
      });

    });    
  });

  // Optional TODOs 
  // The following are all AppActions that respond by using calling another AppAction

  // it('should pick a request', function(done){
  //   AppActions.pickRequest();
  // });

  // it('should get all photos', function(done){
  //   AppActions.getAllPhotos();
  // });

  // it('should get photos for tag', function(done){
  //   AppActions.getPhotosForTag();  
  // });

  // it('should get photos for search', function(done){
  //   AppActions.getPhotosForSearch();  
  // });

  // it('should get requests for search', function(done){
  //   AppActions.getRequestsForSearch();  
  // });

  // it('should like photo', function(done){
  //   AppActions.likePhoto();  
  // });

  // it('should unlike photo', function(done){
  //   AppActions.unlikePhoto();  
  // });

  // it('should get photo likes', function(done){
  //   AppActions.getPhotoLikes();  
  // });

  // it('should load comments', function(done){
  //   AppActions.getComments();  
  // });

});

