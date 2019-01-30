import {logger} from '../../kununu-logger';
import isClientRender from '../isClientRender';

export function apiErrorLogger(error, label) {
  if (!isClientRender()) {
    const {status, url} = error.response;

    logger.log('error', {
      custom: true,
      error: {
        status,
        url,
      },
      label,
    });
  }
}
