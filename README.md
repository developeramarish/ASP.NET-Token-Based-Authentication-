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


<h3>STEP 2)</h3>

<h4>Add the AngularJs ROUTES</h4>

For this project, I will be using <b>ui-router</b>, you can find the source code here: <a href="https://angular-ui.github.io/ui-router/">https://angular-ui.github.io/ui-router/</a>

The routes are set up in <strong>app.js</strong>

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
```


Step 3) 

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

  
