/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import {DropDown, DropDownItem} from 'nukleus/dist/components/DropDown';
import HeartIcon from '@kununu/kununu-icons/dist/HeartOutline';
import FlagDeIcon from '@kununu/kununu-icons/dist/FlagDe';
import FlagUsIcon from '@kununu/kununu-icons/dist/FlagUs';
import isClientRender from '@kununu/kununu-utils/kununu-helpers/isClientRender';
import Logo from '@kununu/kununu-logo';

import ActiveLanguage from './ActiveLanguage';
import FooterNav from './FooterNav';
import {setLanguageCookieOnBrowser} from './utils/languageCookie';
import {X_LANG_REGEX, LANGUAGES} from './utils/languageConfigs';
import getSelectedLanguage from './utils/getSelectedLanguage';
import styles from './index.scss';

// TODO: should we read from window.navigator.language
// TODO: update cookie on first render if has a query
// TODO: update package.json version
// TODO: hide languages if x-lang is not on the url
// TODO: Move languages functions to kununu-utils

function buildLanguageUrl (language) {
  if (isClientRender()) {
    const {pathname, search, hash} = window.location;

    const hasXLang = search.includes('x-lang=');
    const xLangParameter = `x-lang=${language}`;
    let normalizedSearch;

    if (hasXLang) {
      normalizedSearch = search.replace(X_LANG_REGEX, xLangParameter);
    } else {
      normalizedSearch = search ? `${search}&${xLangParameter}` : `?${xLangParameter}`;
    }

    return `${pathname}${normalizedSearch}${hash}`;
  }

  return '';
}

function makeHandleOnLanguageClick (language) {
  return function handleOnLanguageClick () {
    setLanguageCookieOnBrowser(language);
  };
}

export default function Footer ({
  container,
  infoText,
  items: {
    countrySwitcher,
    navs,
  },
  pathname,
  simpleMobile,
  assetsPath,
  renderTranslation,
}) {
  const activeCountry = () => {
    const active = countrySwitcher.find(item => item.active);

    return (
      <span>
        {active.value}
        {' '}
        {active.icon}
      </span>
    );
  };

  const selectedLanguage = getSelectedLanguage();

  return (
    <footer
      role="banner"
      id="footer"
      className={`${styles.footer} ${simpleMobile ? styles.simpleMobile : ''}`}
    >
      <div className={container}>
        <div className={`${styles.flex} ${styles.contentSection}`}>
          <div className={`${styles.menuColumns} ${styles.visibleXs}`}>
            <FooterNav
              dynamicNav
              items={countrySwitcher}
              pathname={pathname}
              type="col"
            />
          </div>
          {navs.cols.map((item, index) => (
            <div
              className={styles.menuColumns}
              key={index}
            >
              <FooterNav
                items={item.items}
                pathname={pathname}
                title={item.title}
                type="col"
              />
            </div>
          ))}
          <div className={styles.infoTextColumn}>
            <div className={styles.logoContainer}>
              <Logo assetsPath={assetsPath} />
            </div>
            <p className={styles.infoText}>
              {infoText}
            </p>
            <p className={styles.infoText}>
              made with
              {' '}
              <HeartIcon className={`${styles.heart} ${styles.icon}`} />
              {' '}
              in Vienna, Porto, Berlin
            </p>
          </div>
        </div>
        <div className={styles.bottomMenu}>
          <div>
            {navs.rows.map((item, index) => (
              <FooterNav
                key={index}
                pathname={pathname}
                items={item.items}
                type="row"
              />
            ))}
          </div>
          <div className={`${styles.dropdown} ${styles.hiddenXs}`}>
            <DropDown
              direction="up"
              shade="light"
              showOnHover={false}
              pullRight
              title={activeCountry()}
            >
              {countrySwitcher.map((item, index) => (
                <DropDownItem
                  key={index}
                  icon={item.icon}
                >
                  {item.link}
                </DropDownItem>
              ))}
            </DropDown>
          </div>
          <div className={`${styles.dropdown} ${styles.hiddenXs}`}>
            <DropDown
              direction="up"
              shade="light"
              showOnHover={false}
              pullRight
              title={
                (
                  <ActiveLanguage
                    language={selectedLanguage}
                    renderTranslation={renderTranslation}
                  />
                )}
            >
              <DropDownItem icon={<FlagUsIcon className={styles.flag} />}>
                <a
                  onClick={makeHandleOnLanguageClick(LANGUAGES.en.default)}
                  href={buildLanguageUrl(LANGUAGES.en.default)}
                >
                  {renderTranslation('AP_LANGUAGE_EN')}
                </a>
              </DropDownItem>
              <DropDownItem icon={<FlagDeIcon className={styles.flag} />}>
                <a
                  onClick={makeHandleOnLanguageClick(LANGUAGES.de.default)}
                  href={buildLanguageUrl(LANGUAGES.de.default)}
                >
                  {renderTranslation('AP_LANGUAGE_DE_DE')}
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  assetsPath: PropTypes.string,
  container: PropTypes.string,
  infoText: PropTypes.element.isRequired,
  renderTranslation: PropTypes.func.isRequired,
  items: PropTypes.shape({
    countrySwitcher: PropTypes.arrayOf(PropTypes.shape({
      active: PropTypes.bool,
      icon: PropTypes.element,
      link: PropTypes.element.isRequired,
      value: PropTypes.string.isRequired,
    })),
    navs: PropTypes.shape({
      cols: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          link: PropTypes.element.isRequired,
          value: PropTypes.string.isRequired,
        })),
        title: PropTypes.string,
      })),
      rows: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          link: PropTypes.element.isRequired,
          value: PropTypes.string.isRequired,
        })),
        title: PropTypes.string,
      })),
    }),
  }),
  pathname: PropTypes.string.isRequired,
  simpleMobile: PropTypes.bool,
};

Footer.defaultProps = {
  assetsPath: 'https://assets.kununu.com/images/footer',
  container: 'container-fluid',
  items: {},
  simpleMobile: false,
};
