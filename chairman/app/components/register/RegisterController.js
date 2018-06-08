'use strict';

angular.module('myApp')
.controller('RegisterController',
    ['RegisterService','$scope', function(UserService, $scope){

        var self = this;
        self.voter = {};

        function submit(){
            console.log("Start: submit()");
            if (1/*check if duplicate entry*/){
                /*Create voter*/
            }
            console.log("End: submit()");
        }

        function registerVoter(voter){
            console.log ("Start: registerVoter()");
            /*Call RegisterService*/


            console.log ("End: registerVoter()");
        }
    }]);