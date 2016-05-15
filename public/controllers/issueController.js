angular.module('issueController', [])
.controller('mainController', ['$scope','$http','Issues', function($scope, $http, Issues)  {


    Issues.get()
            .success(function(data) {
                $scope.issues = data;
            });

    $scope.sync = function(){
       Issues.githubsync().success(function(data) {
                $scope.issues = data;
            });
    } 

}]);
