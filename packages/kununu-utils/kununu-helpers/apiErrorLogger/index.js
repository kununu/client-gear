import {logger} from '../../kununu-logger';
import isClientRender from '../isClientRender';

export default function (exception, label) {
  if (!isClientRender()) {
    const {status, url} = exception.response;

    logger.error({
      exception: {
        status,
        url,
      },
      label,
    });
  }
}
