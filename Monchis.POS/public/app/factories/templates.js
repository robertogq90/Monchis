angular.module('TemplateFactory', []).factory('Template', ['$http', function ($http) {

    return {
        CurrencyUICell: '<span ng-bind="row.entity[col.field]|currency"></span>',
        CheckboxUICell: '<input  type="checkbox" style="margin:4px;" ng-disabled="true" ng-model="row.entity[col.field]"  />',
        ButtonGirdEdit: '<button><i class="btn btn-sm btn-primary glyphicon-edit" ng-click="grid.appScope.OpenAddModal(row.entity)"></i></button>'
    };

}]);