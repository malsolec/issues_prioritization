angular.module('projectController', [])
    .controller('projectController', ['$scope','$http','Projects','Issues', function($scope, $http, Projects, Issues)  {

        Projects.get()
            .success(function(data) {
                $scope.projects = data;
            });

        $scope.$watch(function () { return Issues.githubsync }, function () {
            Projects.get()
                .success(function(data) {
                    $scope.projects = data;
                });
        });

    }]);
