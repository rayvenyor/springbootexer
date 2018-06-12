'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.router','ngStorage']);
    app.constant('urls',{
        BASE: "http://localhost:8080/",
        BARANGAY: "http://localhost:8080/barangay/",
        VOTER: "http://localhost:8080/voter/",
        ELECT: "http://localhost:8080/elect/"
    });
    app.config(["$stateProvider", "$urlRouterProvider","$httpProvider",
    function($stateProvider, $urlRouterProvider,$httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};


    $urlRouterProvider.when("","/reg");
    $stateProvider
        .state("register", {
            url: "/reg",
            templateUrl:"components/register/register.html",
            controller: "RegisterController",
            controllerAs: 'regctrl',
            resolve: {
                barangays: function ($q, RegisterService){
                    console.log("Loading all barangays");
                    var deferred = $q.defer();
                    RegisterService.populateListofBarangays().then(deferred.resolve,deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .state("vote",{
            url: "/vote",
            templateUrl:"components/vote/vote.html",
            controller: "VoteController",
            controllerAs: 'votectrl',
            resolve: {
                elects: function ($q, VoteService){
                    console.log("Loading all elects in barangay");
                    var deferred = $q.defer();
                    VoteService.getElectsByBarangay().then(deferred.resolve,deferred.resolve);
                    return deferred.promise;
                }
            }
        });

    $urlRouterProvider.otherwise("/reg");

}]);
