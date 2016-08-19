'use strict';
app.service('SignUpService', function($http) {


    this.register = function (userInfo) {
        var resp = $http({
            url: serviceBase + "api/Account/Register",
            method: "POST",
            data: userInfo,
        });
        return resp;
    };

});