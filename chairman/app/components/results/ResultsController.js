'use strict';

angular.module('myApp')
.controller('ResultsController',
    ['ResultsService','RegisterService','$scope','$state','$localStorage',function (ResultsService,RegisterService,$scope,$state,$localStorage){

    var self = this;
    self.currentBarangay = ($localStorage.barangay !== undefined)? $localStorage.barangay : "";
    self.currentelects = null;

    self.getBarangayByName = getBarangayByName;
    self.getElectsByBarangay = getElectsByBarangay;

    function getElectsByBarangay(){
        ResultsService.getElectsByBarangay($localStorage.currentbarangay)
            .then(
                function (response) {
                    self.currentelects = response.data;
                    console.log("Successfully retrieved elects.");
                },
                function (errResponse) {
                    console.log("Error");
                }
            );
    }

    function getBarangayByName(){
        RegisterService.getBarangayByName(self.currentBarangay)
            .then(
                function(response){
                    $localStorage.currentbarangay = response.data[0];
                    self.currentbarangay = response.data[0].barangay;
                },
                function(errResponse){
                    console.error("Error in getting barangay");
                }
            );
        console.log("End: getBarangayByName()");
    }


    }]);