import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from 'kununu-logo';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import {DropDown} from 'nukleus';

import FooterNav from './FooterNav';
import TuvImage from './TuevSiegel';
import styles from './index.scss';

export default class Footer extends Component { // eslint-disable-line
  static propTypes = {
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
    tuv: PropTypes.bool,
  };

  static defaultProps = {
    simpleMobile: false,
  };

  render () {
    const {
      infoText,
      items,
      pathname,
      simpleMobile,
      tuv,
    } = this.props;

    const tooltip = (
      <Tooltip id="tooltip">
        <ul className={styles.tooltipContent}>
          <li>Anonyme Bewertung</li>
          <li>Schutz der persönlichen Daten</li>
          <li>Transparente Bewertungsstandards</li>
        </ul>
      </Tooltip>
    );

    return (
      <footer
        role="banner"
        id="footer"
        className={`${styles.footer} ${simpleMobile ? styles.simpleMobile : ''}`}
      >
        <div className="container-fluid">
          <div className={`row ${styles.flex} ${styles.contentSection}`}>
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
            {tuv ?
              <div
                className={`
                  ${styles.tuvColumn}
                  ${styles.hiddenXs}
                  hidden-sm
                `}
              >
                <OverlayTrigger
                  placement="top"
                  id="tooltip"
                  overlay={tooltip}
                >
                  <div>
                    <TuvImage />
                  </div>
                </OverlayTrigger>
              </div>
              : null
            }
            <div className={`${styles.infoTextColumn} text-right text-center-xs text-center-sm text-muted`}>
              <Logo shade="light" />

              <p className={styles.infoText}>
                {infoText}
              </p>

              <p className="text-xs">
                made with <i className={`fa fa-heart-o ${styles.heart}`} /> in Vienna
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
            <div className={styles.hiddenXs}>
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
