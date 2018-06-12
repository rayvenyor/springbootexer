'use strict';

angular.module('myApp')
    .factory('VoteService',
    ['$localStorage','$http','$q','$state','urls', function($localStorage,$http,$q,$state,urls){

        var factory = {
            getElectsByBarangay: getElectsByBarangay,
            updateVote: updateVote,
            getElects: getElects
        };


        return factory;


        function getElectsByBarangay(){

            var deferred = $q.defer();

            $http.get(urls.BARANGAY)
                .then(
                    function(response){
                        $localStorage.elects = response.data.elects; //TODO: change to var name of elects in side barangay
                        deferred.resolve(response);
                    },
                    function(errResponse){
                        console.log("Error in retrieving data");
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function getElects(){
            return $localStorage.elects;
        }

        function updateVote(voter){
            var deferred = $q.defer();

            $http.put(urls.VOTER, voter)
                .then(
                    function(response){
                        $state.go('vote');
                        deferred.resolve(response);
                    },
                    function (errResponse){
                        deferred.reject (errResponse);
                    }
                );
            return deferred.promise;
        }




    }]);