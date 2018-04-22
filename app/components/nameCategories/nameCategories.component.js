angular
    .module('app.nameCategories')
    .component('nameCategories', {
        templateUrl: 'app/components/nameCategories/nameCategories.template.html',
        controller: catCtrl,
        controllerAs: 'catCtrl'
    });

catCtrl.$inject = ['$scope', '$timeout', '$routeParams', 'dataService', '$log'];

function catCtrl($scope, $timeout, $routeParams, dataService, $log)
{
    let vm = this;
    vm.gender = $routeParams.gender;
    vm.imgSrcBase = 'app/assets/img/';
    vm.imgExt = '.png';
    vm.selectedCatsIsFull = false;

    $scope.gender = vm.gender;
    $scope.categories = [];
    $scope.selectedCatNames = [];
    $scope.btnClass = ['btn-' + vm.gender];
    $scope.catCardClass = null;
    $scope.loadingData = true;
    $scope.toggleCat = toggleCat;
    $scope.submit = submit;
    $scope.mouseenter = mouseenter;
    $scope.mouseleave = mouseleave;
    $scope.closeAlert = closeAlert;

    activate();

    function activate()
    {
        configNavBackBtn();
        dataService.getNameCategories()
            .then(function(data)
            {
                addCatImgPaths(data);
                $scope.categories = data;
                $scope.loadingData = false;
                showCatCards();
            });
    }

    function addCatImgPaths(data)
    {
        data.forEach(function(cat)
        {
            cat.img_path = vm.imgSrcBase + cat.cat_img + vm.imgExt;
        });
    }

    function showCatCards()
    {
        $timeout(function()
        {
            $scope.catCardClass = 'show';
        }, 100);
    }

    function configNavBackBtn()
    {
        let navBackBtn = document.querySelector('#top-navbar .navbar-back-btn');
        navBackBtn.classList.remove('d-none');
        navBackBtn.href = '#';
    }

    function submit()
    {
        dataService.setSelectedGender(vm.gender === 'boys' ? 'male' : 'female');
        dataService.setSelectedCategories($scope.selectedCatNames);
    }

    function mouseenter(cat)
    {
        if (catIsSelected(cat))
            toggleCatImgOverlayIcon(cat, 'cancel');
    }

    function mouseleave(cat)
    {
        if (catIsSelected(cat))
            toggleCatImgOverlayIcon(cat, 'checked');
    }

    function toggleCat(cat)
    {
        if (vm.selectedCatsIsFull && !catIsSelected(cat))
        {
            // the selected categories list is full and cat is clicked
            // show the alert message
            displayAlert();
        }

        else if (!catIsSelected(cat))
        {
            // category is not in the list
            // add the category to the selected list
            // change the overlay icon to checked
            // show the overlay icon always
            // darken the image
            addCat(cat.cat_name);
            toggleCatImgOverlayIcon(cat, 'checked');
            toggleCatImgOverlayOpacity(cat);
            toggleCatImageFilter(cat);
        }

        else
        {
            // category is already in the list
            // remove the category from the selected list
            // change the overlay icon to plus
            // show the overlay icon only on hover
            // toggle the image brightness
            removeCat(cat.cat_name);
            toggleCatImgOverlayIcon(cat, 'plus');
            toggleCatImgOverlayOpacity(cat);
            toggleCatImageFilter(cat);
        }
    }

    function catIsSelected(cat)
    {
        return $scope.selectedCatNames.includes(cat.cat_name);
    }

    function addCat(catName)
    {
        $scope.selectedCatNames.push(catName);
        if ($scope.selectedCatNames.length === 5)
        {
            vm.selectedCatsIsFull = true;
            $scope.btnClass[1] = 'show';
        }
    }

    function removeCat(catName)
    {
        if (alertIsDisplayed())
            closeAlert();
        $scope.selectedCatNames.splice($scope.selectedCatNames.indexOf(catName), 1);
        vm.selectedCatsIsFull = false;
        $scope.btnClass.splice(1, 1);
    }

    function toggleCatImageFilter(cat)
    {
        let catImg = document.querySelector('#cat-' + cat.cat_name + ' .img-container .cat-img');
        catImg.classList.toggle('img-dark');
    }

    function toggleCatImgOverlayIcon(cat, imgName)
    {
        let catImg = document.querySelector('#cat-' + cat.cat_name + ' .img-container .cat-img-overlay');
        catImg.src = vm.imgSrcBase + imgName + vm.imgExt;
    }

    function toggleCatImgOverlayOpacity(cat)
    {
        let catImgOverlay = document.querySelector('#cat-' + cat.cat_name + ' .img-container .cat-img-overlay');
        catImgOverlay.classList.toggle('show-icon');
    }

    function displayAlert()
    {
        if (!alertIsDisplayed())
        {
            // alert is not displayed
            // display the alert
            let alert = document.querySelector('#categories-alert .alert');
            alert.classList.remove('d-none');
            $timeout(function() {
                alert.classList.add('show-alert');
            }, 75);
        }
    }

    function closeAlert()
    {
        let alert = document.querySelector('#categories-alert .alert');
        alert.classList.remove('show-alert');
        $timeout(function() {
            alert.classList.add('d-none');
        }, 200);
    }

    function alertIsDisplayed()
    {
        let alert = document.querySelector('#categories-alert .alert');
        return alert && !alert.classList.contains('d-none');
    }
}