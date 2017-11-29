var express = require('express');
var router = express.Router();

module.exports = (passport) => {

  router.get('/failure', (req,res) => {
    res.send({state: 'failure', user: null, message: req.session.error});
    req.session.destroy();
  });

  router.post('/login', (req, res, next) => {
      passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(200).send({user: null, message:req.session.error});
        }
        req.logIn(user, err => {
          if (err) {
              return next(err);
          }
          return res.status(200).send({user: req.user, message:'success'});
        });
      })(req, res, next);
});

  router.get('/signout', (req, res) => {
     req.logout();
     req.session.destroy();
     res.redirect('/#login');
  });

  return router;
};
