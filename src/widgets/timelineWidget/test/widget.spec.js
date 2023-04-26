describe('Timeline', function () {

  var $compile, scope;

  // add both, module required by the widget and locally defined ones
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/src/widgets/timelineWidget/';
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
    scope.properties = {};
  }));

  describe('In case of no Events', function () {

    describe('Event list', function () {
      it('should contain 1 fake-event', function () {
        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        var result = element[0].querySelectorAll('li>.timeline-panel');
        expect(result.length).toBe(1);
      });
    });

    describe('Event structure', function () {
      it('should display no events message', function () {
        scope.properties.events = [];
        scope.properties.noEventsTitle = 'Nothing to display';
        scope.properties.noEventsContent = 'To have content add events';

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('Nothing to display');
        expect(element.html()).toContain('To have content add events');

      });

      it('should *NOT* display no events message', function () {
        scope.properties.events = [{}];
        scope.properties.noEventsTitle = 'Nothing to display';
        scope.properties.noEventsContent = 'To have content add events';

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).not.toContain('Nothing to display');
        expect(element.html()).not.toContain('To have content add events');
      });
    });

  });

  describe('In case of events', function () {

    describe('Event list', function () {
      it('should contain several events', function () {

        // Given 5 events in the scope
        scope.properties.events = [{},{},{},{},{}];

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        // 5 elements are displayed in the timeline
        var result = element[0].querySelectorAll('li>.timeline-panel');
        expect(result.length).toBe(5);
      });
    });

    describe('Event structure', function () {
      it('should display event title based on an expression', function () {
        scope.properties.events = [{"title": "a title"}];
        scope.properties.eventsTitleExpression = 'event.title';

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('a title');

      });

      it('should display event title based on a constant', function () {
        scope.properties.events = [{"title": "a title"}];
        scope.properties.eventsTitleExpression = '"a constant title"';

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('a constant title');

      });

      it('should display event time based on an expression and format', function () {
        scope.properties.events = [{"time": 0}];
        scope.properties.eventsTimeExpression = 'event.time';
        // Use a "non-standard" format (using underscores) to make sure
        // the test is not green by a side effect of a default format that would match our expectations.
        scope.properties.eventsTimeAttributeFormat = 'yyyy_MM_dd';

        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('1970_01_01');

      });

      it('should display event author on an expression', function () {
        scope.properties.events = [{"firstname": "Nicolas", "lastname": "Chabanoles"}];
        scope.properties.eventsAuthorExpression = 'event.firstname +" "+ event.lastname';


        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('Nicolas Chabanoles');

      });

      it('should display event content based on an expression', function () {
        scope.properties.events = [{"what": "I did an awesome action!", "why": "Why? Because I am gifted! ;-)"}];
        scope.properties.eventsContentExpression = '"What: " + event.what +" why: "+ event.why';


        var element = $compile('<timeline-widget></timeline-widget>')(scope);
        scope.$apply();

        expect(element.html()).toContain('What: I did an awesome action! why: Why? Because I am gifted! ;-)');

      });

    });
  });

  describe('Origin structure', function () {

    it('should display origin title based on an expression', function () {
      scope.properties.origin = {"name": "Big Bang!"};
      scope.properties.originTitleExpression = 'origin.name';


      var element = $compile('<timeline-widget></timeline-widget>')(scope);
      scope.$apply();

      expect(element.html()).toContain('Big Bang!');

    });

    it('should display event time based on an expression and format', function () {
      scope.properties.origin = {"time": 	Date.UTC(2000,0,1)};
      scope.properties.originTimeExpression = 'origin.time';
      scope.properties.eventsTimeAttributeFormat = 'MMMM dd yyyy';

      var element = $compile('<timeline-widget></timeline-widget>')(scope);
      scope.$apply();

      // If at some point this assertion fails because of l10n, make sure you did not add angular-locale_*.js other than en-us
      expect(element.html()).toContain('January 01 2000');

    });

    it('should display event author based on an expression', function () {
      scope.properties.origin = {"author": {"firstname":"Nicolas", "lastname": "Chabanoles"}};
      scope.properties.originAuthorExpression = 'origin.author.lastname +" "+ origin.author.firstname';


      var element = $compile('<timeline-widget></timeline-widget>')(scope);
      scope.$apply();

      expect(element.html()).toContain('Chabanoles Nicolas');

    });

    it('should display event content based on an expression', function () {
      scope.properties.origin = {"what": "The biggest explosion ever!", "why": "That is the question..."};
      scope.properties.originContentExpression = '"What: " + origin.what +" Why: "+ origin.why';


      var element = $compile('<timeline-widget></timeline-widget>')(scope);
      scope.$apply();

      expect(element.html()).toContain('What: The biggest explosion ever! Why: That is the question...');

    });

  });



});
