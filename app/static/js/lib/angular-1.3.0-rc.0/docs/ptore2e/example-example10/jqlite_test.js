describe("module:ng.directive:ngSelected", function() {
  var rootEl;
  beforeEach(function() {
    rootEl = browser.rootEl;
    browser.get("./examples/example-example10/index.html");
  });
  
  it('should select Greetings!', function() {
    expect(element(by.id('greet')).getAttribute('selected')).toBeFalsy();
    element(by.model('selected')).click();
    expect(element(by.id('greet')).getAttribute('selected')).toBeTruthy();
  });
});
