import React, {PropTypes} from 'react';
import Logo from 'kununu-logo';
import {DropDown} from 'nukleus';

import {FooterNav} from '../kununu-footer';

import styles from './index.scss';

export default function Footer ({
  infoText,
  items,
  tuv,
}) {
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
              type="col"
            />
          </div>
          {items.navs.cols.map((item, index) => (
            <div className={styles.menuColumns} key={index}>
              <FooterNav
                items={item.items}
                title={item.title}
                type="col"
              />
            </div>
            ),
          )}

          {tuv ?
            <div className={`${styles.tuvColumn} no-padding hidden-xs hidden-sm`}>
              <img
                alt={tuv.alt}
                className={styles.tuv}
                data-toggle="tooltip"
                data-placement="top"
                data-html="true"
                src={tuv.src}
                title={tuv.title}
              />
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
                items={item.items}
                type="row"
              />
              ),
            )}
          </div>
          <div className="hidden-xs">
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

Footer.propTypes = {
  infoText: PropTypes.element,
  items: PropTypes.object, // eslint-disable-line
  tuv: PropTypes.shape({
    alt: React.PropTypes.string,
    src: React.PropTypes.string,
    title: React.PropTypes.string,
  }),
};
