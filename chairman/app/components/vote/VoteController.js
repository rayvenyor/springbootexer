'use strict';
//TODO: clear SESSIONS (barangay current, voter current)
angular.module('myApp')
.controller('VoteController',
    ['VoteService','$scope',function(VoteService,$scope){


    var self = this;
    self.voter = {};
    self.elects = [];

    self.chosenElect = {};

    self.updateVote = updateVote;
    self.getElects = getElects;
    self.submit = submit;

    function submit(){
        console.log("Start: submit()");
        var x = confirm("Click Yes to confirm")
        if (x){
            updateVote();
        }
        console.log("End: submit()");
    }

    function getElects(){
        return VoteService.getElects();
    }

    function updateVote(){
        self.voter = $localStorage.currentVoter;
        self.voter.elect = self.chosenElect;
        VoteService.updateVote(self.voter)
            .then(
                function(response){
                    //TODO: redirect to results page
                    console.log("Successfully updated voter's candidate..");
                },
                function (errResponse){
                    console.error("Error while updating vote");
                }
            )
    }
    }]);