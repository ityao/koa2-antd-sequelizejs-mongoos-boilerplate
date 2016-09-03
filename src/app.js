'use strict';

import Koa from 'koa'
import baseconfig from './config/base'
import middleware from './middleware'
import routes from './routes'
import config from './config/config'
import log4js from 'log4js'

const app = new Koa()

//configure log level
const LOG = log4js.getLogger('file')
if(process.env.NODE_ENV == "development"){
  LOG.setLevel('DEBUG')
}else{
  LOG.setLevel('ERROR')
}

//configure basic app
baseconfig(app)

//configure custom middleware
app.use(middleware())

//configure custom routes
app.use(routes())

app.listen(config.app.port)
LOG.info("Server started, listening on port: " + config.app.port)
LOG.info("Config paramters: ", JSON.stringify(config))

export default app