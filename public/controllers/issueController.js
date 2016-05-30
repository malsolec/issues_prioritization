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

                    if(data.error){
                       $scope.ifError = true;
                       $scope.error = data.error;
                   }
                   var url = $scope.formData.text;
                   var newAlias = url.split('/')[5];
                   $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
                   $scope.selectedProject = newAlias;
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
                });


        }

        Projects.get()
            .success(function(data) {
                $scope.projects = data;
            });
        
        $scope.chooseProject = function() {
            $scope.selectedProject = $scope.selectedItem.alias;
            Issues.issueByProject({text: $scope.selectedItem.url}).success(function(data) {
                refreshIssuesView(data);
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
