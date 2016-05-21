angular.module('issueController', [])
.controller('issueController', ['$scope','$http','Issues', function($scope, $http, Issues)  {

        $scope.formData = {};

        Issues.get()
            .success(function(data) {
                $scope.issues = data;
            });

        $scope.sync = function(){
           Issues.githubsync($scope.formData).success(function(data) {
                    $scope.issues = data;
                });
        }

}]);
