import {v4 as uuidv4} from 'uuid';

import cookies from '../cookies';
import isClientRender from '../isClientRender';

const KUNUNU_SESSION_ID_NAME = 'kununu_session_id';

const publishLoggedInEvent = (fetchApi) => {
  const params = {
    body: {
      type: 'login',
      source: 'logged_in_entrance',
    },
    credentials: 'same-origin',
    headers: {},
    method: 'POST',
  };

  fetchApi('/kunubi/event/logged-in-entrance', {}, params, 10000, false)();
};

const checkKununuSession = (config = {}) => {
  const {
    cookieName = KUNUNU_SESSION_ID_NAME,
    cookieValueGenerator = uuidv4,
    fetchApiFunc = () => {},
    shouldPublishLoggedInEvent = false,
  } = config;

  if (isClientRender()) {
    const sessionCookie = cookies.get(cookieName);
    const midnight = new Date();
    let expires = new Date();

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
      cookies.set(KUNUNU_SESSION_ID_NAME, cookieValueGenerator(), cookieProps);
      if (shouldPublishLoggedInEvent && cookies.get('kununu_user_logged_info')) {
        publishLoggedInEvent(fetchApiFunc);
      }
    }
  }
};

export default checkKununuSession;
