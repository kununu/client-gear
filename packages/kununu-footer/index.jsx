import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ToolTip from 'nukleus/dist/components/ToolTip';
import DropDown from 'nukleus/dist/components/DropDown';
import HeartIcon from '@kununu/kununu-icons/dist/HeartOutline';
import Logo from '@kununu/kununu-logo';

import FooterNav from './FooterNav';
import styles from './index.scss';
import TuvIcon from './Tuv';

export default class Footer extends Component { // eslint-disable-line
  render () {
    const {
      container,
      infoText,
      items,
      pathname,
      simpleMobile,
      tuv,
      assetsPath,
    } = this.props;

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
                items={items.countrySwitcher}
                pathname={pathname}
                type="col"
              />
            </div>
            {items.navs.cols.map((item, index) => (
              <div className={styles.menuColumns} key={index}>
                <FooterNav
                  items={item.items}
                  pathname={pathname}
                  title={item.title}
                  type="col"
                />
              </div>
            ),
            )}
            {tuv ? (
              <div
                className={`
                  ${styles.tuvColumn}
                  ${styles.hiddenSm}
                `}
              >
                <ToolTip
                  icon={<TuvIcon
                    className={styles.tuvIcon}
                    assetsPath={assetsPath}
                  />}
                  label="TUV"
                  content={(
                    <ul className={styles.tooltipContent}>
                      <li>Anonyme Bewertung</li>
                      <li>Schutz der persönlichen Daten</li>
                      <li>Transparente Bewertungsstandards</li>
                    </ul>
                  )}
                />
              </div>
            ) : null
            }
            <div className={`${styles.infoTextColumn}`}>
              <div className={styles.logoContainer}>
                <Logo assetsPath={assetsPath} />
              </div>

              <p className={styles.infoText}>
                {infoText}
              </p>

              <p className={styles.infoText}>
                made with <HeartIcon className={`${styles.heart} ${styles.icon}`} /> in Vienna, Boston, Porto, Berlin
              </p>
            </div>
          </div>
          <div className={styles.bottomMenu}>
            <div>
              {items.navs.rows.map((item, index) => (
                <FooterNav
                  key={index}
                  pathname={pathname}
                  items={item.items}
                  type="row"
                />
              ),
              )}
            </div>
            <div className={`${styles.dropdown} ${styles.hiddenXs}`}>
              <DropDown
                position="top"
                items={items.countrySwitcher}
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  container: PropTypes.string,
  infoText: PropTypes.element.isRequired,
  assetsPath: PropTypes.string,
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
  tuv: PropTypes.bool,
};

Footer.defaultProps = {
  simpleMobile: false,
  container: 'container-fluid',
  assetsPath: 'https://assets.kununu.com/images/footer',
};
