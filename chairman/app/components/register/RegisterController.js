'use strict';

angular.module('myApp')
.controller('RegisterController',
    ['RegisterService','$scope','$localStorage', function(RegisterService, $scope,$localStorage){

        var self = this;
        self.voter = {};

        self.submit = submit;
        self.populateBarangay = populateBarangay;
        self.registerVoter = registerVoter;

        function submit(){
            console.log("Start: submit()");
            var x = confirm("Click Yes to confirm")
            if (x){
                $localStorage.barangay = self.voter.barangay;
                $localStorage.currentVoter = self.voter;
                registerVoter(self.voter);
            }
            console.log("End: submit()");
        }

        function populateBarangay(){
            return RegisterService.getAllBarangays();
        }

        function registerVoter(voter){
            console.log ("Start: registerVoter()");
            RegisterService.registerUser(voter)
                .then(
                    function(response){
                        $localStorage.removeItem('elects');
                        //TODO: redirect to vote page
                        console.log ("Registering of Voter success");

                    },
                    function(errResponse){
                        console.error("Error while registering user");
                    }
                );


            console.log ("End: registerVoter()");
        }
    }]);