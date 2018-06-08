'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.router','ngStorage']);
    app.constant('urls',{
        BASE: "http://localhost:8000/app/"
    });
    app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/reg");
    $stateProvider
        .state("register", {
            url: "/reg",
            templateUrl:"components/register/register.html",
            controller: "RegisterController",
            controllerAs: 'regctrl'
        });

    $urlRouterProvider.otherwise("/reg");

}]);
