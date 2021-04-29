import React from 'react';
import FlagDeIcon from '@kununu/kununu-icons/dist/FlagDe';
import FlagUsIcon from '@kununu/kununu-icons/dist/FlagUs';

import styles from './index.scss';

function ActiveLanguage ({language, renderTranslation}) {
  const languagesDetails = {
    de_DE: (
      <span>
        {renderTranslation('AP_LANGUAGE_DE_DE')}
        {' '}
        <FlagDeIcon className={styles.flag} />
      </span>
    ),
    en_US: (
      <span>
        {renderTranslation('AP_LANGUAGE_EN')}
        {' '}
        <FlagUsIcon className={styles.flag} />
      </span>
    ),
  };

  return languagesDetails[language];
}

export default ActiveLanguage;
