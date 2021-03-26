# Logs

There are 2 different loggers provided by this package. the `default logger` and the `request logger`.

Loggers can be imported using 
`const {logger, requestLogger} = require('@kununu/kununu-utils/dist/kununu-logger');`

The **request logger** is used by `@kununu/kununu-utils/dist/middlewares/expressLogger` middleware to log all app requests. The **logger** is mostly used for the general logs and has different rules when compared to the **request logger**.


## Default Logger
This one has 2 types of transport. FingersCrossed if `NODE_ENV` is production, Console if not.
 - **FingersCrossed** - This follows the same logic as the [Symfony FingersCrossed built-in logger](https://symfony.com/doc/current/logging.html), which has a minimum log level that should be printed and an activation level that will trigger print every logs stores since the last time this log level was called. 
 - **Console** - A console log with a minimum log level.

## Request Logger
 
The transports for request logger are always the same and `NODE_ENV` has no impact to it.
- **Console** - A console log with a minimum log level.

## Format
The log format for both loggers is always the same and is combining a timestamp and [a custom log format](https://github.com/kununu/client-gear/blob/28035c4e6d4ea00e85f88d575bde88e567a190da/packages/kununu-utils/kununu-logger/format-node-request/index.js#L13) that includes things like `build`, `logLevel`, `method`, `user-agent`, `trace_id`, etc.

## Default Configs

- **Minimum Log Level** - `info` or the value stored on `MINIMUM_LOG_LEVEL` env var.
- **Request Minimum Log Level** - `info` or the value stored on `REQUEST_MINIMUM_LOG_LEVEL` env var.
- **Activation Log Level** - `error` or the value stored on `ACTIVATION_LOG_LEVEL` env var.
- **Log Levels** - `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info` and `debug`.