angular.module('issueController', [])
.controller('issueController', ['$scope','$http','Projects','Issues', function($scope, $http, Projects, Issues)  {

        $scope.formData = {};
        $scope.highIssues = [];
        $scope.midIssues = [];
        $scope.lowIssues = [];
        $scope.ifNewIssuesAre = false;
        $scope.ifError = false;

        function checkPriority(issues){
            return issues.priority == this;
        }

        function refreshIssuesView(data) {
            $scope.issues = data.filter(checkPriority, "undone");
            $scope.highIssues = data.filter(checkPriority, "high");
            $scope.midIssues = data.filter(checkPriority, "mid");
            $scope.lowIssues = data.filter(checkPriority, "low");
            $scope.issues.length == 0 ? $scope.ifNewIssuesAre = false : $scope.ifNewIssuesAre = true;
        }

        $scope.closeError = function () {
            $scope.ifError = false;
        }
     
        $scope.sync = function(){
           Issues.githubsync($scope.formData).success(function(data) {

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
        
        $scope.update = function() {
            $scope.selectedProject = $scope.selectedItem.alias;
            Issues.issueByProject({text: $scope.selectedItem.url}).success(function(data) {
                refreshIssuesView(data);
            });

        }
    
        $scope.add = function () {
            $scope.ifAdd == true ? $scope.ifAdd = false : $scope.ifAdd = true;
        }

        $scope.onDragUndoneSuccess = function(data,evt){
            var index = $scope.issues.indexOf(data);
            if (index > -1) {
                $scope.issues.splice(index, 1);
                if($scope.issues.length == 0){
                    $scope.ifNewIssuesAre = false;
                }
            }


        }

        $scope.onDropInHighPriorityComplete = function (data, evt) {
            var index = $scope.highIssues.indexOf(data);
            if (index == -1) {
                Issues.update({id: data.id, priority: "high"}).success(function(data) {
                    data.priority = "high";
                    $scope.highIssues.push(data);
                });
            }
        }

        $scope.onDragInHighPrioritySuccess = function(data,evt){
            var index = $scope.highIssues.indexOf(data);
            if (index > -1) {
                $scope.highIssues.splice(index, 1);
            }
        }



        $scope.onDropInMidPriorityComplete = function (data, evt) {
            var index = $scope.midIssues.indexOf(data);
            if (index == -1) {
                Issues.update({id: data.id, priority: "mid"}).success(function(data) {
                    data.priority = "mid";
                    $scope.midIssues.push(data);
                });
            }
        }

        $scope.onDragInMidPrioritySuccess = function(data,evt){
            var index = $scope.midIssues.indexOf(data);
            if (index > -1) {
                $scope.midIssues.splice(index, 1);
            }
        }


        $scope.onDropInLowPriorityComplete = function (data, evt) {
            var index = $scope.lowIssues.indexOf(data);
            if (index == -1) {
                Issues.update({id: data.id, priority: "low"}).success(function(data) {
                    data.priority = "low";
                    $scope.lowIssues.push(data);
                });
            }
        }

        $scope.onDragInLowPrioritySuccess = function(data,evt){
            var index = $scope.lowIssues.indexOf(data);
            if (index > -1) {
                $scope.lowIssues.splice(index, 1);
            }
        }


}]);
