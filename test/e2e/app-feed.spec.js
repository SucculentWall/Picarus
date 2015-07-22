describe('homepage feed list', function() {
  it('should load the feed', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('Picarus');

    // var feed = element.all(by.css('input.search-bar'));

    // expect(feed.length).toEqual(1);
  });
});