angular
    .module('app')
    .config(config);

config.$inject = ['$locationProvider', '$routeProvider'];

function config($locationProvider, $routeProvider)
{
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/',
        {
            template:'<homepage-form></homepage-form>'
        })
        .when('/eventcategories',
        {
            template: '<event-title></event-title>' +
                    '<event-categories></event-categories>'
        })
        .when('/eventcategories/view',
        {
            template: '<event-list></event-list>'
        })
        .otherwise('/');
}
