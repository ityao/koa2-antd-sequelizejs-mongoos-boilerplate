'use strict';
import {LOG} from '../lib/logger';
import {User} from './mysql/index';

const Account = {}

Account.findOne = async function (id, cb) {

    return await User.findById(id)

    //Mock Scripts
    /*
    const account = {"id": 1, "username" : "test", "password" : "test"}
    cb(null, account)
    */

}

Account.verify = async function(username, password) {

  //let account = await db.query('select * from t_account where email = ?', [username])
  LOG.warn("enter verify: "+JSON.stringify({'username' : username,'password' : password}))
  let user = await User.findOne({where:{username:username,password:password}})
  user = user.toJSON()
  LOG.warn("user:",user)
  return user

    //Mock Scripts
    /*
    let account = [{"id": 1, "username" : "test", "password" : "test"}]

    if(account == null || account.length != 1) {
        return null;
    } else{
        if((account[0].password == password) && (account[0].username == username)) {
            return account[0];
        } else {
            return null;
        }
    }*/

}

export default Account;