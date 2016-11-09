'use strict';
import {LOG} from '../lib/logger';
import {User} from './mysql/index';

const Account = {}

Account.findOne = async function (id, cb) {
  return await User.findById(id)
}

Account.verify = async function(username, password) {

  let user = await User.findOne({where:{username:username,password:password}})
  if (user){
    user = user.toJSON()
    return user
  }else{
    return null
  }

}

export default Account;