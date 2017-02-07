import React, {PropTypes} from 'react';

import styles from './index.scss';

export default function FooterNav ({
  children,
  id,
  title,
  type
}) {
  return (
    <div>
      {title ?
        <div>
          <div className={`h3 text-muted hidden-xs ${styles.title}`}>
            {title}
          </div>
          <button className={`visible-xs ${styles.accordionTitle}`}>
            <span>{title}</span>
            <i className="fa fa-plus" />
          </button>
        </div>
        : ''
      }
      <ul
        role="navigation"
        id={id}
        className={`nav-sm ${styles.footerNav} ${type === 'row' && styles.row}`}>
        {children}
      </ul>
    </div>
  );
}

FooterNav.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['row', 'col'])
};

FooterNav.defaultProps = {
  type: 'col'
};

