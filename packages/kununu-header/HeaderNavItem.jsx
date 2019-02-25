import React from 'react';
import PropTypes from 'prop-types';

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
  children: PropTypes.element.isRequired,
};
