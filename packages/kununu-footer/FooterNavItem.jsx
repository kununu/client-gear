import React, {PropTypes} from 'react';

import styles from './index.scss';

export default function FooterNavItem ({
  active,
  children,
}) {
  return (
    <li className={`${styles.footerNavItem} ${active && styles.active}`}>
      {children}
    </li>
  );
}

FooterNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element,
};
