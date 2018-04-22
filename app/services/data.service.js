angular
    .module('app')
    .factory('dataService', dataService);

dataService.$inject = ['$http', '$q', '$log'];

function dataService($http, $q, $log)
{
    let selectedGender = null;
    let selectedCategories = null;

    return {
        getNames: getNames,
        getNameCategories: getNameCategories,
        setSelectedGender: setSelectedGender,
        getSelectedGender: getSelectedGender,
        setSelectedCategories: setSelectedCategories,
        getSelectedCategories: getSelectedCategories
    };

    function setSelectedGender(gender)
    {
        selectedGender = gender;
    }

    function getSelectedGender()
    {
        return selectedGender ? $q.defer().resolve(selectedGender) : $q.reject('gender not set');
    }

    function setSelectedCategories(selCategories)
    {
        selectedCategories = selCategories;
    }

    function getSelectedCategories()
    {
        return selectedCategories ? $q.resolve(selectedCategories) : $q.reject('categories not set');
    }

    function getNames()
    {
        return $http.get('app/db/dataService.php', {
            params: {
                request: 'getNames',
                catNames: selectedCategories ? selectedCategories.toString() : null,
                gender: selectedGender
            }
        })
        .then(getNamesComplete)
        .catch(getNamesFailed);

        function getNamesComplete(response)
        {
            return response.data;
        }

        function getNamesFailed(error) {
            var newMessage = 'XHR Failed for getNames';
            if (error.data && error.data.description)
            {
                newMessage = newMessage + '\n' + error.data.description;
                error.data.description = newMessage;
            }
            // $log.error(newMessage);
            return $q.reject(error);
        }
    }

    function getNameCategories()
    {
        return $http.get('app/db/dataService.php', { params: { request: 'getNameCategories' } })
            .then(getNameCatsComplete)
            .catch(getNameCatsFailed);

        function getNameCatsComplete(response)
        {
            return response.data;
        }

        function getNameCatsFailed(error) {
            var newMessage = 'XHR Failed for getNameCategories';
            if (error.data && error.data.description)
            {
                newMessage = newMessage + '\n' + error.data.description;
                error.data.description = newMessage;
            }
            // $log.error(newMessage);
            return $q.reject(error);
        }
    }
}
