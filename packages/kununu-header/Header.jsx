import React, {PropTypes} from 'react';
import Logo from 'kununu-logo';

import styles from './index.scss';

export default function Header ({
  children,
  container,
  fixed,
  isLoading,
  title,
  logoLink,
  responsive,
  title,
}) {
  return (
    <header role="banner" className={`${styles.header} ${fixed && styles.fixed}`}>
      <div className={container}>
        <div className={styles.flex}>
          <div className={styles.pullLeft}>
            <Logo
              isSpinning={isLoading}
              shade="light"
              title="kununu"
              link={logoLink}
              responsive={responsive}
            />
            <span className={`${styles.title} ${responsive ? styles.responsive : ''}`}>{title}</span>
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
  isLoading: PropTypes.bool,
  logoLink: PropTypes.element.isRequired,
  responsive: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  container: 'container-fluid',
  fixed: true,
  isLoading: false,
  responsive: true,
  title: '',
};
