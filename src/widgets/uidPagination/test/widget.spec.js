describe('Pagination Widget', function () {

  var $compile, scope;

  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/uidPagination/';
    loadJSONFixtures('widget.json');
    
    (getJSONFixture('widget.json').requiredModules || []).concat([
      'bonitasoft.ui.widgets',
      'bonitasoft.ui.filters'
    ]).forEach(function (module) {
      angular.mock.module(module);
    });
  });

  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.properties = {total: 200, pageSize:10, currentPage:1};
  }));

  it('should contains 20 pages', function () {
    var element = $compile('<uid-pagination></uid-pagination>')(scope);
    scope.$apply();
    expect(element.find('li').length).toBe(20);
  });
});
