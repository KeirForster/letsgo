(function()
{
    angular
        .module('app.eventTitle')
        .component('eventTitle', {
            templateUrl: 'app/components/eventTitle/eventTitle.template.html',
            controller : controller,
        });

    controller.$inject = ['$scope', '$timeout', '$log'];

    function controller($scope, $timeout, $log)
    {

    }
})();