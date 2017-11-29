/**
 * Created by Pedro Flores on 5/4/2017.
 * usign ES6
 */

 var app= angular.module('todo_application',['ngRoute','ngMaterial']).run(($rootScope) => {

 });
// let to pass the conventionals functions for the new arrows functions
// $routeProvider => {} == function($routeProvider){}
 app.config($routeProvider => {
   $routeProvider.when('/login',{
     templateUrl: 'app/views/login.html',
     controller : 'loginCtrl',
     //using controllerAs for indetify the controller into the html
     controllerAs: 'log'
   })
   .when('/',{
     templateUrl: 'app/views/home.html',
     controller : 'ToDoController',
     controllerAs: 'ToDo'
   })
   .otherwise({redirectTo:'/'});
 });
