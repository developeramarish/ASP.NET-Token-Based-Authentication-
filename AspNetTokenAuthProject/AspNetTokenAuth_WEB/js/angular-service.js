/// <reference path="angularjs-scripts.js" />
/// <reference path="angular.min.js" />

// REQUEST DATA
app.service('crudService', function ($http) {

    var urlBase = "http://localhost:64156/api";

    //Create new request
    this.post = function (Request) {
        var request = $http({
            method: "post",
            url: urlBase + "/RequestsAPI",
            data: Request
        })
        return request;
    }
    //Get Single Records
    this.get = function (RequestId) {
        return $http.get(urlBase + "/RequestsAPI/" + RequestId);
    }

    //Get All Requests
    this.getRequest = function () {
        return $http.get(urlBase + "/RequestsAPI");
    }
                  
    //Update the Record
    this.put = function (RequestId, Request) {
        var request = $http({
            method: "put",
            url: urlBase + "/RequestsAPI/" + RequestId,
            data: Request
        })
        return request;
    }

    //Delete the Record
    this.delete = function (RequestId) {
        var request = $http({
            method: "delete",
            url: urlBase + "/RequestsAPI/" + RequestId
        })
        return request;
    }
})