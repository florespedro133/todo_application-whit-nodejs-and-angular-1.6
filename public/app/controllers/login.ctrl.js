(function(){
  //no utilice into the function $scope
  angular.module('todo_application').controller('loginCtrl',
    function($rootScope,$location,LoginService){
      if ($rootScope.isAuthenticated) {
        $location.path('/');
        return;
      }
      //change $scope for variable "this"
      //$scope==this
      this.user={};
      this.error={};
      this.user.username = localStorage.getItem('data-username');
      // let to pass the conventionals functions for the new arrows functions
      // form => {} == function(form){}
      this.login=form => {
        if (form.$valid) {
          LoginService.login(this.user, res => {
            switch (res.data.message) {
              case '001'    : this.error={
                status  : true,
                message : 'Username does not exist.'
              }
              break;
              case '002'    : this.error={
                status  : true,
                message : 'Wrong password.'
              }
              break;
              case 'success': this.error={
                status  : false,
                message : ''
              }
              $rootScope.isAuthenticated=true;
              $location.path('/');
              localStorage.setItem('userId', res.data.userID);
              break;
            }
          });
        }
      };
    });
}());
