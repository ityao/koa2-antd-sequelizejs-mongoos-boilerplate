'use strict';

import Koa from 'koa'
import baseconfig from './config/base'
import middleware from './middleware'
import routes from './routes'
import config from './config/config'
import {LOG} from './lib/logger'

const app = new Koa()

//configure basic app
baseconfig(app)

//configure custom middleware
app.use(middleware())

//configure custom routes
app.use(routes())

app.listen(config.app.port)
LOG.info("Server started, listening on port: " + config.app.port)
//LOG.info("Config paramters: ", JSON.stringify(config))

export default app