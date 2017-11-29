(function(){
  angular.module("todo_application").factory("ToDoService",function($rootScope,$http,$location){
    var toDoService={};
    toDoService.key="angular-todolist";

    // method for signout user...
    // let to pass the conventionals functions for the new arrows functions
    // () => {} == function(){}
    toDoService.signout = () => {
      $http({
        method:'GET',
        url   :'/auth/signout/',
        data  :''
      }).then( res => {
        $rootScope.isAuthenticated=false;
        localStorage.setItem('userId','');
        $location.path('/login');
      });
    };

    //method for get every activities for user
    toDoService.getAll = callback => {
      $http({
        method:'POST',
        url   :'/accessToData/getCurrentUser',
        data  :''
      }).then( res => {
        if (res.data.redirect=="/#login") {
          $location.path('/login');
          $rootScope.isAuthenticated=false;
          return;
        }
        if (callback) {
          callback(res);
        }
      });
    };

    //method for delete activities.. use http.put for update database
    toDoService.deleteActivity = (data, callback) => {
        $http({
          method: 'PUT',
          url   : '/accessToData/updateActivities',
          data  : data
        }).then( res => {
          if(callback){
            callback(res);
          }
        }, err => {
          callback(err);
        });
    };

    toDoService.clean = (data, callback) => {
      $http({
        method: 'PUT',
        url   : '/accessToData/updateActivities',
        data  : data
      }).then( res => {
        if (callback) {
          callback(res);
        }
      }, err => {
        callback(err);
      });
    };

    //method for new activity
    toDoService.add = (newActv,callback) => {
        toDoService.update(newActv,res => {
          if (res.status==200) {
            return res.data.activities;
          }
        });
    };

    //update the activities into database
    toDoService.update = (data,callback) => {
      $http({
        method: 'PUT',
        url   : '/accessToData/updateActivities',
        data  : data
      }).then(res => {
        if (callback) {
          callback(res);
        }
      },err => {
        callback(err);
      });
    };
    return toDoService;
  });
}());
