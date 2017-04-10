angular.module('PosFactory', []).factory('POS', ['$http', function ($http) {

    return {
        PayTicket: function (entity) {
            return $http.post("~/api/Ticket", entity);
        }
    };

}]);