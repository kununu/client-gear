import React, {Component, PropTypes} from 'react';
import ReactStateAnimation from 'react-state-animation';

import styles from './index.scss';

export default class Logo extends Component {
  static propTypes = {
    duration: PropTypes.number,
    isSpinning: PropTypes.bool.isRequired,
    link: PropTypes.element,
    shade: PropTypes.oneOf(['dark', 'light']),
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    duration: 1400,
    isSpinning: false,
    shade: 'dark',
    title: 'kununu GmbH',
  };

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
      shade,
    } = this.props;

    const content = (
      <div className={`${styles.logo} ${styles[shade]}`}>
        <h1 className="sr-only">{this.props.title}</h1>
        <span
          className={`${styles.starSpinner} ${styles[shade]}`}
          style={{
            transform: `rotate(${this.state.spinnerDegrees}deg)`,
          }}
          aria-hidden="true"
        />
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