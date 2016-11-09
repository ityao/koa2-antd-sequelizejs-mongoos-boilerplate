'use strict';

import passport from 'koa-passport';
import Account from '../models/account'
import {LOG} from '../lib/logger'

var LocalStrategy = require('passport-local').Strategy

//序列化只保存用户的id
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

//获取最新的用户状态
passport.deserializeUser(function(id, done) {
  //LOG.debug("passport deserializeUser:", id);
  Account.findOne(id).then((user)=>{
    done(null, user)
  }).catch((err)=>{
    done(err)
  });

})

passport.use(new LocalStrategy(function(username, password, done) {
  
  Account.verify(username, password).then(function(result) {
    //LOG.debug("passport verify:", result.id, result.username);
    if(result != null) {
        done(null, result)
    }  else {
        done(null, false)
    }
  })

}))

module.exports = passport;