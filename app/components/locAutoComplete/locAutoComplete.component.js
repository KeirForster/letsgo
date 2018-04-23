(function()
{
    angular
        .module('app.locAutoComplete')
        .component('locationAutocomplete', {
            templateUrl: 'app/components/locAutoComplete/locAutoComplete.template.html',
            controller : controller
        });

    controller.$inject = ['$scope', '$log'];

    function controller($scope, $log)
    {
        let vm = this;
        vm.autocomplete = null;
        $scope.geoLocate = geoLocate;
        $scope.extractAddressParams = extractAddressParams;
        $scope.curPlace = null;

        activate();

        function activate()
        {
            initAutoComplete();
        }

        function initAutoComplete()
        {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            vm.autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('locAutoComplete')),
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

            for (let i = 0; i < place.address_components.length; i++)
            {
                let addressType = place.address_components[i].types[0];
                let val = place.address_components[i][componentForm[addressType]];
                $log.info(addressType + ': ', val);
            }
            $log.info('\n');
        }
    }
})();
