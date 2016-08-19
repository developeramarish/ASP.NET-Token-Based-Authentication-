'use strict';
app.service('LoginService', ['$http', '$q', 'authData',
function ($http, $q, authData) {

    var deferred;

    this.login = function (userName, password) {

        deferred = $q.defer();

        var authInfo = "grant_type=password&username=" + userName + "&password=" + password;

        $http({
            url: serviceBase + 'token',
            method: "POST",
            data: authInfo,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (response) {

            authData.authenticationData.IsAuthenticated = true;
            authData.authenticationData.userName = response.userName;

            sessionStorage.setItem("accessToken", response.access_token);
            sessionStorage.setItem("userName", response.userName);

            deferred.resolve(null);
        }).error(function (err, status) {
            authData.authenticationData.IsAuthenticated = false;
            authData.authenticationData.userName = "";
            deferred.resolve(err);
        });

        return deferred.promise;
    }

    this.logOut = function () {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userName");
        $http.defaults.headers.common['Authorization'] = '';
        authData.authenticationData.IsAuthenticated = false;
        authData.authenticationData.userName = "";
    }
}]);