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
            if ($localStorage.currentVoter === undefined){
                alert("Not yet registered. Redirecting..");
                window.location.href = "#!/reg";
                return;
            }
            var deferred = $q.defer();
            $http.get(urls.BARANGAY + $localStorage.barangay.id)
                .then(
                    function (response) {
                        $localStorage.elects = response.data;
                        deferred.resolve(response);
                    },
                    function (errResponse) {
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
            console.log(voter);
            $http({
                method:'PUT',
                url:urls.VOTER+voter.voterId,
                data: voter.elect,
                headers: {'Content-Type':'application/json'}
            }).then(
                    function(response){
                        deferred.resolve(response);
                    },
                    function (errResponse){
                        deferred.reject (errResponse);
                    }
                );
            return deferred.promise;
        }



    }]);