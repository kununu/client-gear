import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';
import IconPlus from './IconPlus';

export default class FooterNav extends Component {
  state = {
    open: false,
  }

  onClickButton = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  getMenuTitle = item => (
    <span>
      {item.value}
      {item.icon ?
        <span className={styles.titleIcon}>
          {item.icon}
        </span>
        : ''}
    </span>
  )

  getItem = item => (
    <span>
      {item.value}
      {item.icon ?
        <span className={styles.itemIcon}>{item.icon}</span>
        : ''}
    </span>
  )

  getActiveItem = () => {
    const {items} = this.props;
    const activeItem = items.filter(item => item.active)[0];

    return this.getMenuTitle(activeItem || items[0]);
  }

  isActive = item => item.active;

  render () {
    const {
      dynamicNav,
      items,
      title,
      type,
    } = this.props;

    return (
      <div>
        {title || dynamicNav ?
          <div>
            <div className={`h3 text-muted hidden-xs ${styles.title}`}>
              {title}
            </div>
            <button
              className={`visible-xs ${styles.accordionTitle} ${this.state.open && styles.open}`}
              onClick={this.onClickButton}
            >
              <span>
                {dynamicNav ? this.getActiveItem() : title}
              </span>
              <IconPlus className={`${styles.plus} ${styles.icon}`} />
            </button>
          </div>
          : ''
        }
        <ul
          role="navigation"
          className={`
            nav-sm
            ${styles.footerNav}
            ${styles[type]}
            ${this.state.open && styles.open}`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`${styles.footerNavItem} ${this.isActive(item) && styles.active}`}
            >
              {React.cloneElement(item.link, {}, this.getItem(item))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

FooterNav.propTypes = {
  dynamicNav: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  type: PropTypes.oneOf(['row', 'col']),
};

FooterNav.defaultProps = {
  type: 'col',
};
