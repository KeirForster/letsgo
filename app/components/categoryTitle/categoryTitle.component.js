angular
    .module('app.categoryTitle')
    .component('categoryTitle', {
        templateUrl: 'app/components/categoryTitle/categoryTitle.template.html',
        controller: catTitleCtrl,
        controllerAs: 'catTitleCtrl'
    });

catTitleCtrl.$inject = ['$scope', '$routeParams'];

function catTitleCtrl($scope, $routeParams)
{
    var vm = this;
    vm.gender = $routeParams.gender;
    $scope.bgClass = [vm.gender + '-title'];
    $scope.gender = vm.gender;
}