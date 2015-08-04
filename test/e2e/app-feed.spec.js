describe('homepage feed list', function() {
  it('should load the feed', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('Picarus');

  });
});