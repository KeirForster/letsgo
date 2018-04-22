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
            template:'<app-nav></app-nav>' +
                    '<home-title></home-title>' +
                    '<gender-cards></gender-cards>'
        })
        .when('/:gender/categories',
        {
            template: '<app-nav></app-nav>' +
                    '<category-title></category-title>' +
                    '<name-categories></name-categories>'
        })
        .when('/:gender/categories/submit',
        {
            template: '<app-nav></app-nav>' +
                    '<name-list-title></name-list-title>' +
                    '<name-list></name-list>'
        })
        .otherwise('/');
}
