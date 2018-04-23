(function()
{
    angular
        .module('app.datePicker')
        .component('datePicker', {
            templateUrl: 'app/components/datePicker/datePicker.template.html',
            controller : controller
        });

    controller.$inject = ['$scope', '$timeout', '$log'];

    function controller($scope, $timeout, $log)
    {
        let vm = this;
        vm.datePicker = null;
        vm.today = null;
        $scope.showDatePicker = showDatePicker;
        $scope.keydown = keydown;

        activate();

        function activate()
        {
            let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            let month = today.toLocaleString('en-us', {'month': 'short'});
            let todayFormatted = month + '-' + today.getDate() + '-' + today.getFullYear();
            let format = '(Mmm-dd-yyyy)';
            vm.today = todayFormatted;
            vm.datePicker = $('#homepage-datePicker').datepicker({
                format: 'mmm-dd-yyyy',
                minDate: today,
                maxDate: 'Dec-31-2030',
                uiLibrary: 'bootstrap4'
            });
            document.getElementById('homepage-datePicker').placeholder = 'Enter a date: ' + todayFormatted + ' ' + format;
        }

        function showDatePicker()
        {
            if (vm.datePicker.value().includes('undefined'))
                vm.datePicker.value(vm.today);

            $timeout(function()
            {
                // check for undefined values and replace
                if (vm.datePicker.value().includes('undefined'))
                    vm.datePicker.value(vm.today);
                vm.datePicker.open();
            }, 50);
        }

        function keydown($event)
        {
            if ($event.keyCode == 13 && vm.datePicker.value().includes('undefined') ||
                    vm.datePicker.value() == '')
                vm.datePicker.value(vm.today);
        }
    }
})();