var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String,
   activities: Array
});

mongoose.model("User", userSchema);
