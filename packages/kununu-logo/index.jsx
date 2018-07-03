import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactStateAnimation from 'react-state-animation';

import styles from './index.scss';

export default class Logo extends Component {
  state = {
    animate: new ReactStateAnimation(this),
    isCanceled: false,
    spinnerDegrees: 0,
  }

  componentWillMount () {
    this.spinIfNeeded(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.spinIfNeeded(nextProps);
  }

  componentWillUnmount () {
    this.state.animate.stop();
    this.setState({
      isCanceled: true,
    });
  }

  spinIfNeeded (props) {
    if (!this.state.spinnerDegrees && props.isSpinning) {
      this.spinOnce();
    }
  }

  spinOnce () {
    this.state.animate.linearInOut('spinnerDegrees', 360, this.props.duration)
      .then(() => {
        if (this.state.isCanceled) return;
        this.setState({spinnerDegrees: 0});
        if (this.props.isSpinning) this.spinOnce();
      });
  }

  render () {
    const {
      link,
      responsive,
      shade,
      title,
    } = this.props;
    const fillColor = shade === 'dark' ? '#20292D' : '#fff';

    const content = (
      <div className={styles.container}>
        <div className={`${responsive ? styles.responsive : ''} ${styles.logoDesktop}`}>
          <svg className={styles.logo} x="0px" y="0px" viewBox="35 0 785 253.1" fill={fillColor}>
            <title>{title}</title>
            <path
              d="M142,146.6c0-12.1-4.7-23.1-12.4-31.5c7.5-8.3,12.1-19.2,12.1-31.1v-7.9h-0.1c-0.3-1.8-2-3.2-3.9-3.2h-24
              c-2,0-3.6,1.4-3.9,3.2l-0.5,7.9c0,8.5-7.1,15.4-15.8,15.4v0.1h-8.1c-5.6,0-10.9,1-15.9,2.7V33.6c0-2.1-1.8-3.9-4-3.9h-24
              c-2.2,0-4,1.8-4,3.9v145.3c0,2.1,1.8,3.9,4,3.9h24c2.2,0,4-1.8,4-3.9v-32.3h0.2c0-8.5,7.1-15.4,15.8-15.4h8.5
              c8.7,0,15.8,6.9,15.8,15.4v7.9h0.1v24.4c0,2.1,1.8,3.9,4,3.9h24c2.2,0,4-1.8,4-3.9l0.4-24.4V146.6z"
            />
            <path
              d="M261.8,103.4c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9v58.5c0,8.5-7.2,15.4-16,15.4h-8.5c-8.7,0-15.8-6.9-15.8-15.4
              l-0.1-58.5c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9l-0.1,58.5c0,26,21.3,47.1,47.9,47.1h8.5c26.6,0,48-21.1,48-47.1L261.8,103.4
              z"
            />
            <path
              d="M278,179.7c0,2.1,1.8,3.9,4,3.9h24c2.2,0,4-1.8,4-3.9l0-58.5c0-8.5,7.2-15.4,15.9-15.4h8.5c8.7,0,15.8,6.9,15.8,15.4
              l0.1,58.5c0,2.1,1.8,3.9,4,3.9h24c2.2,0,4-1.8,4-3.9l0.1-58.5c0-25.9-21.3-47.1-47.9-47.1h-8.5c-26.6,0-47.9,21.1-47.9,47.1
              L278,179.7z"
            />
            <path
              d="M502.8,103.4c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9v58.5c0,8.5-7.2,15.4-15.9,15.4h-8.5c-8.7,0-15.8-6.9-15.8-15.4
              l-0.1-58.5c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9l0,58.5c0,26,21.3,47.1,47.9,47.1h8.5c26.6,0,47.9-21.1,47.9-47.1
              L502.8,103.4z"
            />
            <path
              d="M743.8,103.4c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9v58.5c0,8.5-7.2,15.4-15.9,15.4h-8.5c-8.7,0-15.8-6.9-15.8-15.4
              l-0.1-58.5c0-2.1-1.8-3.9-4-3.9h-24c-2.2,0-4,1.8-4,3.9l-0.1,58.5c0,26,21.3,47.1,47.9,47.1h8.5c26.6,0,47.9-21.1,47.9-47.1
              L743.8,103.4z"
            />
            <path
              d="M519.1,178.9c0,2.2,1.8,3.9,4,3.9h24c2.2,0,4-1.7,4-3.9v-58.5c0-8.5,7.2-15.4,15.9-15.4h8.5c8.7,0,15.8,6.9,15.8,15.4
              l0.1,58.5c0,2.2,1.8,3.9,4,3.9h24c2.2,0,4-1.7,4-3.9l0.1-58.5c0-26-21.3-47.1-47.9-47.1H567c-26.6,0-47.9,21.1-47.9,47.1
              L519.1,178.9z"
            />
          </svg>
        </div>
        <div className={`${styles.logoMobile} ${responsive ? styles.responsive : ''}`}>
          <svg x="0px" y="0px" viewBox="20 0 170 225.9" fill={fillColor}>
            <title>{title}</title>
            <path
              d="M34,182h21.8c2,0,3.6-1.6,3.6-3.6v-29.4h0.2c0-7.7,6.4-14,14.4-14h7.7c7.9,0,14.4,6.3,14.4,14v7.2h0.1v22.2
              c0,2,1.6,3.6,3.6,3.6h21.8c2,0,3.6-1.6,3.6-3.6l0.4-22.2v-7.2c0-11-4.3-21-11.3-28.6c6.8-7.5,11-17.4,11-28.3V85h-0.1
              c-0.3-1.7-1.8-2.9-3.6-2.9H99.7c-1.8,0-3.3,1.3-3.6,2.9l-0.5,7.2c0,7.7-6.4,14-14.4,14v0.1H74c-5.1,0-10,0.9-14.5,2.4V46.3
              c0-1.9-1.6-3.6-3.6-3.6H34c-2,0-3.6,1.6-3.6,3.6v132.2C30.4,180.4,32,182,34,182z"
            />
          </svg>
        </div>
        <span className={`${responsive ? styles.responsive : ''} ${styles.starSpinner}`}>
          <svg
            x="0px" y="0px" viewBox="0 0 223.3 225.9" fill={fillColor} style={{
              transform: `rotate(${this.state.spinnerDegrees}deg)`,
            }}
          >
            <path
              d="M44.9,103.4c3.9,3.9,10.2,3.7,14.1-0.1l3.7-3.6c4-3.8,4.1-10.1,0.2-14L33.7,57.1c-4.9-4.8-4.8-12.8,0.1-17.6
              l4.8-4.7c4.9-4.8,13-4.8,17.9,0l29.1,28.6c3.9,3.8,10.5,3.5,14.4-0.3l3.7-3.6c3.9-3.9,3.9-10.2,0-14l-1.8-1.8L74.6,17.1
              C59.6,2.4,35.2,2.2,20.2,16.9l-4.8,4.7C0.3,36.3,0.5,60.1,15.6,74.8L44.9,103.4z"
            />
            <path
              d="M123.2,63.4c3.9,3.8,10.4,4,14.3,0.2L166.7,35c4.9-4.8,13.1-4.7,18,0.1l4.8,4.7c4.9,4.8,4.9,12.6,0,17.4
              l-29.2,28.5c-3.9,3.8-3.6,10.2,0.3,14l3.7,3.7c3.9,3.8,10.3,3.8,14.3,0l1.8-1.8L207.7,75c15-14.7,15.2-38.5,0.1-53.2l-4.8-4.7
              C188,2.5,163.6,2.6,148.5,17.3L119.3,46c-3.9,3.8-3.8,9.9,0.2,13.8L123.2,63.4z"
            />
            <path
              d="M121,178.2l27.4,26.7c15,14.8,39.4,14.9,54.5,0.2l4.7-4.6c15.1-14.7,14.9-38.5-0.2-53.2l-29.3-28.6
              c-3.9-3.8-10.2-3.7-14.1,0.2l-3.7,3.6c-3.9,3.9-4.1,10.2-0.2,14l29.2,28.5c4.9,4.8,4.9,12.7-0.1,17.6l-4.8,4.7
              c-4.9,4.8-13,4.8-17.9,0l-29.2-28.5c-3.9-3.9-10.5-3.5-14.4,0.3l-3.7,3.6c-3.9,3.9-3.9,10.1,0,14L121,178.2z"
            />
            <path
              d="M20,205.2c15.1,14.7,39.4,14.6,54.5-0.2l29.3-28.6c3.9-3.8,3.8-10-0.2-13.8l-3.7-3.7c-3.9-3.8-10.4-4-14.4-0.2
              l-29.2,28.5c-4.9,4.8-13,4.7-17.9-0.1l-4.8-4.7c-5-4.8-5-12.6,0-17.5l29.2-28.5c3.9-3.9,3.6-10.3-0.3-14.1l-3.7-3.6
              c-3.9-3.9-10.4-3.9-14.3,0l-1.8,1.7l-27.3,26.7C0.3,162,0.2,185.8,15.2,200.5L20,205.2z"
            />
          </svg>
        </span>
      </div>
    );

    return (
      <div className={styles.logoContainer}>
        {link ?
          React.cloneElement(link, link.props, content)
          : content}
      </div>
    );
  }
}

Logo.propTypes = {
  duration: PropTypes.number,
  isSpinning: PropTypes.bool.isRequired,
  link: PropTypes.element,
  responsive: PropTypes.bool,
  shade: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.string,
};

Logo.defaultProps = {
  duration: 1400,
  isSpinning: false,
  responsive: true,
  shade: 'dark',
};
