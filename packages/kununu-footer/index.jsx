import React, {Component, PropTypes} from 'react';
import Logo from 'kununu-logo';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import {DropDown} from 'nukleus';

import FooterNav from './FooterNav';
import tuvImage from './img/tuev-saarland-siegel.svg';
import styles from './index.scss';

export default class Footer extends Component { // eslint-disable-line
  static propTypes = {
    infoText: PropTypes.element.isRequired,
    items: PropTypes.shape({
      countrySwitcher: PropTypes.arrayOf(PropTypes.shape({
        active: PropTypes.boolean,
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
    showCountrySwitcher: PropTypes.bool,
    showInfo: PropTypes.bool,
    showNavs: PropTypes.bool,
    tuv: PropTypes.bool,
  };

  static defaultProps = {
    showCountrySwitcher: true,
    showInfo: true,
    showNavs: true,
  };

  render () {
    const {
      infoText,
      items,
      pathname,
      showCountrySwitcher,
      showInfo,
      showNavs,
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
        className={`navbar-default ${styles.footer}`}
      >
        <div className="container-fluid">
          <div className={`row ${styles.flex}`}>
            {showCountrySwitcher ?
              <div className={`${styles.menuColumns} visible-xs`}>
                <FooterNav
                  dynamicNav
                  items={items.countrySwitcher}
                  pathname={pathname}
                  type="col"
                />
              </div>
              : null
            }
            {showNavs ?
              items.navs.cols.map((item, index) => (
                <div className={styles.menuColumns} key={index}>
                  <FooterNav
                    items={item.items}
                    pathname={pathname}
                    title={item.title}
                    type="col"
                  />
                </div>
                ),
              )
              : null
            }
            {tuv ?
              <div
                className={`
                  ${styles.tuvColumn}
                  no-padding
                  hidden-xs
                  hidden-sm
                `}
              >
                <OverlayTrigger
                  placement="top"
                  id="tooltip"
                  overlay={tooltip}
                >
                  <img
                    alt="hi"
                    className={styles.tuv}
                    src={tuvImage}
                  />
                </OverlayTrigger>
              </div>
              : null
            }
            {showInfo ?
              <div className={`${styles.infoTextColumn} text-right text-center-xs text-center-sm text-muted`}>
                <Logo shade="light" />

                <p className={styles.infoText}>
                  {infoText}
                </p>

                <p className="text-xs">
                  made with <i className="fa fa-heart-o text-red" /> in Vienna
                </p>
              </div>
              : null
            }
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
            <div className="hidden-xs">
              {showCountrySwitcher ?
                <DropDown
                  position="top"
                  items={items.countrySwitcher}
                />
                : null
              }
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
