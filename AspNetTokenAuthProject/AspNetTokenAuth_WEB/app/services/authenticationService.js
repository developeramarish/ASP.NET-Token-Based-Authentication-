'use strict';
app.service('AuthenticationService', ['$http', '$q', '$window', 'authData',
    function ($http, $q, $window, authData) {

        var tokenInfo = {
            accessToken: sessionStorage.getItem("accessToken"),
            userName: sessionStorage.getItem("userName")
        }

        this.setHeader = function (http) {
            delete http.defaults.headers.common['X-Requested-With'];

            if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined) && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenInfo.accessToken;
                http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

                authData.authenticationData.userName = tokenInfo.userName;
                authData.authenticationData.IsAuthenticated = true;
            }
        }

        this.validateRequest = function () {

            var deferred = $q.defer();
            this.setHeader($http);

            $http.get(serviceBase + 'api/UserAuthorized')
                .then(function () {

                    deferred.resolve(null);

                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
]);