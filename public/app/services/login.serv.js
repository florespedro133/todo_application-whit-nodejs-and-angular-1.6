(function(){
  angular.module("todo_application").factory("LoginService",function($rootScope,$http,$location){
    var loginService={};

    //if acthenticated redirect home.html
    if ($rootScope.isAuthenticated) {
      $location.path('/');
      return;
    }

    //method for login
    // let to pass the conventionals functions for the new arrows functions
    // (user, callback) => {} == function(user, callback){}
    loginService.login=(user, callback) => {
        $http({
          method:'POST',
          url   :'/auth/login/',
          data  :user
        }).then(res => {
          if(callback){
            callback(res);
          }
        }, err => {
          callback(err);
        });
    };
    return loginService;
  });
}());
