import React, {PropTypes} from 'react';

import Logo from 'Logo';

import styles from './index.scss';

export default function Footer ({
  children,
  infoText,
  tuv
}) {
  return (
    <footer
      role="banner"
      id="footer"
      className={`navbar-default ${styles.footer}`}>
      <div className="container-fluid">
        <div className="row">
          {children.map((child, index) => {
            if (child.props.type === 'row') return false;
            return (
              <div className={styles.menuColumns} key={index}>
                {child}
              </div>
            );
          })}

          {tuv ?
            <div className={`${styles.tuvColumn} no-padding hidden-xs hidden-sm`}>
              <img
                alt={tuv.alt}
                className={styles.tuv}
                data-toggle="tooltip"
                data-placement="top"
                data-html="true"
                src={tuv.src}
                title={tuv.title} />
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
            {children.filter(child => child.props.type === 'row')}
          </div>
          <div className="hidden-xs">
            country picker
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.any,
  infoText: PropTypes.element.isRequired,
  tuv: PropTypes.object
};
