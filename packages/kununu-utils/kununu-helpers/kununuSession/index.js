import {v4 as uuidv4} from 'uuid';

import cookies from '../cookies';
import isClientRender from '../isClientRender';

const KUNUNU_SESSION_ID_NAME = 'kununu_session_id';

const checkKununuSession = (config={}) => {
  const {
    cookieName=KUNUNU_SESSION_ID_NAME,
    cookieValueGenerator=uuidv4,
    newCookieCallback=()=>{},
  } = config;
  if (isClientRender()) {
    const sessionCookie = cookies.get(cookieName);
    const expiryDate = new Date();

    // sets the expiry date to midnight
    // expires has priority over maxAge
    expiryDate.setHours(24, 0, 0, 0);
    const cookieProps = {
      expires: expiryDate,
      maxAge: 1800,
      path: '/',
    };

    if (sessionCookie) {
      cookies.set(KUNUNU_SESSION_ID_NAME, sessionCookie, cookieProps);
    } else {
      cookies.set(KUNUNU_SESSION_ID_NAME, cookieValueGenerator(), cookieProps);
      newCookieCallback();
    }
  }
};

const publishLoggedInEvent = (fetchApi) => {
  const params = {
    body:     {
      type: 'login',
      source: 'logged_in_entrance',
    },
    credentials: 'same-origin',
    headers: {},
    method: 'POST',
  };

  fetchApi('/kunubi/event/logged-in-entrance', {}, params, 10000, false, false)();
};

export {
  checkKununuSession,
  publishLoggedInEvent,
};
