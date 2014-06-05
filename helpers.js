/**
 * Created by amit on 02/06/14.
 */



angular.module("Helpers", []).directive('hoverClass', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function () {
                element.addClass(scope.hoverClass);
            });
            element.on('mouseleave', function () {
                element.removeClass(scope.hoverClass);
            });
        }
    };
})
