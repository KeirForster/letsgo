(function()
{
    angular
        .module('app.homepageForm')
        .component('homepageForm', {
            templateUrl: 'app/components/homepageForm/homepageForm.template.html',
            controller : controller
        });

    controller.$inject = ['$scope', 'dataService', '$timeout', '$log'];

    function controller($scope, dataService, $timeout, $log)
    {
        let vm = this;
        vm.autocomplete = null;
        vm.datePicker = null;
        vm.today = null;
        vm.locValid = false;
        vm.curPlace = null;
        vm.dateValid = false;
        vm.eventDate = null;

        $scope.formComplete = false;
        $scope.geoLocate = geoLocate;
        $scope.extractAddressParams = extractAddressParams;
        $scope.showDatePicker = showDatePicker;
        $scope.keydown = keydown;
        $scope.validateForm = validateForm;

        activate();

        function activate()
        {
            initAutoComplete();
            initDatePicker();
        }

        function initAutoComplete()
        {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            vm.autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('homepage-location')),
                {types: ['geocode']}
            );
            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            vm.autocomplete.addListener('place_changed', $scope.extractAddressParams);
        }

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        function geoLocate()
        {
            document.getElementById('homepage-location').classList.remove('invalid');
            if (vm.autocomplete && navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(function(position)
                 {
                     let geolocation =
                     {
                         lat: position.coords.latitude,
                         lng: position.coords.longitude
                     };
                     let circle = new google.maps.Circle(
                     {
                         center: geolocation,
                         radius: position.coords.accuracy
                     });
                     vm.autocomplete.setBounds(circle.getBounds());
                 });
            }
        }

        function extractAddressParams()
        {
            let componentForm =
            {
                subpremise                 : 'long-name',
                street_number              : 'short_name',
                route                      : 'long_name',
                locality                   : 'long_name',
                administrative_area_level_1: 'short_name',
                administrative_area_level_2: 'long_name',
                administrative_area_level_3: 'long_name',
                country                    : 'long_name',
                postal_code                : 'short_name'
            };
            let place = vm.autocomplete.getPlace();
            let curPlace = {};

            for (let i = 0; i < place.address_components.length; i++)
            {
                let addressType = place.address_components[i].types[0];
                let val = place.address_components[i][componentForm[addressType]];
                curPlace[addressType] = val;
                $log.info(addressType + ': ', val);
            }
            $log.info('\n');
            vm.curPlace = curPlace;
        }

        function validateLoc()
        {
            let locInput = document.getElementById('homepage-location');
            if (locInput.value.length > 0)
                vm.locValid = true;
            return locInput.value.length > 0;
        }

        function initDatePicker()
        {
            let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            // let month = today.toLocaleString('en-us', {'month': 'short'});
            let month = today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth();
            let todayFormatted = month + '-' + today.getDate() + '-' + today.getFullYear();
            let format = 'mm-dd-yyyy';
            vm.today = todayFormatted;
            vm.datePicker = $('#homepage-datePicker').datepicker({
                format: 'mm-dd-yyyy',
                minDate: today,
                maxDate: 'Dec-31-2030',
                uiLibrary: 'bootstrap4'
            });
            document.getElementById('homepage-datePicker').placeholder = 'Enter a date: ' + format;
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

        function validateDate()
        {
            let dateInput = document.getElementById('homepage-datePicker');
            if (dateInput.value.length > 0)
                vm.dateValid = true;
            return dateInput.value.length > 0;
        }

        function validateForm($event)
        {
            if (!validateLoc() || !validateDate())
            {
                showInputErrors();
                $event.preventDefault();
            }
            else
            {
                dataService.setEventLoc(vm.curPlace);
                dataService.setEventDate(extractDateParams(vm.datePicker.value()));
            }
        }

        function extractDateParams(date)
        {
            return {
                raw: date,
                month: date.substr(0, 2),
                day: date.substr(3, 2),
                year: date.substr(6, 4),
                formatted: date.substr(6, 4) + '' + date.substr(0, 2) + '' + date.substr(3, 2) + '00'
            };
        }

        function showInputErrors()
        {
            let locInput = document.getElementById('homepage-location');
            let dateInput = document.getElementById('homepage-datePicker');

            if (!vm.locValid)
            {
                locInput.classList.add('invalid');
                $timeout(function()
                {
                    locInput.classList.remove('invalid');
                }, 1000);
            }

            if (!vm.dateValid)
            {
                dateInput.classList.add('invalid');
                $timeout(function()
                {
                    dateInput.classList.remove('invalid');
                }, 1000);
            }
        }
    }
})();
