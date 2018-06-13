'use strict';

angular.module('myApp')
.factory('VoteService',
    ['$localStorage','$q','urls','$http','$state', function ($localStorage, $q, urls, $http, $state){

    var factory = {
        getElectsByBarangay: getElectsByBarangay
    };

    return factory;

    function getElectsByBarangay(barangay){
        var deferred = $q.defer();
        $http.get(urls.BARANGAY + barangay.id)
            .then(
                function (response) {
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.log("Error in retrieving data");
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }



    }]);