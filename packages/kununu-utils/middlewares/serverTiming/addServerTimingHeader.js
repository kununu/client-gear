import {SERVER_TIMING} from './constants';

/**
 * Returns a description in a format for the Server-Timing Header
 *
 * @param {string} description
 */
const getServerTimingDescription = description => `desc=${description}`;

/**
 * Returns the duration in a format for the Server-Timing Header
 *
 * @param {string} startTime
 */
const getServerTimingDuration = startTime => `dur=${Date.now() - startTime}ms`;

export default function (res, label, startTime, description) {
  const serverTimingHeader = res.getHeader(SERVER_TIMING) ? res.getHeader(SERVER_TIMING).split(',') : [];

  const serverTimingParts = [label, getServerTimingDuration(startTime)];

  if (description) serverTimingParts.push(getServerTimingDescription(description));

  res.setHeader(SERVER_TIMING, [...serverTimingHeader, serverTimingParts.join(';')].join(', '));
}
