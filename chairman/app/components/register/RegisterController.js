'use strict';

angular.module('myApp')
.controller('RegisterController',
    ['RegisterService','$scope', function(RegisterService, $scope){

        var self = this;
        self.voter = {};
        self.barangays = {};
        self.submit = submit;
        self.populateBarangay = populateBarangay;
        self.registerVoter = registerVoter;

        function submit(){
            console.log("Start: submit()");
            var x = confirm("Click Yes to confirm")
            if (x){
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
                        console.log ("Registering of Voter success");
                        //redirect to voting page...
                    },
                    function(errResponse){
                        console.log ("Error while registering user");
                    }
                );


            console.log ("End: registerVoter()");
        }
    }]);