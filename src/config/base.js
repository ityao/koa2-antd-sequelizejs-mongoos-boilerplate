'use strict';
import convert from 'koa-convert'
import cors from 'kcors'
import Serve from 'koa-static'
import Logger from 'koa-logger'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session2'
import views from 'koa-views'
import passport from './passport'
import Store from '../lib/store'
import {LOG} from '../lib/logger';

export default function middleware(app) {

    app.proxy = true;
    app.use(cors({ credentials: true }))
    app.use(convert(Logger()))
    app.use(bodyParser())
    app.use(mount("/", convert(Serve(__dirname + '/../public/'))))
    app.keys = ['silver-session-key']

    //cookie中的sessionid , Session有效时间30天
    app.use(session({store: new Store(),key: "silver_sid", maxAge: 1000*60*60*24*30}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(views(__dirname + '/../views', {extension: 'ejs'}))

}