'use strict';


import {Sequelize,orm} from './../../lib/sequelize';
import log4js from 'log4js';
const LOG = log4js.getLogger('file');

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
User.sync({force: true}).then(function () {
  // Table created
  LOG.debug("mysql inited data!!!",arguments);
  User.create({"username" : "test", "password" : "test"});
})

export default User;