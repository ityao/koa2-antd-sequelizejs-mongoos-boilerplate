'use strict';
import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/login', async (ctx, next) => {
    if(ctx.isAuthenticated()){
        ctx.body = {user: ctx.state.user}
    }else{
        ctx.status = 400;
        ctx.body = {"status" : "LOGIN_SILENT_FAIL"}
    }
})

router.post('/login', async (ctx, next) => {
    console.log("login params: ", ctx.params);
    let middleware = passport.authenticate('local', async(user, info) => {
        if (user === false) {
            ctx.status = 400
            ctx.body = {'status' : 'LOGIN_FAIL'}
        } else {
            await ctx.login(user)
            ctx.body = {user: user}
        }
    })
    await middleware.call(this, ctx, next)
})

router.get('/logout', async (ctx, newt) => {
    ctx.logout()
    ctx.body = {status:'LOGOUT_SUCCESS'}
})

router.get('/status', async (ctx, next) => {
    ctx.body = {
        "isLogin" : ctx.isAuthenticated()
    }
})

export default router;
