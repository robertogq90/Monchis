angular.module('PosFactory', []).factory('POS', ['$http', function ($http) {

    return {
        signin: function (user) {
            return $http.post("~/api/authenticate", user);
        }
    };

}]);