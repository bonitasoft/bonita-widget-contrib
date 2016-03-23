describe('RichTextAreaWidget', function () {

  var $compile, scope;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/actionButtonsDataTableWidget/';
    loadJSONFixtures('widget.json');

    (getJSONFixture('widget.json').requiredModules || []).concat([
      'bonitasoft.ui.widgets',
      'bonitasoft.ui.filters',
      'bonitasoft.ui.services'
    ]).forEach(function (module) {
      angular.mock.module(module);
    });
  });

  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    //scope.properties = {
    //  isBound: function() {
    //    return false;
    //  },
    //  readOnly: false,
    //  required: false,
    //  minLength: '0',
    //  maxLength: '0',
    //  labelHidden: false,
    //  label: 'Default label',
    //  labelPosition: 'top',
    //  labelWidth: 4,
    //  value: 'content'
    //};
  }));

  //it('should wrap a full textAngular', function () {
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').find('div').attr('text-angular')).toBeDefined();
  //  expect(element.find('div').find('div').find('div').find('div').find('div').hasClass('ta-toolbar')).toBeTruthy();
  //  expect(element.find('div').find('div').find('div').find('div').find('div').next().hasClass('ta-text')).toBeTruthy();
  //});
  //
  //it('should be on the top of the textAngular with default label if displayed', function () {
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').hasClass('form-horizontal')).toBeFalsy();
  //  expect(element.find('label').text().trim()).toBe('Default label');
  //});
  //
  //it('should be on the left of the textAngular if displayed', function () {
  //  scope.properties.labelPosition =  'left';
  //  scope.properties.label =  'Other Label';
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').hasClass('form-horizontal')).toBeTruthy();
  //  expect(element.find('label').text().trim()).toBe('Other Label');
  //});
  //
  //it('should hidde the label when property is hidden', function () {
  //  scope.properties.labelHidden =  true;
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('label').length).toBe(0);
  //});
  //
  //it('should adapt its width to label size when on the left', function () {
  //  scope.properties.labelPosition = 'left';
  //  scope.properties.labelWidth = "4";
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('label').attr('class')).toContain('col-xs-4');;
  //  expect(element.find('div').find('div').find('div').attr('class')).toContain('col-xs-8');
  //});
  //
  //it('should be wrapped in full width div', function () {
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').attr('class')).toContain('col-xs-12');
  //});
  //
  //it('should be either read only nor required by default', function () {
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').find('div').attr('ta-disabled')).toBe("false");
  //});
  //
  //it('should be read only when requested', function () {
  //  scope.properties.readOnly = true;
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').find('div').attr('ta-disabled')).toBe("true");
  //});
  //
  //it('should only contain the specified toolbar elements', function () {
  //  scope.properties.toolbars = "[ ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'] ]";
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').find('div').attr('ta-toolbar')).toBe("[ ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'] ]");
  //});
  //
  //it('should be required when requested', function () {
  //  scope.properties.required = true;
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //
  //  expect(element.find('div').find('div').find('div').find('div').attr('ng-required')).toBeTruthy();
  //});
  //
  //it('should validate minlength', function () {
  //  scope.properties.minLength = 5;
  //  scope.properties.value = '123';
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //  expect(element.find('div').find('div').find('div').find('div').attr('class')).toMatch('ng-invalid-ta-min-text');
  //
  //  scope.properties.value = '12345';
  //  scope.$apply();
  //  expect(element.find('div').find('div').find('div').find('div').attr('class')).not.toMatch('ng-invalid-ta-min-text');
  //});
  //
  //it('should validate maxlength', function () {
  //  scope.properties.maxLength = 5;
  //  scope.properties.value = '123456';
  //
  //  var element = $compile('<rich-text-area-widget></rich-text-area-widget>')(scope);
  //  scope.$apply();
  //  expect(element.find('div').find('div').find('div').find('div').attr('class')).toMatch('ng-invalid-ta-max-text');
  //
  //  scope.properties.value = '123';
  //  scope.$apply();
  //  expect(element.find('div').find('div').find('div').find('div').attr('class')).not.toMatch('ng-invalid-ta-max-text');
  //});
});
