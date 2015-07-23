var path = require('path');

describe('Requests', function() {

  xit('should make a request if there isn\'t one', function() {
    // at homepage
    browser.get('/');

    browser.sleep(1000).then(function(){
      // if anything in the feed is present
      element(by.css('li.req')).isPresent().then(
        function(bool) {
          if (bool) {
            // if so, click it
            $$('li.req').first().click();
          } else {
            // if not, create a new one called #test
            $('.request-input').sendKeys('#test');
            $('.submission').click();
            browser.sleep(1000).then(function(){
              // and click it
              $$('li.req').first().click();
            });
          }
        }
      );
    });
    browser.sleep(1000).then(function(){
      // check if the Request Title exists
      expect($('.req-title').isPresent()).toBe(true);
    });

  });

  xit('should reach Gallery', function() {

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

  xit('should reach User page', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // check if a User link exists
    var userLink = $$('.user-link').first();
    expect(userLink.getText()).toBe('Tester');

    // check if the User link works
    userLink.click();
    browser.sleep(1000).then(function(){
      // check if it redirected
      browser.getCurrentUrl().then(function(url){
        expect(url).toBe('http://127.0.0.1:8888/#/user/1');
        expect($$('.prof-cat').get(1).getText()).toBe('Recent Requests:');
        expect($$('.prof-cat').get(2).getText()).toBe('Recent Comments:');
        expect($$('.prof-cat').get(3).getText()).toBe('Uploaded Photos:');
      });
    });

  });

it('should upload a photo if there isn\'t one', function() {

    // go to the first Request page
    browser.get('/#/requests/1');

    // check if any photo is present
    $$('.request-photo').isPresent().then(function(bool){
      if(!bool) {
        // get file to upload
        var file = 'test.jpg';
        var filePath = path.resolve(__dirname, file);
        $('input[type="file"]').sendKeys(filePath);

        // add description
        $('.photo-description').sendKeys('#testJpg');

        // click the last submission button on the page
        $$('.photo-submission').last().click();      
      } 
    });
    
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


});