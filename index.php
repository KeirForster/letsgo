<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="special names app">
    <meta name="author" content="Keir Forster">

    <title>Special Names</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="app/assets/css/app.css" rel="stylesheet">
</head>

<body>
<div class="wrapper" ng-app="app">
    <main>
        <section ng-view></section>
    </main>
</div>


<!-- angular.js -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.min.js"></script>

<!-- Bootstrap core JavaScript -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>

<!-- font-awesome icons CSS -->
<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"
        integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+"
        crossorigin="anonymous"></script>

<!-- my scripts -->

<!-- main app -->
<script src="app/app.module.js"></script>
<script src="app/app.route.js"></script>

<!-- navbar -->
<script src="app/components/navbar/navbar.module.js"></script>
<script src="app/components/navbar/navbar.component.js"></script>

<!-- home page title -->
<script src="app/components/homeTitle/homeTitle.module.js"></script>
<script src="app/components/homeTitle/homeTitle.component.js"></script>

<!-- gender cards -->
<script src="app/components/genderCards/genderCards.module.js"></script>
<script src="app/components/genderCards/genderCards.component.js"></script>

<!-- name categories page title -->
<script src="app/components/categoryTitle/categoryTitle.module.js"></script>
<script src="app/components/categoryTitle/categoryTitle.component.js"></script>

<!-- name categories -->
<script src="app/components/nameCategories/nameCategories.module.js"></script>
<script src="app/components/nameCategories/nameCategories.component.js"></script>

<!-- name list title -->
<script src="app/components/nameListTitle/nameListTitle.module.js"></script>
<script src="app/components/nameListTitle/nameListTitle.component.js"></script>

<!-- name list -->
<script src="app/components/nameList/nameList.module.js"></script>
<script src="app/components/nameList/nameList.component.js"></script>

<!-- services -->
<script src="app/services/data.service.js"></script>
</body>
</html>
