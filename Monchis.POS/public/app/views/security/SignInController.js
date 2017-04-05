angular.module('SignInCtrl', []).controller('SignInController', ['$scope', 'Security', '$localStorage', '$location', function ($scope, Security, $localStorage, $location) {

    $scope.Entity = {};

    $scope.SignIn = function () {
        var req = Security.signin($scope.Entity);
        req.then(function (res) {
            if (res.data.success) {
                $localStorage.token = res.data.token;
                $location.path('/home');
            }
        });
    };

}]);