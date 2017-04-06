angular.module('PosCtrl', []).controller('PosController', ['$scope', 'Security', '$localStorage', '$location', function ($scope, Security, $localStorage, $location) {

    $scope.data = [];
    $scope.products = [
        {
            _id: '06516540',
            name: 'Elote Vaso Grande',
            price: 20.50,
            tax: 0,
            total: 20.50
        },
        {
            _id: '06516840',
            name: 'Elote Vaso Mediano',
            price: 20.50,
            tax: 0,
            total: 20.50
        },
        {
            _id: '06515788',
            name: 'Elote Vaso Chico',
            price: 20.50,
            tax: 0,
            total: 20.50
        },
        {
            _id: '06578045',
            name: 'Nieve Vaso Grande',
            price: 20.50,
            tax: 0,
            total: 20.50
        },
        {
            _id: '06510000',
            name: 'Nieve Vaso Mediano',
            price: 20.50,
            tax: 0,
            total: 20.50
        }
    ];

    $scope.GridConfig = {
        enabledSorting: false,
        columnDefs: [
            { name: 'Cantidad', field: 'cantidad' },
            { name: 'Producto', field: 'productName' },
            { name: 'Precio', field: 'price', cellTemplate: '<span ng-bind="row.entity.price|currency"></span>' },
            { name: 'Impuesto', field: 'tax', cellTemplate: '<span ng-bind="row.entity.tax|currency"></span>' },
            { name: 'Total', field: 'finalPrice', cellTemplate: '<span ng-bind="(row.entity.finalPrice*row.entity.cantidad)|currency"></span>' }
        ],
        data: $scope.data
    };

    $scope.AddProduct = function (item) {
        var product = _.filter($scope.data, { _id: item._id });
        if (product != null && product.length > 0) {
            product[0].cantidad++;
        }
        else {
            var newProduct = {
                _id: item._id,
                cantidad: 1,
                productName: item.name,
                price: item.price,
                tax: item.tax,
                finalPrice: item.total
            };

            $scope.data.push(newProduct);
        }
    };

}]);