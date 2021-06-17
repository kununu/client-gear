import cookies from '../cookies';

const STORAGE_USABILLA_LAST_SEARCH = 'usabillaLastSearch';
const STORAGE_USABILLA_PROFILE_SHOW = 'usabillaProfileShow';
const STORAGE_USABILLA_PROFILE_SHOW_EXPIRE_SECONDS = 20;
const STORAGE_USABILLA_LAST_SEARCH_EXPIRE_DAYS = 60;

export const deleteProfilesVisibilityStorage = () => {
  const cookieExpireDate = new Date();

  cookieExpireDate.setDate(cookieExpireDate.getDate() - 1);
  cookies.set(STORAGE_USABILLA_PROFILE_SHOW, false, {expires: cookieExpireDate, path: '/'});
};

export const getLastSearchStorage = () => {
  let lastSearch = {show: false};

  try {
    lastSearch = cookies.get(STORAGE_USABILLA_LAST_SEARCH);
  } catch (e) {}

  return lastSearch;
};

export const getProfilesVisibilityStorage = () => cookies.get(STORAGE_USABILLA_PROFILE_SHOW);

export const setLastSearchStorage = (searchId, sessionId) => {
  const cookieExpireDate = new Date();

  cookieExpireDate.setDate(cookieExpireDate.getDate() + STORAGE_USABILLA_LAST_SEARCH_EXPIRE_DAYS);
  cookies.set(STORAGE_USABILLA_LAST_SEARCH, {searchId, sessionId}, STORAGE_USABILLA_LAST_SEARCH_EXPIRE_DAYS, {expires: cookieExpireDate, path: '/'});
};

export const setProfilesVisibilityStorage = () => {
  const cookieExpireDate = new Date();

  cookieExpireDate.setSeconds(cookieExpireDate.getSeconds() + STORAGE_USABILLA_PROFILE_SHOW_EXPIRE_SECONDS);
  cookies.set(STORAGE_USABILLA_PROFILE_SHOW, true, {expires: cookieExpireDate, path: '/'});
};

export const shouldShow = (sessionId, searchId, lastSearch) => sessionId && (!lastSearch.sessionId || (lastSearch.sessionId && (sessionId !== lastSearch.sessionId || searchId === lastSearch.searchId)));
