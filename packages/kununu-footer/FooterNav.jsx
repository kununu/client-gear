import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class FooterNav extends Component {
  static propTypes = {
    dynamicNav: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.oneOf(['row', 'col']),
  };

  static defaultProps = {
    type: 'col',
  };

  state = {
    open: false,
  }

  onClickButton = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  getMenuTitle = (item) => (
    <span>
      {item.value}
      {item.icon ?
        <span className={styles.titleIcon}>
          {item.icon}
        </span>
          : ''}
    </span>
    )

  getItem = (item) => (
    <span>
      {item.value}
      {item.icon ?
        <span className={styles.itemIcon}>{item.icon}</span>
        : ''}
    </span>
  )

  getActiveItem = () => {
    const {pathname, items} = this.props;
    const activeItem = items.filter((item) => {
      const localPathname = this.getLocalPathname(item.link);
      return (pathname === localPathname);
    })[0];

    return this.getMenuTitle(activeItem || items[0]);
  }

  // Depending on which link it is (from react-router, from react-server, simple link)
  // we need to access the local pathname
  // according to the respective API
  getLocalPathname = (item) => item.props.href || item.props.path || item.props.to.pathname;

  isActive = (item) => {
    const {pathname} = this.props;
    const localPathname = this.getLocalPathname(item);
    return (pathname === localPathname);
  }

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
              <i className={`fa fa-plus ${styles.icon}`} />
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
              className={`${styles.footerNavItem} ${this.isActive(item.link) && styles.active}`}
            >
              {React.cloneElement(item.link, {}, this.getItem(item))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

