import React, {Component, PropTypes} from 'react';
import Logo from 'kununu-logo';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import {DropDown} from 'nukleus';

import {FooterNav} from '../kununu-footer';

import tuvImage from './img/tuev-saarland-siegel.svg';
import styles from './index.scss';

export default class Footer extends Component { // eslint-disable-line
  static propTypes = {
    infoText: PropTypes.element,
    items: PropTypes.object, // eslint-disable-line
    pathname: PropTypes.string.isRequired,
    tuv: PropTypes.bool,
  };

  getActiveItem () {
    const {pathname, items} = this.props;
    return items.filter((item) => {
      const {props} = item.link;
      // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
      const localPathname = props.href || props.path || props.to.pathname;
      return (pathname === localPathname);
    })[0];
  }

  render () {
    const {
      infoText,
      items,
      pathname,
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
            <div className={`${styles.menuColumns} visible-xs`}>
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
              : ''
            }

            <div className={`${styles.infoTextColumn} text-right text-center-xs text-center-sm text-muted`}>
              <Logo shade="light" />

              <p className={styles.infoText}>
                {infoText}
              </p>

              <p className="text-xs">
                made with <i className="fa fa-heart-o text-red" /> in Vienna
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
            <div className="hidden-xs">
              <DropDown
                position="top"
                pathname={pathname}
                items={items.countrySwitcher}
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
