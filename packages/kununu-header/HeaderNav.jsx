import React, {PropTypes} from 'react';

import styles from './index.scss';

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
  children: PropTypes.any,
};
