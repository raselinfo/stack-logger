const {  transports, format } = require("winston");
const {ElasticsearchTransport}=require("winston-elasticsearch")
const { combine,  timestamp, json } = format;




// Elasticsearch Transport
const elasticSearchTransport = new ElasticsearchTransport({
  level: "http",
  clientOpts: { node: "http://localhost:9200" },
  indexPrefix: "log-express",
  indexSuffixPattern: "YYYY-MM-DD",
});



// File Transport
const loggerTransport = (filename, level) => {
  return new transports.DailyRotateFile({
    level: level || "info",
    format: combine(timestamp(), json()),
    filename: filename || "logs/error/%DATE%.log",
    maxFiles: "14d",
    maxSize: "2m",
    zippedArchive: true,
  });
};

// Console transport
const logTransport = new transports.Console({
  level: "http",
  format: combine(timestamp(), json()),
});

const errorFileTransport = loggerTransport("logs/error/%DATE%.log", "error");
const infoFileTransport = loggerTransport("logs/info/%DATE%.log", "info");



// DailyRotateFiles Events
loggerTransport().on("new", (filename) => {

});
// fired when a log file is rotated
loggerTransport().on("rotate", (oldFilename, newFilename) => {

});
// fired when a log file is archived
loggerTransport().on("archive", (zipFilename) => {

});
// fired when a log file is deleted
loggerTransport().on("logRemoved", (removedFilename) => {

});


module.exports = {
  logTransport,
  errorFileTransport,
  infoFileTransport,
  elasticSearchTransport,
};