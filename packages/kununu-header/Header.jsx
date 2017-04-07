import React, {PropTypes} from 'react';
import Logo from 'kununu-logo';

import styles from './index.scss';

export default function Header ({
  children,
  container,
  fixed,
  title,
  logoLink,
}) {
  return (
    <header role="banner" className={`${styles.header} ${fixed && styles.fixed}`}>
      <div className={container}>
        <div className={styles.flex}>
          <div className={styles.pullLeft}>
            <Logo shade="light" title="kununu" link={logoLink} />
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.pullRight}>
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.element,
  container: PropTypes.string,
  fixed: PropTypes.bool,
  logoLink: PropTypes.element.isRequired,
  title: PropTypes.string,
};

Header.defaultProps = {
  container: 'container-fluid',
  fixed: true,
  title: '',
};
