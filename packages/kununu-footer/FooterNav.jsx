import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class FooterNav extends Component {
  static propTypes = {
    dynamicNav: PropTypes.bool,
    id: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    type: PropTypes.oneOf(['row', 'col']),
  };

  static defaultProps = {
    type: 'col',
  };

  state = {
    active: this.getActiveItem(),
    open: false,
  }

  onClickButton = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  onClickItem (item) {
    this.setState({
      active: item,
    });
  }

  getActiveItem () {
    const selected = this.props.items.filter((item) => item.active);
    return selected[0] ? selected[0] : this.props.items[0];
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
      {
        item.icon ?
          <span className={styles.itemIcon}>{item.icon}</span>
        : ''
      }
    </span>
  )

  render () {
    const {
      dynamicNav,
      id,
      items,
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
              onClick={this.onClickButton}
            >
              <span>
                {dynamicNav ? this.getMenuTitle(this.state.active) : title}
              </span>
              <i className={`fa fa-plus ${styles.icon}`} />
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
          {items.map((item, index) => (
            <li // eslint-disable-line
              key={index}
              className={`${styles.footerNavItem} ${item.active && styles.active}`}
              onClick={() => this.onClickItem(item)}
            >
              {React.cloneElement(item.link, {}, this.getItem(item))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

