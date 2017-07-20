import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'kununu-logo';

import styles from './index.scss';

// todo: remove from packages the copy-imgs script, is only for 31/5-1/7/2017

// todo: delete the img folder, is only for 31/5-1/7/2017

// todo: remove this, is only for 31/5-1/7/2017
const now = new Date();
const inAnniversaryPeriod = () => (now >= new Date('2017-5-31') && now < new Date('2017-7-1'));

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
            {inAnniversaryPeriod() ?
              // todo: remove this, is only for 31/5-1/7/2017
              <div className={styles.annniversaryLogo} /> :
              <Logo shade="light" title="kununu" link={logoLink} />
            }
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
