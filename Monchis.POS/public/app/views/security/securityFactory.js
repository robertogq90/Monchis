angular.module('SecurityFactory', []).factory('Security', ['$http', function ($http) {

    return {
        signin: function (user) {
            return $http.post("~/api/authenticate", user);
        }
    };

}]);