/**
 * Created by silver on 16/9/3.
 */
import log4js from 'log4js';

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'dateFile', filename: __dirname + '/../../logs/date-log' , "pattern":"-yyyy-MM-dd.log","alwaysIncludePattern":true, category: 'file' },
    { type: 'dateFile', filename: __dirname + '/../../logs/trans-log' , "pattern":"-yyyy-MM.log","alwaysIncludePattern":true, category: 'tans' }
  ],
  replaceConsole: true
});

const LOG = log4js.getLogger('file');
const LOG_TRANS = log4js.getLogger('trans');

if(process.env.NODE_ENV == "development"){
  LOG.setLevel('DEBUG')
}else{
  LOG.setLevel('ERROR')
}

LOG.debug("Log4J configured!");

module.exports = {
 LOG,
 LOG_TRANS
}