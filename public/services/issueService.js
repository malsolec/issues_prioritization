angular.module('issueService', [])
	.factory('Issues', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/issues');
			},
			githubsync : function() {
				return $http.get('/githubsync');
			}
		}
	}]);