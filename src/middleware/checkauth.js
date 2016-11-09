'use strict';

export default function checkauth() {
    return async function (ctx, next) {

      //是否不用鉴证的目录或者已经鉴证过用户
      if (
        ctx.path.indexOf('/auth/') == 0
        || ctx.path.indexOf('/open/') == 0
        || ctx.path==='/'
        || ctx.path.indexOf('.html') == 0
        || ctx.isAuthenticated()) {
          await next()
      } else {
          ctx.body = {
              "status" : 401
          }
      }
    }
}