import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import IconPlus from '@kununu/kununu-icons/dist/Plus';

import styles from './index.scss';

export default class FooterNav extends Component {
  state = {
    open: false,
  }

  onClickButton = () => {
    const {open} = this.state;

    this.setState({
      open: !open,
    });
  }

  getMenuTitle = item => (
    <span>
      {item.value}
      {item.icon ? (
        <span className={styles.titleIcon}>
          {item.icon}
        </span>
      ) : ''}
    </span>
  )

  getItem = item => (
    <span>
      {item.value}
      {item.icon ?
        <span className={styles.itemIcon}>{item.icon}</span> :
        ''}
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
    const {
      open,
    } = this.state;

    return (
      <Fragment>
        {title || dynamicNav ? (
          <Fragment>
            <span className={styles.title}>
              {title}
            </span>
            <button
              className={`${styles.accordionTitle} ${open && styles.open}`}
              onClick={this.onClickButton}
              type="button"
            >
              <span>
                {dynamicNav ? this.getActiveItem() : title}
              </span>
              <IconPlus className={`${styles.plus} ${styles.icon}`} />
            </button>
          </Fragment>
        ) : ''
        }
        <ul
          role="navigation"
          className={`${styles.footerNav} ${styles[type]} ${open && styles.open}`}
        >
          {items.map((item, index) => (
            <li
              key={index} // eslint-disable-line react/no-array-index-key
              className={`${styles.footerNavItem} ${this.isActive(item) && styles.active}`}
            >
              {React.cloneElement(item.link, {}, this.getItem(item))}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

FooterNav.propTypes = {
  dynamicNav: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(['row', 'col']),
};

FooterNav.defaultProps = {
  dynamicNav: false,
  title: '',
  type: 'col',
};
