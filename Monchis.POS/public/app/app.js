
var app = angular.module("POS", ['ngRoute', 'ngStorage', 'ui.grid', 'HttpInterceptorFactory', 'mgcrea.ngStrap']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
}]);

app.config(function ($modalProvider) {
    angular.extend($modalProvider.defaults, {
        templateUrl: '/templates/Popup.html',
        backdrop: true,
        keyboard: false
    });
});

app.controller('MainController', ['$scope', 'HttpInterceptor', '$localStorage', '$location', '$modal', function ($scope, HttpInterceptor, $localStorage, $location, $modal) {

    $scope.showview = true;

    $scope.islogged = function () {
        if ($localStorage.token != null) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.logout = function () {
        $localStorage.$reset();
        $location.path('/signin');
    };

    HttpInterceptor.onRequest = function (config) {

        if (config.url.startsWith('~/') == true) {
            var token = $localStorage.token;
            config.url = config.url.replace("~/", window.BaseUrl);
            config.headers['x-access-token'] = token;
        }

    };

    HttpInterceptor.onSuccess = function (config) {

    };

    HttpInterceptor.onError = function (error) {
        var errorMessages = {
            DoesNotHaveToken: "No token provided."
        };

        if (error.status == 403) {

            if (error.data.message == errorMessages.DoesNotHaveToken) {
                $location.path('/signin');
            }
        }
    };
    
    $scope.$on('$routeChangeStart', function () {
        $scope.showview = false;
    });

    $scope.$on('$routeChangeSuccess', function () {
        $scope.showview = true;
    });

    

}]);


app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider

        .when('/404', {
            templateUrl: '../../app/views/security/not_found.html'
        })

        .otherwise({
            redirectTo: '/404'
        })

        .when('/home', {
            templateUrl: 'app/views/home/home.html',
            controller: 'HomeController as ctrl'
        })

        .when('/signin', {
            templateUrl: '../../app/views/security/signin.html',
            controller: 'SignInController as ctrl'
        })

        .when('/', {
            templateUrl: '../../app/views/security/signin.html',
            controller: 'SignInController as ctrl'
        })

        .when('/user', {
            templateUrl: '../../app/views/user/list.html',
            controller: 'UserController as ctrl',
            resolve: {
                Profiles: function (Catalog) {
                    return Catalog.get("profile");
                }
            }

        });

}]);