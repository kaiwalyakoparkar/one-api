const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, colorize, printf } = format;

const logHandler = createLogger({
  levels: config.npm.levels,
  level: 'silly',
  transports: [new transports.Console()],
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    colorize(),
    printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  exitOnError: false,
});

module.exports = logHandler;
