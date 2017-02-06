import React, {PropTypes} from 'react';

import styles from './index.scss';

export default function HeaderNavItem ({
  children,
}) {
  return (
    <li className={styles.headerNavItem}>
      {children}
    </li>
  );
}

HeaderNavItem.propTypes = {
  children: PropTypes.any,
};
