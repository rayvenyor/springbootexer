'use strict';

angular.module('myApp')
.factory('RegisterService',
    ['$localStorage','$http','$q','urls', function($localStorage,$http,$q,urls){

    var factory = {
        registerUser: registerUser,
        populateListofBarangays: populateListofBarangays,
        getAllBarangays :getAllBarangays,
        getBarangayByName: getBarangayByName,
        getVoterIdByLastName: getVoterIdByLastName
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

    function getBarangayByName(){
        var deferred = $q.defer();

        $http.get(urls.BARANGAY+"?name="+$localStorage.barangay)
            .then(
                function(response){
                    deferred.resolve(response);
                },
                function(errResponse){
                    console.error("Error in retrieving data");
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
                    deferred.resolve(response);
                },
                function(errResponse){
                    console.error("Error while resolving: "+errResponse.data);
                    deferred.reject(errResponse);
                }
            );
        console.log ("RegisterService.registerUser() end");
        return deferred.promise;
    }

    function getVoterIdByLastName (lastname){
        console.log ("start: RegisterService.GetVoterIdByLastName");
        var deferred = $q.defer();

        $http.get(urls.VOTER+lastname)
            .then(
                function(response){
                    console.log("Successfully got Id");
                    deferred.resolve(response);
                },
                function (errResponse){
                    deferred.reject(errResponse);
                }
            );

        console.log ("end: RegisterService.GetVoterIdByLastName");
        return deferred.promise;
    }

    }]);
