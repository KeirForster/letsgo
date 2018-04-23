(function()
{
    angular
        .module('app.eventList')
        .component('eventList', {
            templateUrl: 'app/components/eventList/eventList.template.html',
            controller : controller,
        });

    controller.$inject = ['$scope', '$timeout', 'dataService', '$log'];

    function controller($scope, $timeout, dataService, $log)
    {
        let vm = this;
        vm.category = null;
        vm.imgSrcBase = 'app/assets/img/';
        vm.imgExt = '.png';
        vm.eventList = null;

        $scope.eventList = [];
        $scope.loadingData = true;

        activate();

        function activate()
        {
            dataService.getEvents()
            .then(function(data)
            {
                // showList();
                vm.eventList = data.events.event;
                return dataService.getEventCategory();
            })
            .then(function(data) {
                // selected categories
                vm.category = data;
                addCatImgPaths(vm.eventList);
                $scope.eventList = vm.eventList;
                $scope.loadingData = false;
                $log.log('loadingData:', $scope.loadingData);
                $log.log('eventList length:', $scope.eventList.length);
            })
            .catch(function(error)
            {
                // showAlert();
                $log.error('eventList.controller.activate: ' + error)
            });
        }

        function addCatImgPaths(data)
        {
            data.forEach(function(event)
            {
                event.imgPath = vm.imgSrcBase + vm.category.img + vm.imgExt;
            });
        }
    }
})();