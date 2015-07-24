var path = require('path');

// make request and upload photo have xit

describe('Gallery', function() {

  it('should start in Gallery', function() {

    browser.get('/');

    browser.sleep(1000).then(function(){
      // check if it redirected
      // browser.getLocationAbsUrl() requires Angular
      // browser.getCurrentUrl() is webdriver.Webdriver.getCurrentUrl() in the documentation
      // it returns a promise that puts the url in as the first argument
      browser.getCurrentUrl().then(function(url){
        expect(url).toBe('http://127.0.0.1:8888/#/');
      });
    });

  });

  it('should show modal', function() {
    
    browser.sleep(1000).then(function(){
      var photo = $$('.gallery-photo').last();
      // check if photo is valid
      photo.getAttribute('src').then(function(src){
        expect(src.slice(src.length-4)).toBe('.jpg');
      });
      // click the photo
      photo.click();
      browser.sleep(1000).then(function(){
        // modal should show up
        expect($('.modal-header').isPresent()).toBe(true);
      });
    });
  });

  it('should like photo', function() {

    // find number of likes for last photo
    var likesText = $$('.modal-likes').last().getText().then(function(text){
      return text;
    });

    // click like for last photo
    $$('.modal-heart').last().click();

    browser.sleep(1000).then(function(){
      // make sure text is now different
      expect($$('.modal-likes').last().getText()).toNotBe(likesText);
    });

  });

  it('should comment', function() {

    // click comment slider for last photo
    browser.sleep(1000).then(function(){
      // make sure text is now different
      $$('.comment-slider').last().click();
    });

    browser.sleep(1000).then(function(){
      // send comment
      var testComment = '#test comment';
      $('.comment-input').sendKeys(testComment);
      $('.comment-submit').click();
      browser.sleep(1000).then(function(){
        expect($$('.photo-comment').first().getText()).toBe(testComment);
      });
    });
    
  });

  it('should reach User page', function() {

    // check if a User link exists
    var userLink = $$('.user-link').last();
    expect(userLink.isPresent()).toBe(true);

    // check if the User link works
    userLink.click();
    browser.sleep(1000).then(function(){
      // check if it redirected
      browser.getCurrentUrl().then(function(url){
        expect(url).toContain('http://127.0.0.1:8888/#/user/');
        expect($$('.prof-cat').get(1).getText()).toBe('Recent Requests:');
        expect($$('.prof-cat').get(2).getText()).toBe('Recent Comments:');
        expect($$('.prof-cat').get(3).getText()).toBe('Uploaded Photos:');
      });
    });

  });

  it('should perform a search', function() {
    // at homepage
    browser.get('/');

    browser.sleep(1000).then(function(){
      // create a new search called test
      $('.search-bar').sendKeys('test');
      $('.search-submit').click();
      browser.sleep(1000).then(function(){
        // and click it
        browser.getCurrentUrl().then(function(url){
          expect(url).toBe('http://127.0.0.1:8888/#/search/test');
          expect($$('.header-tag').get(0).getText()).toContain('PHOTO RESULTS');
          expect($$('.header-tag').get(1).getText()).toContain('REQUEST RESULTS');
        });
      });
    });

  });

  it('should show modal', function() {
    
    browser.sleep(1000).then(function(){
      var photo = $$('.gallery-photo').last();
      // check if photo is valid
      photo.getAttribute('src').then(function(src){
        expect(src.slice(src.length-4)).toBe('.jpg');
      });
      // click the photo
      photo.click();
      browser.sleep(1000).then(function(){
        // modal should show up
        expect($('.modal-header').isPresent()).toBe(true);
      });
    });
  });

  it('should like photo', function() {

    // find number of likes for last photo
    var likesText = $$('.modal-likes').last().getText().then(function(text){
      return text;
    });

    // click like for last photo
    $$('.modal-heart').last().click();

    browser.sleep(1000).then(function(){
      // make sure text is now different
      expect($$('.modal-likes').last().getText()).toNotBe(likesText);
    });

  });

  it('should comment', function() {

    // click comment slider for last photo
    browser.sleep(1000).then(function(){
      $$('.comment-slider').last().click();
    });

    browser.sleep(1000).then(function(){
      // send comment
      var testComment = '#test comment';
      $('.comment-input').sendKeys(testComment);
      $('.comment-submit').click();
      browser.sleep(1000).then(function(){
        expect($$('.photo-comment').first().getText()).toBe(testComment);
      });
    });
    
  });

  it('should be able to access request results from search', function() {
    // at homepage
    browser.get('/');

    browser.sleep(1000).then(function(){
      // create a new search called test
      $('.search-bar').sendKeys('test');
      $('.search-submit').click();
      browser.sleep(1000).then(function(){
        // and click it
        $$('.header-tag').get(1).click();
        expect($('.gallery-req').isPresent()).toBe(true);
      });
    });

  });

  it('should be able to switch between photos and requests', function() {
    browser.sleep(1000).then(function(){
      $$('.header-tag').get(0).click();
      expect($('.gallery-photo').isPresent()).toBe(true);
      browser.sleep(1000).then(function(){
        // and click it
        $$('.header-tag').get(1).click();
        expect($('.gallery-req').isPresent()).toBe(true);
      });
    });

  });

  it('should reach Requests', function() {

    // check if the Gallery request links exist
    var requestLink = $$('.gallery-req').last();
    expect(requestLink.getText()).toBe('#test');

    // check if the Gallery request link works
    browser.sleep(1000).then(function(){
      requestLink.click();
      // check if it redirected
      // browser.getLocationAbsUrl() requires Angular
      // browser.getCurrentUrl() is webdriver.Webdriver.getCurrentUrl() in the documentation
      // it returns a promise that puts the url in as the first argument
      browser.getCurrentUrl().then(function(url){
        expect(url).toContain('http://127.0.0.1:8888/#/requests/');
      });
    });
  });


});