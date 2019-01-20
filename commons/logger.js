const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const dateFormat = require('dateformat');
const appName = require('../package.json').name;
const conf = require('../configuration/config');

const { combine, timestamp, printf } = format;

const formatter = printf(
  info => `${dateFormat(info.timestamp, 'dd-mm-yyyy HH:MM:ss')} - [${info.level}]: ${info.message}`,
);

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), formatter),
  transports: [
    new transports.Console({ format: format.combine(format.colorize(), formatter) }),
    new transports.DailyRotateFile({
      dirname: conf.get('LOG_PATH') || '.',
      filename: `%DATE%-${appName}.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

module.exports = logger;
