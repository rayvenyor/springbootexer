'use strict';

angular.module('myApp')
.factory('RegisterService',
    ['$localStorage','$http','$q','urls', function($localStorage,$http,$q,urls){

    var factory = {
        registerUser: registerUser,
        populateListofBarangays: populateListofBarangays,
        getAllBarangays :getAllBarangays
    };

    return factory;

    function populateListofBarangays(){
        var deferred = $q.defer();
        $http.get(urls.BARANGAY)
            .then(
                function(response){
                    console.log(response.data);
                    $localStorage.barangays = response.data;
                    deferred.resolve(response);
                },
                function (errResponse){
                    console.error ("Error in retrieving data");
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getAllBarangays(){
        return $localStorage.barangays;
    }

    function registerUser (voter){
        console.log ("start: RegisterService.registerUser()");

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        var deferred = $q.defer();

        $http({
            method:'POST',
            url:urls.VOTER,
            data:JSON.stringify(voter),
            headers: {'Content-Type':'application/json'}
        })
            .then(
                function(response){
                    console.log("Successfully registered user");
                    $localStorage.currentUser = voter;
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error("Error while resolving: "+errResponse.data);
                    deferred.reject(errResponse);
                }
            );
        console.log ("RegisterService.registerUser() end");
        return deferred.promise;
    }

    function updateVoterElect(elect){

    }

    }]);
