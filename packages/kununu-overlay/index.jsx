import React from 'react';

import styles from './index.scss';

const Overlay = (props) => (
  <div className={styles.overlay}>
    <div className={styles.container}>
      <svg
        className={styles.spinner}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        height={props.iconSize}
        width={props.iconSize}
        x="0px"
        y="0px"
        viewBox="-143 144.1 223.3 225.9"
        xmlSpace="preserve"
      >
        <path
          d="M-98.1,247.5c3.9,3.9,10.2,3.7,14.1-0.1l3.7-3.6c4-3.8,4.1-10.1,0.2-14l-29.2-28.6c-4.9-4.8-4.8-12.8,0.1-17.6
            l4.8-4.7c4.9-4.8,13-4.8,17.9,0l29.1,28.6c3.9,3.8,10.5,3.5,14.4-0.3l3.7-3.6c3.9-3.9,3.9-10.2,0-14l-1.8-1.8l-27.3-26.6
            c-15-14.7-39.4-14.9-54.4-0.2l-4.8,4.7c-15.1,14.7-14.9,38.5,0.2,53.2L-98.1,247.5z"
        />
        <path
          d="M-19.8,207.5c3.9,3.8,10.4,4,14.3,0.2l29.2-28.6c4.9-4.8,13.1-4.7,18,0.1l4.8,4.7c4.9,4.8,4.9,12.6,0,17.4
            l-29.2,28.5c-3.9,3.8-3.6,10.2,0.3,14l3.7,3.7c3.9,3.8,10.3,3.8,14.3,0l1.8-1.8l27.3-26.6c15-14.7,15.2-38.5,0.1-53.2l-4.8-4.7
            c-15-14.6-39.4-14.5-54.5,0.2l-29.2,28.7c-3.9,3.8-3.8,9.9,0.2,13.8L-19.8,207.5z"
        />
        <path
          d="M-22,322.3L5.4,349c15,14.8,39.4,14.9,54.5,0.2l4.7-4.6c15.1-14.7,14.9-38.5-0.2-53.2l-29.3-28.6
            c-3.9-3.8-10.2-3.7-14.1,0.2l-3.7,3.6c-3.9,3.9-4.1,10.2-0.2,14l29.2,28.5c4.9,4.8,4.9,12.7-0.1,17.6l-4.8,4.7
            c-4.9,4.8-13,4.8-17.9,0l-29.2-28.5c-3.9-3.9-10.5-3.5-14.4,0.3l-3.7,3.6c-3.9,3.9-3.9,10.1,0,14L-22,322.3z"
        />
        <path
          d="M-123,349.3c15.1,14.7,39.4,14.6,54.5-0.2l29.3-28.6c3.9-3.8,3.8-10-0.2-13.8l-3.7-3.7
            c-3.9-3.8-10.4-4-14.4-0.2l-29.2,28.5c-4.9,4.8-13,4.7-17.9-0.1l-4.8-4.7c-5-4.8-5-12.6,0-17.5l29.2-28.5c3.9-3.9,3.6-10.3-0.3-14.1
            l-3.7-3.6c-3.9-3.9-10.4-3.9-14.3,0l-1.8,1.7l-27.3,26.7c-15.1,14.9-15.2,38.7-0.2,53.4L-123,349.3z"
        />
      </svg>
    </div>
  </div>
);

Overlay.propTypes = {
  iconSize: React.PropTypes.Number,
};

Overlay.defaultProps = {
  iconSize: 25,
};

export default Overlay;
