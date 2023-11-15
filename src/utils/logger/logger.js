require("winston-daily-rotate-file")
const { createLogger} = require("winston");
const {errorFileTransport,infoFileTransport,logTransport,elasticSearchTransport}=require("./transports")


const logger = createLogger({
  transports: [
    logTransport,
    errorFileTransport,
    infoFileTransport,
    elasticSearchTransport,
  ],
});





module.exports = logger;
