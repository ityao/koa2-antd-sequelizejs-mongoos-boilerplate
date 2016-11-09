'use strict';

import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'
import config from './../config/config'
import {LOG} from './logger';

let orm;

if (!orm){
  orm = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
      max: config.mysql.pool.max,
      min: config.mysql.pool.min,
      idle: config.mysql.pool.idle
    }
  });
  LOG.debug("sequelize inited once!!!");
}

// Add transaction support
// http://stackoverflow.com/questions/38069797/easy-way-to-handle-nested-transactions

let namespace = Sequelize.cls = cls.createNamespace('fujin8.com');
const trans = option => operation => async function () {
  let t = namespace.get('transaction');
  let hasTrans = !!t;
  t = t  || await orm.transaction();
  try {
    let result = await operation.apply(null, arguments);
    if (!hasTrans) await t.commit();
    return result;
  }
  catch (e) {
    if (!hasTrans) await t.rollback();
    throw e;
  }
};

/* Usage sample for trans:

export const createSchool = trans()( async (name, accountProps) => {
    let school = await SchoolModel.create({name});
    let teacher = await createTeacher({...accountProps, schoolId: school.get('id')});
    return {school, teacher};
});

*/

//export default sequelize
module.exports = {
  orm: orm,
  trans: trans,
  Sequelize: Sequelize
}