import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default function HeaderNav ({
  children,
}) {
  return (
    <nav className={styles.headerNav}>
      <ul>
        {children}
      </ul>
    </nav>
  );
}

HeaderNav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
