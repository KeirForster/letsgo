<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Keir Forster">

    <title>Let's Go</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="app/assets/css/app.css" rel="stylesheet">

    <!-- Bootstrap date picker -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.6/combined/css/gijgo.min.css" />

</head>
<body>
<div class="wrapper" ng-app="app">
    <navbar></navbar>
    <main ng-view></main>
</div>

<!-- angular.js -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.min.js"></script>

<!-- Bootstrap core JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
        integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
        integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>

<!-- font-awesome icons CSS -->
<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"
        integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+"
        crossorigin="anonymous"></script>

<!-- Google maps js -->
<script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgtBPaE9dibaROaiawYcekiYai6tWdQcE&libraries=places"></script>

<!-- date picker -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.6/combined/js/gijgo.min.js"></script>

<!-- Events JS API -->
<script type="text/javascript" src="http://api.eventful.com/js/api"></script>

<!-- my scripts -->

<!-- main app -->
<script src="app/app.module.js"></script>
<script src="app/app.route.js"></script>

<!-- navbar -->
<script src="app/components/navbar/navbar.module.js"></script>
<script src="app/components/navbar/navbar.component.js"></script>

<!-- main form -->
<script src="app/components/homepageForm/homepageForm.module.js"></script>
<script src="app/components/homepageForm/homepageForm.component.js"></script>

<!-- location auto-complete form -->
<script src="app/components/locAutoComplete/locAutoComplete.module.js"></script>
<script src="app/components/locAutoComplete/locAutoComplete.component.js"></script>

<!-- date picker form -->
<script src="app/components/datePicker/datePicker.module.js"></script>
<script src="app/components/datePicker/datePicker.component.js"></script>

<!-- event categories title -->
<script src="app/components/eventTitle/eventTitle.module.js"></script>
<script src="app/components/eventTitle/eventTitle.component.js"></script>

<!-- event categories -->
<script src="app/components/eventCategories/eventCategories.module.js"></script>
<script src="app/components/eventCategories/eventCategories.component.js"></script>

<!-- event list -->
<script src="app/components/eventList/eventList.module.js"></script>
<script src="app/components/eventList/eventList.component.js"></script>

<!-- services -->
<script src="app/services/data.service.js"></script>
</body>
</html>
