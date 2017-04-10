angular.module('ProductCtrl', []).controller('ProductController', ['$scope', 'Product', '$localStorage', '$location', 'Template', '$modal',
    function ($scope, Product, $localStorage, $location, Template, $modal) {

        $scope.listProduct = [];

        var EditModal = $modal({
            title: 'Agregar/Editar Producto',
            show: false,
            scope: $scope,
            contentTemplate: '/app/views/product/single.tpl.html'
        });

        $scope.GridConfig = {
            
            enabledSorting: false,
            columnDefs: [
                { name: 'Producto', field: 'name' },
                { name: 'PU', field: 'subtotal', cellTemplate: Template.CurrencyUICell, cellClass: 'cell-align-right' },
                { name: 'IVA', field: 'tax', cellTemplate: Template.CurrencyUICell, cellClass: 'cell-align-right' },
                { name: 'Precio', field: 'total', cellTemplate: Template.CurrencyUICell, cellClass: 'cell-align-right' },
                { name: 'Activo', field: 'enabled', cellTemplate: Template.CheckboxUICell, cellClass: 'cell-align-center' },
                { name: 'Editar', field: '_id', cellTemplate: Template.ButtonGirdEdit, cellClass: 'cell-align-center' }
            ],
            data: $scope.listProduct
        };

        $scope.refresh = function () {
            var req = Product.get();
            req.then(function (result) {
                $scope.listProduct = result.data;
                $scope.GridConfig.data = $scope.listProduct;
            });
        };

        $scope.OpenAddModal = function (item) {
            if (item != null) {
                $scope.EditEntity = angular.copy(item);
            }
            else {
                $scope.EditEntity = { _id: null, tax: 0, total: 0, subtotal: 0, enabled: true };
            }


            EditModal.$promise.then(EditModal.show);
        };

        $scope.CalculateTotalProduct = function () {
            if ($scope.EditEntity.subtotal == null) {
                $scope.EditEntity.subtotal = 0;
                $scope.EditEntity.total = 0;
            }
            else {
                $scope.EditEntity.total = $scope.EditEntity.subtotal + $scope.EditEntity.tax;
            }
        };

        $scope.Save = function () {
            var isNew = $scope.EditEntity._id == null;
            if (isNew) {
                var req = Product.Insert($scope.EditEntity);
                req.then(function (result) {
                    $scope.refresh();
                });
            }
        };

}]);