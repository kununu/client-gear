import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import ReactStateAnimation from 'react-state-animation';

import styles from './index.scss';

export default class Logo extends Component {
  constructor (props) {
    super(props);
    this.animate = new ReactStateAnimation(this);
    this.isCanceled = false;
  }

  state = {
    spinnerDegrees: 0
  };

  componentWillMount () {
    this.spinIfNeeded(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.spinIfNeeded(nextProps);
  }

  componentWillUnmount () {
    this.animate.stop();
    this.isCanceled = true;
  }

  spinIfNeeded (props) {
    if (!this.state.spinnerDegrees && props.isSpinning) {
      this.spinOnce();
    }
  }

  spinOnce () {
    this.animate.linearInOut('spinnerDegrees', 360, this.props.duration)
      .then(() => {
        if (this.isCanceled) return;
        this.setState({spinnerDegrees: 0});
        if (this.props.isSpinning) this.spinOnce();
      });
  }

  render () {
    const {shade, href} = this.props;
    return (
      <Link to={href} className={`${styles.logo} ${styles[shade]}`}>
        <h1 className="sr-only">{this.props.title}</h1>

        <span
          className={`${styles.starSpinner} ${styles[shade]}`}
          style={{
            transform: `rotate(${this.state.spinnerDegrees}deg)`
          }}
          aria-hidden="true" />
      </Link>
    );
  }
}

Logo.propTypes = {
  duration: PropTypes.number,
  href: PropTypes.string.isRequired,
  isSpinning: PropTypes.bool.isRequired,
  shade: PropTypes.oneOf(['dark', 'light']).isRequired,
  title: PropTypes.string.isRequired
};

Logo.defaultProps = {
  duration: 1400,
  href: '/',
  isSpinning: false,
  shade: 'dark',
  title: 'kununu GmbH'
};
