'use strict';

angular.module('ludwig').directive('scenario', function() {
    return {
      scope: {
        test: '=',
      },
      restrict: 'E',
      template: '<pre>{{ test.scenario | json }}</pre>' 
    };
});
