angular.module('PosCtrl', []).controller('PosController', ['$scope', 'Security', '$localStorage', '$location', 'Product', 'uiGridConstants',
    function ($scope, Security, $localStorage, $location, Product, uiGridConstants) {

    $scope.data = [];
    $scope.products = [];
    $scope.ticket = {
        subtotal: 0,
        tax: 0,
        total: 0,
        payment: 0,
        change: 0,
        user: $localStorage.userid,
        productList: []
    };

    $scope.GridConfig = {
        enabledSorting: true,
        columnDefs: [
            { name: 'Cantidad', field: 'quantity', cellClass: 'cell-align-center', width: 85 },
            { name: 'Producto', field: 'name' },
            { name: 'Precio', field: 'subtotal', width: 85, cellTemplate: '<span ng-bind="row.entity.subtotal|currency"></span>', cellClass: 'cell-align-right' },
            { name: 'Impuesto', field: 'tax', width: 85, cellTemplate: '<span ng-bind="row.entity.tax|currency"></span>', cellClass: 'cell-align-right' },
            { name: 'Total', field: 'total', width: 85, cellTemplate: '<span ng-bind="row.entity.total|currency"></span>', cellClass: 'cell-align-right' }
        ],
        data: $scope.data
    };

    $scope.GetProducts = function () {
        var req = Product.get();
        req.then(function (result) {
            var data = _.filter(result.data, { enabled: true });
            $scope.products = angular.copy(data);
        });
    };

    $scope.AddProduct = function (item) {
        var product = _.filter($scope.data, { product: item._id });
        if (product != null && product.length > 0) {
            product[0].quantity++;
            product[0].subtotal = item.subtotal * product[0].quantity;
            product[0].tax = item.tax * product[0].quantity;
            product[0].total = (product[0].subtotal + product[0].tax);
        }
        else {
            var newProduct = {
                quantity: 1,
                product: item._id,
                name: item.name,
                subtotal: item.subtotal,
                tax: item.tax,
                total: (item.subtotal + item.tax)
            };

            $scope.data.push(newProduct);
        }
        
        $scope.GridConfig.data = $scope.data;
        $scope.CalculateTotals();
    };

    $scope.CalculateTotals = function () {
        var subtotal = 0;
        var tax = 0;
        var total = 0;
        angular.forEach($scope.data, function (value, key) {
            subtotal = subtotal + value.subtotal;
            tax = tax + value.tax;
        });
        total = subtotal + tax;

        $scope.ticket.subtotal = subtotal;
        $scope.ticket.tax = tax;
        $scope.ticket.total = total;
    };

    $scope.EmptyTicket = function () {
        $scope.ticket = {
            subtotal: 0,
            tax: 0,
            total: 0,
            payment: 0,
            change: 0,
            user: $localStorage.userid,
            productList: []
        };
    };

    $scope.GetProducts();

    $scope.CalculateChange = function () {
        if ($scope.ticket.total != null && $scope.ticket.payment != null) {
            if ($scope.ticket.payment > $scope.ticket.total) {
                $scope.ticket.change = $scope.ticket.payment - $scope.ticket.total;
            }
            else {
                $scope.ticket.change = 0;
            }
        }
        else {
            $scope.ticket.change = 0;
        }
    };

    $scope.CanPay = function () {
        if ($scope.data.length == 0) return false;

        if ($scope.ticket.payment == 0 || $scope.ticket.payment == null) return false;

        if ($scope.ticket.payment < $scope.ticket.total) return false;

        return true;

    };

    $scope.Pay = function () {
        var fecha = new Date();
        var month = S(fecha.getMonth().toString()).padLeft(0).s;
        month = S(month).replaceAll(' ', '0');
        var date = S(fecha.getDate().toString()).padLeft(0).s;
        date = S(date).replaceAll(' ', '0');
        var folio = fecha.getFullYear().toString() + month + date;

        $scope.ticket.ticketNumber = folio;
        $scope.ticket.date = new Date();
        $scope.ticket.productList = angular.copy($scope.data);

        var req = ticket.PayTicket($scope.ticket);
        req.then(function (result) {

            $scope.LastTicket = angular.copy(result.data);

            $scope.data = [];
            $scope.CalculateTotals();
            $scope.EmptyTicket();
        });

    };


}]);