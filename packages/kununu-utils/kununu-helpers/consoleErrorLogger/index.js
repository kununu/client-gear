import {logger} from '../../kununu-logger';
import isClientRender from '../isClientRender';

export default function (error, label) {
  if (isClientRender()) {
    logger.log('error', {
      custom: true,
      error,
      label,
    });
  }
}
