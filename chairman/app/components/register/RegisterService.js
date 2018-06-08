'use strict';

angular.module('myApp')
.factory('RegisterService',
    ['$localStorage','$http','$q','urls', function($localStorage,$http,$q,urls){

    var factory = {
        registerUser: registerUser
    };

    return factory;

    function registerUser (user){
        console.log ("RegisterService.registerUser() start");
        var deferred = $q.defer();
        $http.post(urls.BASE+'reg', user)
            .then(
                function(response){
                    console.log("Successfully registered user");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error("Error while resolving: "+errResponse.data.errorMessage);
                    deferred.reject(response);
                }
            );
        console.log ("RegisterService.registerUser() end");
        return deferred.promise;
    }

    function updateVoterElect(elect){

    }

    }]);
