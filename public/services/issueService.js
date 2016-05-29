angular.module('issueService', [])
	.factory('Issues', ['$http',function($http) {

		function githubsync(formData) {
			return $http.post('/githubsync',formData);
		}

		function issueByProject(data) {
			return $http.post('/issueByProject', data);
		}
		function get() {
			return $http.get('/issues');
		}
		
		function update(data) {
			return $http.post('/issueUpdate', data);
		}

		return {
			get : get,
			githubsync : githubsync,
			issueByProject : issueByProject,
			update : update
		}
	}]);