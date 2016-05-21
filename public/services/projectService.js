angular.module('projectService', [])
    .factory('Projects', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/projects');
            }
        }
    }]);