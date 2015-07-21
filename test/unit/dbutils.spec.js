var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var dbUtils = require('../../dev/js/utils/database-utils');

describe('DB utils', function() {

  describe('getAllRequests', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getAllRequests');
    });

  });

  describe('getAllTags', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getAllTags');
    });

  });

  describe('addRequest', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('addRequest');
    });

  });

  describe('getComments', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getComments');
    });

  });

  describe('getAllRequests', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getAllRequests');
    });

  });

  describe('getRequest', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getRequest');
    });

  });

  describe('addComment', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('addComment');
    });

  });

  describe('addPhoto', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('addPhoto');
    });

  });

  describe('getAllPhotos', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getAllPhotos');
    });

  });

  describe('getPhotosForTag', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getPhotosForTag');
    });

  });

  describe('getPhotosForSearch', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getPhotosForSearch');
    });

  });

  describe('getRequestsForSearch', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getRequestsForSearch');
    });

  });

  describe('findOrCreateUser', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('findOrCreateUser');
    });

  });

  describe('likePhoto', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('likePhoto');
    });

  });

  describe('getProfileInfo', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getProfileInfo');
    });

  });

  describe('addAvatar', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('addAvatar');
    });

  });

  describe('getPhotoLikes', function () {
    
    it('the method should exist', function() {
      expect(dbUtils).to.have.property('getPhotoLikes');
    });

  });



});