'use strict';

//import compose from 'koa-compose';
import convert from 'koa-convert';
import cors from 'kcors';
import Serve from 'koa-static';
import Logger from 'koa-logger';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import views from 'koa-views';
import passport from './passport'
//import passport from 'koa-passport';

import log4js from 'log4js';

export default function middleware(app) {

    log4js.configure({
        appenders: [
            { type: 'console' },
            { type: 'dateFile', filename: __dirname + '/../../logs/date-log' , "pattern":"-yyyy-MM-dd.log","alwaysIncludePattern":true, category: 'file' }
        ],
        replaceConsole: true
    });

    app.proxy = true;
    app.use(cors({ credentials: true }))
    app.use(convert(Logger()))
    app.use(bodyParser())
    app.use(mount("/", convert(Serve(__dirname + '/../public/'))))
    app.keys = ['silver-2016-session-key']

    app.use(convert(session()))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(views(__dirname + '/../views', {extension: 'ejs'}))

}