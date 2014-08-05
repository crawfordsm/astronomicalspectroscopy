
var app = angular.module('project', ['firebase', 'ngRoute']);

app.controller("AppCtrl",  function($firebase, $location) {
    // now we can use $firebase to synchronize data between clients and the server!
    var ref = new Firebase("https://astronomicalspectroscopy.firebaseio.com/");
    var sync = $firebase(ref);
    this.list = sync.$asArray();
    console.log("list has " + this.list.length + " items");


    this.save = function () {
      this.project.qid=1;
      d=new Date();
      this.project.date = d;
      console.log('Current Date:' +d);
      console.log(this.project);
      this.list.$add(this.project)
      $location.path("/q1finish")
      
   };
});


app.config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'q1.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
        })
        .when('/q1finish', {
          templateUrl: 'q1finish.html',
        })
        .otherwise({redirectTo:'q1finish.html'})

  }]);



