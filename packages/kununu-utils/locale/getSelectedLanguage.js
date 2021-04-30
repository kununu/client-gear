import isClientRender from '../kununu-helpers/isClientRender';

import {languageCookie} from './languageCookie';
import {X_LANG_REGEX, DEFAULT_LOCALE} from './languageConfigs';

function getLocaleByQuery () {
  const match = X_LANG_REGEX.exec(window.location.search);

  return match && match[1];
}

function getSelectedLanguage () {
  if (isClientRender()) {
    return getLocaleByQuery() || languageCookie.browser.get() || DEFAULT_LOCALE;
  }

  return DEFAULT_LOCALE;
}

export default getSelectedLanguage;
