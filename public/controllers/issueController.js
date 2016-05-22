angular.module('issueController', [])
.controller('issueController', ['$scope','$http','Projects','Issues', function($scope, $http, Projects, Issues)  {

        $scope.formData = {};

        Issues.get()
            .success(function(data) {
                $scope.issues = data;
            });

        $scope.sync = function(){
           Issues.githubsync($scope.formData).success(function(data) {
                    $scope.issues = data;
                   var url = $scope.formData.text;
                   var newAlias = url.split('/')[5];
                   $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
                   $scope.selectedProject = newAlias;
                   Projects.get()
                       .success(function(data) {
                           $scope.projects = data;
                       });
                });


        }

        Projects.get()
            .success(function(data) {
                $scope.projects = data;
            });
        
        $scope.update = function() {
            $scope.selectedProject = $scope.selectedItem.alias;
            Issues.issueByProject({text: $scope.selectedItem.url}).success(function(data) {
                $scope.issues = data;
            });

        }
    
        $scope.add = function () {
            $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
        }

}]);
