import {v4 as uuidv4} from 'uuid';

import cookies from '../cookies';
import isClientRender from '../isClientRender';

const KUNUNU_SESSION_ID_NAME = 'kununu_session_id';

const checkKununuSession = () => {
  if (isClientRender()) {
    const sessionCookie = cookies.get(KUNUNU_SESSION_ID_NAME);
    let expires = new Date();
    const midnight = new Date();

    // sets the expiry date to midnight
    expires.setMinutes(expires.getMinutes() + 30);
    midnight.setHours(24, 0, 0, 0);

    if (expires > midnight) {
      expires = midnight;
    }

    const cookieProps = {
      expires,
      path: '/',
    };

    if (sessionCookie) {
      cookies.set(KUNUNU_SESSION_ID_NAME, sessionCookie, cookieProps);
    } else {
      cookies.set(KUNUNU_SESSION_ID_NAME, uuidv4(), cookieProps);
    }
  }
};

export default checkKununuSession;
