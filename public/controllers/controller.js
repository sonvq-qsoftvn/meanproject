/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('contactListApp', []);
app.controller('AppCtrl', function($scope, $http) {
    console.log("Hello world from controller");
    
    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
        });
    }
    
    refresh();
    
    
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    }
});