'use strict'
app.controller("dashboardCtrl", ['$scope', '$http', 'AuthenticationService',

    function ($scope, $http, authenticationService) {

        // Check if user is logged in
        authenticationService.validateRequest();

        // HTTP GET Customer Order Data
        var fetchOrdersData = serviceBase + "api/CustomerOrders";

        $http.get(fetchOrdersData)
            .success(function (result) {
                $scope.ordersData = result;
            })
            .error(function () {
                $scope.error = "An Error has occured while loading records!";
            })


        // Data Table Features & Functionality
        $scope.statusOptions = ["Returned", "Shipped", "New"];

        $scope.resetBtn = function () {
            window.location.reload();
        }

        $scope.selectAll = function (index) {
            angular.forEach($scope.ordersData, function () {
                $scope.ordersData[index].isSelected = true;
            })
        }

        $scope.checkAll = function (index) {
            angular.forEach($scope.ordersData, function () {
                $scope.ordersData[index].isSelected = $scope.select;
            })
        }

    }]);