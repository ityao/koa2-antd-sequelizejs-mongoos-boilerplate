'use strict';

import passport from 'koa-passport';
import AccountModel from '../models/account';
import log4js from 'log4js';

const LOG = log4js.getLogger('file');
var LocalStrategy = require('passport-local').Strategy


passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {

  AccountModel.findOne(id).then((user)=>{
    done(null, user)
  }).catch((err)=>{
    done(err)
  });

})

passport.use(new LocalStrategy(function(username, password, done) {
  
  AccountModel.verify(username, password)
    .then(function(result) {

        LOG.debug("passport verify:", result.id, result.username);

        if(result != null) {
            done(null, result)
        }  else {
            done(null, false)
        }
    })
}))

module.exports = passport;