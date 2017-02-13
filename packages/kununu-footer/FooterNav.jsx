import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class FooterNav extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['row', 'col']),
  };

  static defaultProps = {
    type: 'col',
  };

  state = {
    open: false,
  }

  onClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render () {
    const {
      children,
      id,
      title,
      type,
    } = this.props;

    return (
      <div>
        {title ?
          <div>
            <div className={`h3 text-muted hidden-xs ${styles.title}`}>
              {title}
            </div>
            <button
              className={`visible-xs ${styles.accordionTitle} ${this.state.open && styles.open}`}
              onClick={this.onClick}
            >
              <span>{title}</span>
              <i className="fa fa-plus" />
            </button>
          </div>
          : ''
        }
        <ul
          role="navigation"
          id={id}
          className={`
            nav-sm
            ${styles.footerNav}
            ${styles[type]}
            ${this.state.open && styles.open}`}
        >
          {children}
        </ul>
      </div>
    );
  }
}

