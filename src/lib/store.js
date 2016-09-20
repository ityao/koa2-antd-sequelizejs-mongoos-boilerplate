'use strict';
import config from './../config/config'
import {LOG} from './logger'
import {Store} from "koa-session2"
import {Session} from './../models/mysql'

export default class MysqlStore extends Store {

  constructor() {
    super();
    //this.redis = new Redis();
  }

  async get(sid) {
    let db_session = await Session.findById(sid);
    if (db_session){
      //LOG.debug("MysqlStore get: "+db_session.session);
      return JSON.parse(db_session.session);
    }else{
      return null;
    }
  }

  async set(session, opts) {
    if(!opts.sid) {
      opts.sid = this.getID(24);
    }
    //LOG.debug("MysqlStore set: ",session, opts);
    let db_session = (await Session.findOrCreate({where:{id:opts.sid},defaults:{id:opts.sid}}))[0];
    db_session.session = JSON.stringify(session)
    db_session.maxAge = opts.maxAge
    //LOG.debug("MysqlStore db: ",db_session);
    await db_session.save();
    return opts.sid;
  }

  async destroy(sid) {
    let db_session = await Session.findById(sid);
    if (db_session){
      await db_session.destroy();
    }
    return
  }
}