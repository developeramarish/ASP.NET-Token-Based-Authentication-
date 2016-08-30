# ASP.NET Web API 2 & Angularjs (Single Page Application) - Token Based Authenication

<strong>Version:</strong> .NET 4.6.1 


<h3>STEP 1)</h3> 

Create 2 seperate ASP.NET Projects in the same solution: <br/>

<h4>1) AspNetTokenAuth_WEB</h4>

I created this project with ASP.NET Web Application (Empty Project). 
  

<h4>2) AspNetTokenAuth_API</h4>

The AspNetTokenAuth_API project was created using ASP.NET Web API 2 (Individual Account).
<br/> 

Here is the tree structure of the ASP.NET Empty Web Application Project: 

<img width="219" alt="treestructure" src="https://cloud.githubusercontent.com/assets/11988924/18068630/4bb73c82-6e10-11e6-8da2-2f835b1e1911.png">

<hr/>

<h3>STEP 2)</h3>

<h4>Add the AngularJs ROUTES</h4>

For this project, I will be using <b>ui-router</b>, you can find the source code here: <a href="https://angular-ui.github.io/ui-router/">https://angular-ui.github.io/ui-router/</a>

The routes are set up in <strong>app.js</strong>

Below the routes, there is another method  ```app.config(['$httpProvider', function ($httpProvider)```... 
That will be responsible for rejecting unauthorized users if they try to navigate to the Admin Dashboard. 

```javascript
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
```

<hr/>

<h3>Step 3)</h3>

Create <i>index.html</i> - This works similarly to a master page and the partial views will be injected inside the <data-ng-view> tag. 

<i>index.html</i> 

```html 

<!DOCTYPE html>
<html ng-app="AngularApp" lang="en">
<head>
    <title>Demo</title>

    <base href="/" />

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport">

    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="css/AdminLTE.min.css" rel="stylesheet" />
    <link href="css/_all-skins.min.css" rel="stylesheet" />
    <link href="/css/styles.css" rel="stylesheet" />

    <link rel="shortcut icon" href="">
</head>
<body class="hold-transition skin-blue sidebar-mini" data-ng-controller="indexController">
    <div ng-class="{ 'wrapper': authentication.IsAuthenticated,
                     'wrapper-notauth': !authentication.IsAuthenticated }">
        <header class="main-header">
            <a href="" class="logo">
                <span class="logo-mini"></span>
                <span class="logo-lg"></span>
            </a>
            <nav class="navbar navbar-static-top">
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li data-ng-hide="authentication.IsAuthenticated">
                            <a ui-sref="SignUp" class="dropdown-toggle">
                                <span class="fa fa-user"></span> Sign Up
                            </a>
                        </li>
                        <li data-ng-hide="authentication.IsAuthenticated">
                            <a ui-sref="Login" class="dropdown-toggle">
                                <span class="fa fa-lock"></span> Login
                            </a>
                        </li>
                        <li ng-controller="loginCtrl"
                            data-ng-hide="!authentication.IsAuthenticated">
                            <a ui-sref="Login" data-ng-click="logOut()">
                                <span class="fa fa-lock"></span> Logout
                            </a>
                        </li>
                        <li data-ng-hide="!authentication.IsAuthenticated">
                            <a>
                                <span class="fa fa-user"></span>
                                {{authentication.userName}}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <aside data-ng-hide="!authentication.IsAuthenticated" class="main-sidebar">
            <section class="sidebar">
                <ul class="sidebar-menu">
                    <li class="treeview">
                        <a ui-sref="Dashboard">
                            <i class="fa fa-home"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                </ul>
            </section>
        </aside>
        <div ng-class="{ 'content-wrapper': authentication.IsAuthenticated,
                         'content-wrapper-notauth': !authentication.IsAuthenticated }">
            <section data-ng-hide="!authentication.IsAuthenticated" class="content-header">
                <h1>{{ pageTitle }} </h1>
                <ol class="breadcrumb">
                    <li><a ui-sref="Home"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li class="active">Dashboard</li>
                </ol>
            </section>
            <section class="content">
                <ui-view></ui-view>
            </section>
        </div>
        <footer class="main-footer">
            <strong>Copyright &copy; 2016 <a href=""></a>.</strong> All rights
            reserved.
        </footer>
    </div>

    <script src="js/angular.min.js"></script>
    <script src="js/angular-ui-router.min.js"></script>
    <script src="js/angular-local-storage.min.js"></script>

    <script src="app/app.js"></script>

    <script src="app/controllers/index-controller.js"></script>
    <script src="app/controllers/dashboard-controller.js"></script>
    <script src="app/controllers/home-controller.js"></script>
    <script src="app/controllers/login-controller.js"></script>
    <script src="app/controllers/signup-controller.js"></script>

    <script src="app/services/authData.js"></script>
    <script src="app/services/authenticationService.js"></script>
    <script src="app/services/login-service.js"></script>
    <script src="app/services/signup-service.js"></script>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.2/ui-bootstrap-tpls.js"></script>

</body>
</html>


```

<br/>

Create <i>index-controller.js</i> - this will be responsible for switching the page layout based on whether the user is logged in or not. 

```javascript 

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

```

<h3>Step 4)</h3>

Before going further with the AngularJs stuff, lets set up the back-end. 

This project will be using the Database first approach. I have created a SQL Server Database <i>DEMO_DB</i> inside the App_Data Folder.

I created a CustomersOrder table along with some dummy data. Here is the SQL code for it: 

```SQL

CREATE TABLE [dbo].[CustomerOrders] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [Date]            NVARCHAR (50) NOT NULL,
    [FirstName]       NVARCHAR (50) NOT NULL,
    [LastName]        NVARCHAR (50) NOT NULL,
    [ShippingAddress] NVARCHAR (50) NOT NULL,
    [PaymentAmount]   NVARCHAR (50) NOT NULL,
    [OrderStatus]     NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

SET IDENTITY_INSERT [dbo].[CustomerOrders] ON
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (1, N'02/06/2013', N'John', N'Doe', N'135 Main St', N'5527.33', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (2, N'01/07/2011', N'Gary', N'James', N'135 Main St', N'99821.2', N'Shipped')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (3, N'07/06/2012', N'Frank', N'Williams', N'135 Main St', N'217.84', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (4, N'11/16/2008', N'Cathy', N'Doe', N'135 Main St', N'9881.89', N'Shipped')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (5, N'12/05/2001', N'Helen', N'McKenzie', N'54 Townsend Rd', N'6637.22', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (6, N'02/18/2013', N'Zane', N'McKen', N'135 Main St', N'4542.88', N'Shipped')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (7, N'01/30/2010', N'Anthony', N'Johns', N'95 Weston Rd', N'5843.86', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (8, N'06/01/2014', N'Tim', N'Je', N'33 Carabob St', N'4472.31', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (9, N'10/01/2001', N'Amanada', N'Robertson', N'135 Main St', N'8517.22', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (10, N'05/06/2011', N'Annie', N'Macdonald', N'135 Main St', N'981.22', N'Shipped')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (11, N'09/26/2015', N'Ken', N'Li', N'642 Roberts St', N'5941.99', N'Shipped')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (12, N'02/06/2013', N'John', N'Doe', N'135 Main St', N'6647.77', N'New')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (13, N'01/07/2011', N'Gary', N'Lou', N'135 Main St', N'2571.45', N'Returned')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (14, N'07/06/2012', N'Frank', N'Stin', N'135 Main St', N'48672367.58', N'Returned')
INSERT INTO [dbo].[CustomerOrders] ([Id], [Date], [FirstName], [LastName], [ShippingAddress], [PaymentAmount], [OrderStatus]) VALUES (15, N'11/16/2008', N'Cathy', N'Doe', N'5 Spring Blvd', N'457388.55', N'New')
SET IDENTITY_INSERT [dbo].[CustomerOrders] OFF

```

After creating the CustomerOrders table, I added ADO.NET Entity Data Model to the Models folder. 

Right-Click the Models Folder > Add New Item > ADO.NET Entity Data Model > EF Designer from Database.

Next create <i>CustomersOrdersController.cs</i>.

Right-Click Controllers Folder > Add > Controller > Select Web API 2 Controller with actions, using EF

![customerorder-controller](https://cloud.githubusercontent.com/assets/11988924/18101926/9eba4254-6ebe-11e6-81b4-47ee6b904734.png)

Set the Authorize attribute so that only authorized users can view the data:

![authorize-customers](https://cloud.githubusercontent.com/assets/11988924/18101971/d1b9b388-6ebe-11e6-8a7e-7f10157fc5d8.png)

<hr/>

<h3>Step 5)</h3>

The user account and ASP.NET Membership stuff is all set up for you when you select Authentication to <b>Individual User</b>. 

First, create an account. You can use whatever debugging tool you want, but for this tutorial, I will be using <a href="http://www.telerik.com/fiddler">Fiddler</a> as my debugging tool. You can download <a href="http://www.telerik.com/fiddler">Fiddler</a> for free through this link <a href="https://www.telerik.com/download/fiddler">https://www.telerik.com/download/fiddler</a>.

You can create account by making a POST request to /api/Account/Register. 

![post-step1](https://cloud.githubusercontent.com/assets/11988924/18100565/7e4bdf1e-6eb9-11e6-91b4-edabad9b3c62.png)

<br/>

To confirm that the data has been inserted to the database, you can view the AspNetUsers table data in the server explorer: 

![confirm-reg](https://cloud.githubusercontent.com/assets/11988924/18100805/5aabc46a-6eba-11e6-89f4-a517b40304fe.png)

<br/>

Second, login using the email address and password by making a POST request to /token. 

![post-token](https://cloud.githubusercontent.com/assets/11988924/18100977/faaf3622-6eba-11e6-9f42-ce930363aaec.png)

<br/>

After logging in, you can see that the server has generated an <b>Access Token</b>:

![access_token](https://cloud.githubusercontent.com/assets/11988924/18101106/756f4ff0-6ebb-11e6-9eb0-c0ef19fa5978.png)

This access token is stored in your local machine. It will expired within the set time period. When you log out, the access token will be removed. When you log in again, a brand new access token will be generated. 

<br/>

To get the CustomerOrders Data, copy the access token and make a GET request through /api/CustomerOrders

![get-data-bearer](https://cloud.githubusercontent.com/assets/11988924/18102181/a7e598fa-6ebf-11e6-9b1d-dd1998bbfcbc.png)

With this access token you will retrieve the CustomerOrders data you requested:

![json-data-token](https://cloud.githubusercontent.com/assets/11988924/18102286/0a9fe1ee-6ec0-11e6-9a4d-c945ea94840e.png)

<hr/>

<h3>Step 6)</h3>

Create <i>UserAuthorizedController.cs</i>. This controller class is used to confirm that the user has been authorized after submitting their credentials through the login form. 

```C# 
    [Authorize]
    public class UserAuthorizedController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Validate()
        {
            return Ok();
        }
    }
```

<hr/>

<h3>Step 6)</h3>

Back to AngularJs now. Add ```javascript var serviceBase = "http://localhost:PortNumber" ``` inside <i>app.js</i>. 

Start by creating the AngularJs Web Services. 

<i>login-service.js</i> - After the user submits their credentials through the login form, it will set the accessToken and userName to the sessionStorage. As soon as the user logs out, it will then be removed from the sessionStorage. 

```javascript 

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

```

<i>signup-service.js</i> - As you can see, it is making a POST request to api/Account/Register to create a new account. 
```javascript 

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

```

<i>authData.js</i> - This is used to determine whether the user is logged in or not. 

```javascript 

'use strict';
app.factory('authData', function () {

    var authDataFactory = {};

    var _authentication =
        {
            IsAuthenticated: false,
            userName: ""
        };

    authDataFactory.authenticationData = _authentication;

    return authDataFactory;

});

```

<i>authenticationService.js</i> - Authentication Service retrieves the accessToken and userName from the sessionStorage and then sets the headers. The validateRequest() function below makes a GET request to /api/UserAuthorized to confirm that the user is authorized. 
```javascript 
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
```

<hr/>

<h3>Step 7)</h3> 

Add the remaining controllers for Login, SignUp, and Dashboard: 

<i>login-controller.js</i> - Responsible for redirecting the user after they have been authenticated. 

```javascript 
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

```

![login](https://cloud.githubusercontent.com/assets/11988924/18104099/83498170-6ec7-11e6-8a12-7f699aa98781.png)

<br/>

<i>signup-controller.js</i> 

```javascript 
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
```

![signup](https://cloud.githubusercontent.com/assets/11988924/18104089/75bca6a4-6ec7-11e6-8d7e-6786954d46a9.png)

<br/>

<i>dashboard-controller.js</i> - The dashboard controller fetches the JSON CustomerOrders data by calling a GET request to api/CustomerOrders. Right below it is just some features and functionalities I included for the Dashboard data table. 

```javascript 

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

```

![dashboard](https://cloud.githubusercontent.com/assets/11988924/18104073/60a8f7d6-6ec7-11e6-8781-d32c7252e794.png)

<hr/>

<h3>Wrap Up</h3>

You can find the rest of the source code in the project. 


