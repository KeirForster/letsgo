angular
    .module('app.nameListTitle')
    .component('nameListTitle', {
        templateUrl: 'app/components/nameListTitle/nameListTitle.template.html',
        controller: nameListTitleCtrl,
        controllerAs: 'nameListTitleCtrl'
    });

nameListTitleCtrl.$inject = ['$scope', '$routeParams', 'dataService', '$log'];

function nameListTitleCtrl($scope, $routeParams, dataService, $log)
{

}