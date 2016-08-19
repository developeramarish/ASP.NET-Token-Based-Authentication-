'use strict';
app.controller('loginCtrl', ['$scope', 'LoginService', '$location',
    function ($scope, loginService, $location) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.login = function () {
        loginService.login($scope.loginData.userName, $scope.loginData.password)
            .then(function (response) {
                if (response != null && response.error != undefined) {
                    $scope.message = response.error_description;
                }
                else {
                    // Logincontroller responsible to redirect authenticated users 
                    $location.path('/Dashboard');
                }
            });
    }
}]);