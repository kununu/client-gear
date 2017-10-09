import HttpStatus from 'http-status-codes';

const prefetchedStatePrefix = 'window.__PRELOADED_STATE__ = ';

/**
 * return the prefetched state as an object
 *
 * @author Daniel Stein
 * @param {string} state
 * @return {Object}
 */
export const getPrefetchedState = (state) => JSON.parse(state.replace(prefetchedStatePrefix, '').replace(/;([^;]*)$/, '$1'));

/**
 * Change the status of the response to a 404 code
 *
 * @author Daniel Stein
 * @param {Object} res
 * @param {number} status
 * @return {Object}
 */
export const getResponseWithCustomStatus = (res, status) => ({
  ...res,
  status,
});

/**
 * Checks in the status code reducer, if the content of
 * the ssr render needs to be updated with a new status code,
 * before it is sent to client
 *
 * @author Daniel Stein
 * @param {Object} result
 * @return {Object}
 */
export function updateStatusCode (result) {
  const prefetchedState = getPrefetchedState(result.prefetch);

  // Check the status code reducer for current http code
  const {statusCodes} = prefetchedState;
  switch (statusCodes.code) {
    case HttpStatus.NOT_FOUND:
      return getResponseWithCustomStatus(result, HttpStatus.NOT_FOUND);
    case HttpStatus.MOVED_PERMANENTLY:
    case HttpStatus.MOVED_TEMPORARILY:
      return {
        status: statusCodes.code,
        path: prefetchedState.statusCodes.meta.redirectPath,
      };
    default:
      return result;
  }
}

