describe('Widget', function () {

  var $compile, scope;
  var $filter;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    (require('../widget.json').requiredModules || []).concat([
      'bonitasoft.ui.widgets',
      'bonitasoft.ui.filters'
    ]).forEach(function (module) {
      angular.mock.module(module);
    });
  });

  beforeEach(inject(function (_$compile_, $rootScope, _$filter_) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.properties = {};
    $filter = _$filter_;
  }));

  it('should contains specified html', function () {
    scope.properties.text = 'Hello';

    var element = $compile('<footer-widget></footer-widget>')(scope);
    scope.$apply();

    expect(element.text().trim()).toBe("© "+ $filter("date")(Date.now(),"yyyy") + ' Hello');
  });
});
