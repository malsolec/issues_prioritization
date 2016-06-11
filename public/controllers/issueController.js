angular.module('issueController', [])
.controller('issueController', ['$scope','$http','Projects','Issues', function($scope, $http, Projects, Issues)  {

        $scope.formData = {};
        $scope.ifNewIssuesAre = false;
        $scope.ifError = false;

        function checkPriority(issues){
            return issues.priority == this;
        }

        function refreshIssuesView(data) {
            $scope.issues = data;
            data.filter(checkPriority, "undone").length == 0 ? $scope.ifNewIssuesAre = false : $scope.ifNewIssuesAre = true;
        }

        $scope.closeError = function () {
            $scope.ifError = false;
        }
     
        $scope.sync = function(){
           Issues.githubSync($scope.formData).success(function(data) {

               if(!data.repoNotFoundError){
                   if(data.alreadyExistsError){
                       $scope.ifError = true;
                       $scope.error = data.alreadyExistsError;
                   }
                   else{
                       $scope.ifError = false;
                   }

                   var url =  "https://api.github.com/repos/".concat($scope.formData.repoOwnerName,"/",$scope.formData.repoName, "/issues")
                   $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
                   $scope.selectedProject = $scope.formData.repoName;
                   Projects.get()
                       .success(function(data) {
                           $scope.projects = data;
                           $scope.selectedItem = data.find(function (project) {
                               return project.url == url;
                           })
                       });
                   Issues.issueByProject({text: url}).success(function(data) {
                       refreshIssuesView(data);
                   });

                }
               else{
                    $scope.ifError = true;
                    $scope.error = data.repoNotFoundError;
                }
        })
        };

        Projects.get()
            .success(function(data) {
                $scope.projects = data;
            });
        
        $scope.chooseProject = function() {
            $scope.selectedProject = $scope.selectedItem.alias;
            Issues.issueByProject({text: $scope.selectedItem.url}).success(function(data) {
                refreshIssuesView(data);
                $scope.ifAdd = false;
                $scope.ifError = false;
            });

        }
    
        $scope.add = function () {
            $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
        }

        $scope.onDropInPriorityComplete = function (data, evt, priority) {
            var index = $scope.issues.indexOf(data);
            if (index == -1) {
                Issues.update({id: data.id, priority: priority}).success(function(data) {
                    data.issues = priority;
                    $scope.issues.push(data);
                });
            }
        }

        $scope.onDragInPrioritySuccess = function(data,evt){
            var index = $scope.issues.indexOf(data);
            if (index > -1) {
                $scope.issues.splice(index, 1);
                if($scope.issues.filter(checkPriority, "undone").length == 0 ){
                    $scope.ifNewIssuesAre = false;
                }
            }
        }


}]);
