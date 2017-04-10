angular.module('ProductFactory', []).factory('Product', ['$http', function ($http) {

    return {
        get: function () {
            return $http.get("~/api/product");
        },
        getEnabled: function () {
            return $http.get('~/api/product/enabled');
        },
        getById: function (id) {
            return $http.get("~/api/product/" + Id);
        },
        Insert: function (entity) {
            return $http.post("~/api/product/", entity);
        }
    };

}]);