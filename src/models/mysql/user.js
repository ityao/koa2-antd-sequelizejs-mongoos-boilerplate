'use strict';
import {Sequelize,orm} from './../../lib/sequelize';
import {LOG} from './../../lib/logger';

var User = orm.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id'
  },
  username: {
    type: Sequelize.STRING,
    field: 'name'
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

//初始化
/*
User.sync({force: false}).then(async()=>{
  let admin = await User.findById(1);
  if (!admin){
    User.create({"username" : "test", "password" : "test"});
    LOG.debug("mysql reinited data!!!");
  }
})*/



export default User;