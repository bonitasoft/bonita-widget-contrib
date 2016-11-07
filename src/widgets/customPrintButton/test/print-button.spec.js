describe('Print button', function() {

  var scope, element, $window;

  beforeEach(module('bonitasoft.ui.widgets', 'bonitasoft.ui.filters'));

  beforeEach(inject(function($compile, $rootScope, _$window_) {
    $window = _$window_;
    scope = $rootScope.$new();
    scope.properties = {};

    element = $compile('<custom-print-button></custom-print-button>')(scope);
    scope.$apply();
  }));

  it('should have specified label', function() {
    scope.properties.label = 'foobar';
    scope.$apply();

    expect(element.find('button').text().trim()).toBe('foobar');
  });

  it('should support changing text alignment', function() {
    scope.properties.alignment = 'right';
    scope.$apply();

    expect(element.find('div').hasClass('text-right')).toBeTruthy();
  });

  it('should be disablable', function() {
    scope.properties.disabled = true;
    scope.$apply();

    expect(element.find('button').attr('disabled')).toBe('disabled');
  });

  it('should print the current page', function() {
    spyOn($window, 'print');

    element.find('button').triggerHandler('click');

    expect($window.print).toHaveBeenCalled();
  });
});
