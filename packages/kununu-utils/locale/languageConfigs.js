export const X_LANG_REGEX = /x-lang=(de_DE|en_US)/gi;
export const X_ANY_LANGUAGE_REGEX = /x-lang=(.+_.+)/gi;

export const LANGUAGES = {
  de: {
    countries: ['at', 'ch', 'de'],
    default: 'de_DE',
  },
  en: {
    countries: ['us'],
    default: 'en_US',
  },
};

export const DEFAULT_LOCALE = LANGUAGES.de.default;
