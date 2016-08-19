'use strict';
app.controller('indexController', ['$scope', '$location', 'authData', 'LoginService', '$window',

    function ($scope, $location, authData, loginService, $window) {

        $scope.logOut = function () {
            loginService.logOut();
            $location.path('/Login');
            window.location.reload();
        }
        $scope.authentication = authData.authenticationData;

    }]);