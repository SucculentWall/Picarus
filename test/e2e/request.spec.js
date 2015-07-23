describe('Requests', function() {

  it('should make a request', function() {
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

  it('should reach Gallery', function() {

    // check if the Gallery link exists (TODO add class)
    var galleryLink = $$('a').get(2);
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

    // check if a User link exists (TODO add class)
    var userLink = $$('a').get(3);
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

});