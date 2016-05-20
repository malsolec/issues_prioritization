angular.module('issueService', [])
	.factory('Issues', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/issues');
			},
			githubsync : function(formData) {
				return $http.get('/githubsync',formData);
			}
		}
	}]);