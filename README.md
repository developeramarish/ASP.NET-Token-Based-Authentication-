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



  
