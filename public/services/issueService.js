angular.module('issueService', [])
	.factory('Issues', ['$http',function($http) {

		function githubsync(formData) {
			return $http.post('/githubsync',formData);
		}

		return {
			get : function() {
				return $http.get('/issues');
			},
			githubsync : githubsync
		}
	}]);