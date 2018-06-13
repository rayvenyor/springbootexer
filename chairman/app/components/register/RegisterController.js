'use strict';

angular.module('myApp')
.controller('RegisterController',
    ['RegisterService','$scope','$localStorage','$state', function(RegisterService, $scope,$localStorage, $state){

        var self = this;
        self.voter = {};

        self.submit = submit;
        self.populateBarangay = populateBarangay;
        self.registerVoter = registerVoter;
        self.getBarangayByName = getBarangayByName;
        self.getVoterId = getVoterId;

        self.test = function(){
            $state.go("vote");
        };

        function submit(){
            console.log("Start: submit()");
            var x = confirm("Click Yes to confirm")
            if (x){
                $localStorage.barangay = self.voter.barangay;
                $localStorage.currentVoter = self.voter;
                console.log("what");
                getBarangayByName();
                registerVoter(self.voter);
            }
            console.log("End: submit()");
        }

        function getVoterId(){
            console.log("Start: getVoterId()");
            RegisterService.getVoterIdByLastName($localStorage.currentVoter.lastname)
                .then(
                    function(response){
                        $localStorage.currentVoter.voterId = response.data.voterId;
                    },
                    function (errResponse){
                        console.error("Error in getting voter");
                    }
                );
            console.log ("End: getVoterId()");
        }

        function getBarangayByName(){
            console.log("Start: getBarangayByName()");
            RegisterService.getBarangayByName()
                .then(
                    function(response){
                        $localStorage.barangay = response.data[0];
                    },
                    function(errResponse){
                        console.error("Error in getting barangay");
                    }
                );
            console.log("End: getBarangayByName()");
        }

        function populateBarangay(){
            return RegisterService.getAllBarangays();
        }

        function registerVoter(voter){
            console.log ("Start: registerVoter()");
            RegisterService.registerUser(voter)
                .then(
                    function(response){
                        console.log ("Registering of Voter success");
                        localStorage.removeItem('elects');
                        getVoterId();
                        $state.go("vote");

                    },
                    function(errResponse){
                        console.error("Error while registering user");
                    }
                );


            console.log ("End: registerVoter()");
        }
    }]);