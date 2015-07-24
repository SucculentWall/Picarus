var path = require('path');

// make request and upload photo have xit

describe('Requests', function() {

  it('should make a request', function() {
    // at homepage
    browser.get('/');

    browser.sleep(1000).then(function(){
      // create a new request called #test
      $('.request-input').sendKeys('#test');
      $('.submission').click();
      browser.sleep(1000).then(function(){
        // and click it
        $$('li.req').first().click();
      });
    });

    $$('li.req').first().click();
  
    browser.sleep(1000).then(function(){
      // check if the Request Title exists
      expect($('.req-title').isPresent()).toBe(true);
    });

  });

  it('should reach Gallery', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // check if the Gallery link exists
    var galleryLink = $('.gallery-link');
    expect(galleryLink.getText()).toBe('Gallery');

    // check if the Gallery link works
    galleryLink.click();
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

  it('should reach User page', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // check if a User link exists
    var userLink = $$('.user-link').first();
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

  it('should upload a photo', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // get file to upload
    var file = 'test.jpg';
    var filePath = path.resolve(__dirname, file);
    $('input[type="file"]').sendKeys(filePath);

    // add description
    $('.photo-description').sendKeys('#testJpg');

    // click the last submission button on the page
    $$('.photo-submission').last().click();    

  }); 
  
  it('should show modal', function() {

    // go to the first Request page
    browser.get('/#/requests/1');
    
    browser.sleep(1000).then(function(){
      var photo = $$('.request-photo').last();
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

    // go to the first Request page
    browser.get('/#/requests/1');

    // find number of likes for last photo
    var likesText = $$('span.likes-count').last().getText().then(function(text){
      return text;
    });

    // click like for last photo
    $$('.glyphicon-heart').last().click();

    browser.sleep(1000).then(function(){
      // make sure text is now different
      expect($$('span.likes-count').last().getText()).toNotBe(likesText);
    });

  });

  it('should comment', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // click comment slider for last photo
    $$('.comment-slider').first().click();

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


});