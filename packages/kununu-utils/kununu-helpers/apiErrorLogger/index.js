import {logger} from '../../kununu-logger';
import isClientRender from '../isClientRender';

export default function (error, label) {
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
