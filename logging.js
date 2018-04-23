var log4js = require('log4js');
var logger = log4js.getLogger();
var moment=require('moment');
logger.level = 'INFO';
exports.log = log;


  function log(log) {
   
        try {
            log = JSON.stringify(log);

        }
        catch (exception) {
        }
        console.log("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
            log);
        
    
}


exports.logError = logError;

function logError(log) {
  

        try {
            log = JSON.stringify(log);
        }
        catch (exception) {
        }
         console.error("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
            log);
       
    
}


