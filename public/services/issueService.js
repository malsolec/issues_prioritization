angular.module('issueService', [])
	.factory('Issues', ['$http',function($http) {

		function githubSync(data) {
			return $http.post('/githubsync',data);
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
			githubSync : githubSync,
			issueByProject : issueByProject,
			update : update
		}
	}]);