'use strict';
import {Sequelize,orm} from './../../lib/sequelize';
import {LOG} from './../../lib/logger';

var Session = orm.define('session', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true,
    field: 'id'
  },
  session: {
    type: Sequelize.TEXT,
    field: 'session'
  },
  maxAge: {
    type:Sequelize.BIGINT,
    field: 'max_age'
  }
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

//自动创建
//Session.sync({force:true})

export default Session;