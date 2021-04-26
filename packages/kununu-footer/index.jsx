import React from 'react';
import PropTypes from 'prop-types';
import {DropDown, DropDownItem} from 'nukleus/dist/components/DropDown';
import {Link} from 'react-router-dom';
import HeartIcon from '@kununu/kununu-icons/dist/HeartOutline';
import Logo from '@kununu/kununu-logo';

import FooterNav from './FooterNav';
import styles from './index.scss';

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
}) {
  const activeCountry = () => {
    const active = countrySwitcher.filter(item => item.active);

    return (
      <span>
        {active[0].value}
        {' '}
        {active[0].icon}
      </span>
    );
  };

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
              key={index} // eslint-disable-line react/no-array-index-key
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
                key={index} // eslint-disable-line react/no-array-index-key
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
                  key={index} // eslint-disable-line react/no-array-index-key
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
              title="English"
            >
              <DropDownItem>
                <Link to="/at?x-lang=en_US">English</Link>
              </DropDownItem>
              <DropDownItem>
                <Link to="/">German</Link>
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
