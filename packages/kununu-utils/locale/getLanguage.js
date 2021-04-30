import {languageCookie} from './languageCookie';
import {LANGUAGES, DEFAULT_LOCALE} from './languageConfigs';

const supportedLanguageCodes = Object.keys(LANGUAGES);

/**
 * @see https://github.com/opentable/accept-language-parser
 */
function parseAcceptLanguage (acceptLanguageHeader) {
  return acceptLanguageHeader.replace(/ /g, '').split(',').map((m) => {
    const bits = m.split(';');
    const ietf = bits[0].split('-');
    const hasScript = ietf.length === 3;

    return {
      code: ietf[0],
      quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
      region: hasScript ? ietf[2] : ietf[1],
      script: hasScript ? ietf[1] : null,
    };
  }).sort((a, b) => b.quality - a.quality);
}

function getLocaleFromUrl (originalUrl) {
  const match = originalUrl.match(/^\/(?<countryCode>[a-z]{2})(\/|$)/);
  const countryCode = match && match.groups ? match.groups.countryCode : undefined;

  if (!countryCode) {
    return DEFAULT_LOCALE;
  }

  const countryIsLanguage = supportedLanguageCodes.includes(countryCode);

  if (countryIsLanguage) {
    return LANGUAGES[countryCode].default;
  }

  const language = supportedLanguageCodes.find(lang => LANGUAGES[lang].countries.includes(countryCode));

  if (language) {
    return LANGUAGES[language].default;
  }

  return DEFAULT_LOCALE;
}

function getLocaleFrom (xLang) {
  if (xLang) {
    const [language] = xLang.split('_');

    if (supportedLanguageCodes.includes(language)) {
      return LANGUAGES[language].default;
    }
  }
  return null;
}

function getLocaleFromAcceptLanguage (acceptLanguage) {
  if (acceptLanguage) {
    const parsedAcceptLanguages = parseAcceptLanguage(acceptLanguage);
    // still missing on find, retrieved from app-profiles supportedLanguageCodes.includes(al.code.split('-')[0]
    const languageSupported = parsedAcceptLanguages.find(parsedAcceptLanguage => supportedLanguageCodes.includes(parsedAcceptLanguage.code) || parsedAcceptLanguage.code === '*');

    if (languageSupported) {
      const areAllLanguagesSupported = languageSupported.code === '*';

      return areAllLanguagesSupported ? DEFAULT_LOCALE : LANGUAGES[languageSupported.code].default;
    }
  }
  return null;
}

function buildLanguage (locale) {
  return {
    hrefLang: locale.replace('_', '-'),
    language: locale.split('_')[0],
    locale,
  };
}

function getLanguage (req, res) {
  const {'x-lang': xLangQuery} = req.query;
  const {kununu_x_lang: xLangCookie} = req.cookies;
  const {'accept-language': acceptLanguage} = req.headers;

  const locale = getLocaleFromUrl(req.originalUrl);

  // NOTE: Added this validation while using `xLangQuery` as a hidden feature.
  // if (typeof xLangQuery === 'undefined') {
  //   return buildLanguage(locale);
  // }

  const localeFromXLang = getLocaleFrom(xLangQuery) || getLocaleFrom(xLangCookie) || getLocaleFromAcceptLanguage(acceptLanguage);
  const language = buildLanguage(localeFromXLang || locale);

  // TODO: remove from here and put ir on a middleware
  languageCookie.server.set(res, language.locale);

  return language;
}

export default getLanguage;
