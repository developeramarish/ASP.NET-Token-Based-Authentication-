'use strict';
app.controller('signUpCtrl', ['$scope', 'SignUpService', '$location',

    function ($scope, signUpService, $location) {

        $scope.responseData = "";
        $scope.userRegistrationEmail = "";
        $scope.userRegistrationPassword = "";
        $scope.userRegistrationConfirmPassword = "";

        $scope.registerUser = function () {

            $scope.responseData = "";

            //The User Registration Information
            var userRegistrationInfo = {
                Email: $scope.userRegistrationEmail,
                Password: $scope.userRegistrationPassword,
                ConfirmPassword: $scope.userRegistrationConfirmPassword
            };

            var promiseregister = signUpService.register(userRegistrationInfo);

            promiseregister.then(function (resp) {
                $scope.responseData = "User is Successfully";
                $scope.userRegistrationEmail = "";
                $scope.userRegistrationPassword = "";
                $scope.userRegistrationConfirmPassword = "";

                alert("Account has been successfully created.");

                $location.path('/Login');

            }, function (err) {
                $scope.responseData = "Error " + err.status;
            });
        };
    }]);