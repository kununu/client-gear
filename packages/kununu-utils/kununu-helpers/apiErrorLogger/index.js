import {logger} from '../../kununu-logger';
import isClientRender from '../isClientRender';

export default function (exception, application) {
  if (!isClientRender()) {
    const {status, url} = exception.response;

    logger.error({
      application,
      context: {
        status,
        url,
      },
      message: 'API has reached an error',
    });
  }
}
