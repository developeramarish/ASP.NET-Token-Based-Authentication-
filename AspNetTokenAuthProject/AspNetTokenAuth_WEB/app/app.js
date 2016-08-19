/// <reference path="angular.min.js" />
var serviceBase = "http://localhost:5334/";
var app = angular
              .module("AngularApp", ["ui.router", "ui.bootstrap", 'LocalStorageModule'])
              .config(function ($stateProvider, $urlRouterProvider) {
                  $stateProvider
                    .state("Dashboard", {
                        url: '/Dashboard',
                        templateUrl: "app/views/Dashboard.html",
                        controller: "dashboardCtrl"
                    })
                    .state("Login", {
                        url: '/Login',
                        templateUrl: "app/views/Login.html",
                        controller: "loginCtrl"
                    })
                    .state("SignUp", {
                        url: '/SignUp',
                        templateUrl: "app/views/SignUp.html",
                        controller: "signUpCtrl"
                    })

                  $urlRouterProvider.otherwise('/Login');
              });
            app.config(['$httpProvider', function ($httpProvider) {

                $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {

                    return {
                        request: function (config) {

                            return config;
                        },
                        requestError: function (rejection) {

                            return $q.reject(rejection);
                        },

                        response: function (response) {
                            if (response.status == "401") {
                                window.location.reload();
                                $location.path('/Login');
                            }
                            return response;
                        },
                        responseError: function (rejection) {

                            if (rejection.status == "401") {
                                window.location.reload();
                                $location.path('/Login');
                            }
                            return $q.reject(rejection);
                        }
                    };
                });
            }]);
