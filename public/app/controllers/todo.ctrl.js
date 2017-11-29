(function(){
  //no utilice into the function $scope
  angular.module("todo_application").controller("ToDoController", function(ToDoService){
    //change $scope for variable "this"
    //$scope==this
    this.activities= [];
    this.newActv = {};
    // let to pass the conventionals functions for the new arrows functions
    // $res => {} == function($routeProvider){}
    ToDoService.getAll(res => {
      if (res.status==200) {
        this.activities=res.data.activities;
      }
    });

    this.addActv = () => {
      this.newActv.status=false;
      this.activities.push(this.newActv);
      ToDoService.add(this.activities,res => {
        if (res.status=200) {
          this.activities=res.data.activities;
        }
      });
      this.newActv={};
    };
    this.removeActv = activity => {
      // Calling the promise
      var index = this.activities.indexOf(activity);
      if (index > -1) {
        this.activities.splice(index,1);
        ToDoService.deleteActivity(this.activities, res => {
            // This gets the position of the activity inside the whole array
            // If the delete is successful delete from array in client.
            if(res.status==200){
              this.activities=res.data.activities;
            }
        });
      }
    };

    this.update = ()=> {
      ToDoService.update(this.activities,res => {
        if (res.status==200) {
          this.activities=res.data.activities;
        }
      });
    };

    this.clean = () => {
      this.activities=[]
      ToDoService.clean(this.activities,res => {
        if (res.status==200) {
          this.activities=res.data.activities;
        }
      });
    };
    //call the signout into the service
    this.signout = () => {
      ToDoService.signout();
    };
  });
}());
