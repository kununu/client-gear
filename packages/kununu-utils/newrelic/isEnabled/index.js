/**
 * checks if new relic is disabled in this environment
 *
 * @return {bool}
 */
module.exports = () => process.env.NR_AGENT_ENABLE;
