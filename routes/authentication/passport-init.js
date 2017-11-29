var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
      console.log('serializing user: '+user._id);
      return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
      User.findById(id,(err, user) => {
          if(err){
              return done(err, false);
          }
          if(!user){
              return done('user not found', false);
          }
          return done(null, user);
      });
  });

  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  (req, username, password, done) => {
      User.findOne({username: req.body.username},(err, user) => {
        if(err){
          return done(err, false);
        }
        if(!user){
          req.session.error = '001';
          return done(null,false, {message:'user' +username+ 'not found'});
        }
        if(req.body.password!=user.password){
             req.session.error = '002';
             return done(null, false, {message: 'Wrong password'});
         }

         req.session.regenerate(() => {
           req.session.user = user;
           req.session.success = 'authenticated as ' + user.name + 'click to <a href=\"public/login.html\">logout</a>.  You may now access <a href=\"/\">/restricted</a>.';
         });
         return done(null,user);
      });
    }
  ));
};
