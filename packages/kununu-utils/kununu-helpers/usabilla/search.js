import cookies from '../cookies';

const STORAGE_USABILLA_LAST_SEARCH = 'usabillaLastSearch';
const STORAGE_USABILLA_PROFILE_SHOW = 'usabillaProfileShow';
const STORAGE_USABILLA_PROFILE_SHOW_EXPIRE_SECONDS = 20;
const STORAGE_USABILLA_LAST_SEARCH_EXPIRE_DAYS = 60;

export const getLastSearchStorage = () => {
  const lastSearch = {show: false};

  try {
    lastSearch = cookies.get(STORAGE_USABILLA_LAST_SEARCH);
  } catch (e) {}

  return lastSearch;
};

export const getProfilesVisibilityStorage = () => {
  return cookies.get(STORAGE_USABILLA_PROFILE_SHOW);
};

export const setProfilesVisibilityStorage = () => {
  const cookieExpireDate = new Date();

  cookieExpireDate.setSeconds(cookieExpireDate.getSeconds() + STORAGE_USABILLA_PROFILE_SHOW_EXPIRE_SECONDS);
  cookies.set(STORAGE_USABILLA_PROFILE_SHOW, true, {expires: cookieExpireDate, path: '/'});
};

export const setLastSearchStorage = (searchId, sessionId) => {
  cookies.set(STORAGE_USABILLA_LAST_SEARCH, {searchId, sessionId}, STORAGE_USABILLA_LAST_SEARCH_EXPIRE_DAYS);
};

export const shouldShow = (sessionId, searchId, lastSearch) => {
  return sessionId && (!lastSearch.sessionId || (lastSearch.sessionId && (sessionId !== lastSearch.sessionId || searchId === lastSearch.searchId)));
};