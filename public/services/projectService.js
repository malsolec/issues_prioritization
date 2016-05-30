angular.module('projectService', [])
    .factory('Projects', ['$http',function($http) {

        function get() {
            return $http.get('/projects');
        }
        
        return {
            get : get
        }
    }]);