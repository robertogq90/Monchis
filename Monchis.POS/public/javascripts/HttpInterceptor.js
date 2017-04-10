angular.module('HttpInterceptorFactory', []).factory('HttpInterceptor', ['$q', function($q) {

	var factoryInstance = {};

	factoryInstance.onRequest = function () { };
	factoryInstance.onSuccess = function () { };
	factoryInstance.onError = function () { };

	// On request success
	factoryInstance.request = function (config) {
		//console.log(config); // Contains the data about the request before it is sent.
		// Return the config or wrap it in a promise if blank.
		factoryInstance.onRequest(config);
		return config || $q.when(config);
	};

	// On request failure
	factoryInstance.requestError = function (rejection, a, b, c) {
		// console.log(rejection); // Contains the data about the error on the request.
		// Return the promise rejection.
		factoryInstance.onError(rejection);
		return $q.reject(rejection);
	};

	// On response success
	factoryInstance.response = function (response) {
		// console.log(response); // Contains the data from the response.
		// Return the response or promise.
		factoryInstance.onSuccess(response.config);
		return response || $q.when(response);
	};

	// On response failture
	factoryInstance.responseError = function (rejection, a, b, c) {
		// console.log(rejection); // Contains the data about the error.
		// Return the promise rejection.
		factoryInstance.onError(rejection);
		return $q.reject(rejection);
	};

	return factoryInstance;
    
}]);