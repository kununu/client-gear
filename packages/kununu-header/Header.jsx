import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@kununu/kununu-logo';

import styles from './index.module.scss';

export default function Header ({
  children,
  container,
  fixed,
  assetsPath,
  title,
  logoLink,
  simple,
}) {
  const simpleLogo = () => {
    const content = (
      <img
        alt={title}
        aria-hidden="true"
        className={styles.simpleLogo}
        rel="presentation"
        src={`${assetsPath}/logo-desktop.svg`}
      />
    );

    return React.cloneElement(logoLink, logoLink.props, content);
  };

  return (
    <header
      role="banner"
      className={`${styles.header} ${fixed && styles.fixed} ${simple && styles.simple}`}
    >
      <div className={container}>
        <div className={styles.flex}>
          {simple ? simpleLogo() : (
            <Logo
              link={logoLink}
              assetsPath={assetsPath}
              title={title}
            />
          )}
          <span className={styles.title}>{title}</span>
          {!simple && children}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  assetsPath: PropTypes.string,
  children: PropTypes.element,
  container: PropTypes.string,
  fixed: PropTypes.bool,
  logoLink: PropTypes.element.isRequired,
  title: PropTypes.string,
  simple: PropTypes.bool,
};

Header.defaultProps = {
  children: null,
  assetsPath: 'https://assets.kununu.com/images/footer',
  container: 'container-fluid',
  fixed: true,
  title: '',
  simple: false,
};
