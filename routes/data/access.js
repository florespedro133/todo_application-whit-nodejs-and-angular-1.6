var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../../models/users.js');
var User=mongoose.model('User');

router.use((req, res, next) => {
    if(req.method === "GET" || req.method === "POST" || req.method === "PUT"){
        if(!req.isAuthenticated()) {
            res.send({redirect:'/#login'});
        }else{
            return next();
        }
    }
});

router.route('/getCurrentUser').post((req, res) => {
    User.findById(req.session.passport.user, (err, user) => {
       if(err){
           return res.send(500, err);
       }else{
           return res.json(user);
       }
    });
});

router.route('/updateActivities').put((req,res) => {
  User.findById(req.session.passport.user, (err, users) => {
    if (err) {
      return res.send(500, err);
    }else {
      var data = users;
      data.activities= req.body;
      data.save((err, doc) => {
        if (err) {
          return res.send('Error');
        }else {
          return res.json(doc);
        }
      });
    }
  });
});

module.exports = router;
