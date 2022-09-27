const isEnabled = require('../isEnabled');

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 *
 * @return {Object}
 */
module.exports = () => ({
  /**
   * Array of application names.
   */
  app_name: process.env.NR_APPLICATION_NAME.split(';'),
  /**
   * Your New Relic license key.
   * IF NR_AGENT_DISABLE is set to true, disable new relic passing an invalid license key: '0000000000000000'
   */
  license_key: isEnabled() ? process.env.NR_INSTALL_KEY : '0000000000000000',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info',
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: false,
  distributed_tracing: {
    enabled: 'true',
  },
  /**
   * Sets Infinite tracer host if available, see https://one.eu.newrelic.com/edge
   */
  infinite_tracing: {
    trace_observer: {
      host: process.env.NR_INFINITE_TRACER_HOST ?? '',
    },
  },
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
});
