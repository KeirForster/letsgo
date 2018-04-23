(function()
{
    angular
        .module('app.eventCategories')
        .component('eventCategories', {
            templateUrl: 'app/components/eventCategories/eventCategories.template.html',
            controller : controller,
        });

    controller.$inject = ['$scope', '$timeout', 'dataService', '$log'];

    function controller($scope, $timeout, dataService, $log)
    {
        let vm = this;
        vm.imgSrcBase = 'app/assets/img/';
        vm.imgExt = '.png';
        vm.selectedCat = null;
        vm.eventDate = null;
        vm.eventLoc = null;

        $scope.catCardClass = null;
        $scope.submitBtnClass = null;
        $scope.categories = null;
        $scope.toggleCat = toggleCat;
        $scope.mouseenter = mouseenter;
        $scope.mouseleave = mouseleave;
        $scope.submit = submit;

        activate();

        function activate()
        {
            initCategories();
            showCatCards();

            dataService.getEventLoc()
            .then(function(data)
            {
                vm.eventLoc = data;
                return dataService.getEventDate();
            })
            .then(function(data)
            {
                vm.eventDate = data;
            })
            .catch(function(error)
            {
                $log.error('eventCategories controller: ' + error);
            })
        }

        function initCategories()
        {
            let categories =
            [
                {name: "Comedy", id: "comedy", img: "comedy"},
                {name: "Concerts", id: "music", img: "concerts"},
                {name: "Film", id: "movies_film", img: "film"},
                {name: "Food & Wine", id: "food", img: "food"},
                {name: "Health", id: "support", img: "health"},
                {name: "Holiday", id: "holiday", img: "holiday"},
                {name: "Neighborhood", id: "community", img: "neighborhood"},
                {name: "Nightlife", id: "singles_social", img: "nightlife"},
                {name: "Outdoors", id: "outdoors_recreation", img: "outdoors"},
                {name: "Science", id: "science", img: "science"},
                {name: "Sports", id: "sports", img: "soccer-boots"},
                {name: "Technology", id: "technology", img: "technology"},
            ];
            categories.forEach(function(cat)
            {
                cat.imgPath = vm.imgSrcBase + cat.img + vm.imgExt;
            });
            $scope.categories = categories;
        }

        function submit()
        {
            dataService.setEventCategory(getSelectedCat(vm.selectedCat));
        }

        function getSelectedCat(catName)
        {
            for (let i = 0; i < $scope.categories.length; i++)
                if ($scope.categories[i].id == catName)
                    return $scope.categories[i];
            $log.error('getSelectedCat() not found in app.eventCategories.controller');
            return null;
        }

        function showCatCards()
        {
            $timeout(function()
            {
                $scope.catCardClass = 'show';
            }, 100);
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
            if (vm.selectedCat != null && !catIsSelected(cat))
            {
                // the selected categories list is full and cat is clicked
                // show the alert message
                // displayAlert();
            }

            else if (vm.selectedCat == null)
            {
                // category is not in the list
                // add the category to the selected list
                // change the overlay icon to checked
                // show the overlay icon always
                // darken the image
                addCat(cat.id);
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
                removeCat();
                toggleCatImgOverlayIcon(cat, 'plus');
                toggleCatImgOverlayOpacity(cat);
                toggleCatImageFilter(cat);
            }
        }

        function catIsSelected(cat)
        {
            return vm.selectedCat != null && vm.selectedCat === cat.id;
        }

        function toggleCatImgOverlayIcon(cat, imgName)
        {
            let catImgOverlay = document.querySelector('#cat-' + cat.id + ' .card-wrapper .img-container .cat-img-overlay');
            catImgOverlay.src = vm.imgSrcBase + imgName + vm.imgExt;
        }

        function toggleCatImgOverlayOpacity(cat)
        {
            let catImgOverlay = document.querySelector('#cat-' + cat.id + ' .card-wrapper .img-container .cat-img-overlay');
            catImgOverlay.classList.toggle('show-icon');
        }

        function toggleCatImageFilter(cat)
        {
            let catImg = document.querySelector('#cat-' + cat.id + ' .card-wrapper .img-container .cat-img');
            catImg.classList.toggle('img-dark');
        }

        function addCat(catId)
        {
            vm.selectedCat = catId;
            $scope.submitBtnClass = 'show';
        }

        function removeCat()
        {
            vm.selectedCat = null;
            $scope.submitBtnClass = null;
        }
    }
})();
