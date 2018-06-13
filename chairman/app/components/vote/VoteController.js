'use strict';
angular.module('myApp')
.controller('VoteController',
    ['VoteService','$scope','$state','$localStorage', function(VoteService,$scope,$state,$localStorage){


        var self = this;
        self.voter = {};
        self.elects = [];

        self.chosenElect = {};

        self.updateVote = updateVote;
        self.getElects = getElects;
        self.submit = submit;
        function submit() {
            console.log("Start: submit()");
            var x = confirm("Are you sure you want to vote for this candidate?");
            if (x) {
                if (JSON.stringify(self.chosenElect).length > 2) {
                    updateVote();
                } else {
                    alert("Please choose a candidate");
                }
            } else {
            }
            console.log("End: submit()");
        }

        function getElects() {
            return VoteService.getElects();
        }

        function updateVote() {
            self.voter = $localStorage.currentVoter;
            self.voter.elect = self.chosenElect;
            VoteService.updateVote(self.voter)
                .then(
                    function (response) {
                        alert("Thank you for voting!");
                        $state.go("results");
                        console.log("Successfully updated voter's candidate..");
                    },
                    function (errResponse) {
                        console.error("Error while updating vote");
                    }
                );
        }
    }]);