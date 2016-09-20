'use strict';
import Wechat from 'koa2-wechat'
import {LOG} from '../lib/logger'
import config from './../config/config'

export default function wechat() {

  return async function (ctx, next) {
    //只监听微信的响应, 否则不予理睬
    if (ctx.path.indexOf('/wechat/') != 0) {

      await next()

    } else {

      let appid = ctx.path.split("/",3)[2]
      if (!appid || !config.wechat[appid]){
        LOG.debug("weixin path error: ", ctx.path)
        ctx.status = 501
        ctx.body = 'Not Valid Path'
        return
      }

      ctx.state.appid = appid

      //可以从数据库里面读取配置做第三方接入, 动态配置token
      let setting =  {
        token: config.wechat[appid].token,
        appid: appid,
        encodingAESKey: config.wechat[appid].encodingAESKey
      }

      await Wechat(setting).middleware( async (ctx)=>{

        const message = ctx.state.weixin
        LOG.debug("weixin message: ", message);
        ctx.body = '这是回复!!'

      })(ctx, next)

    }
  }
}