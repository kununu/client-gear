import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import getElementPositionY from '@kununu/kununu-utils/dist/kununu-helpers/elementPosition'; // eslint-disable-line

// Think about using matchMedia here and move it to utils
const isMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 550 : false);

export default class ScrollToElement extends Component {
  /**
   * This function returns a list of props, that is optional.
   * We use reduce to only add the props, when they have some useful
   * value
   */
  getAdditionalProps () {
    const propsToPass = [{key: 'className', value: this.props.className}];
    return propsToPass.reduce((acc, prop) => {
      if (prop.value) return {...acc, [prop.key]: prop.value};
      return acc;
    }, {});
  }

  scrollTo = (offSet = 0) => {
    if (this.props.mobileOnly && !isMobile()) return false;

    // When the component is rerendering, the ref might not exist, when this happens
    if (this.node === null) {
      requestAnimationFrame(() => {
        this.scrollTo(offSet);
      });

      return false;
    }

    const elementPos = getElementPositionY(this.node, offSet);
    const scroll = Scroll.animateScroll;
    return scroll.scrollTo(elementPos, {
      duration: this.props.duration,
    });
  }

  render () {
    const {
      children,
    } = this.props;

    const CustomTag = this.props.tagName;

    return (
      <CustomTag
        {...this.getAdditionalProps()}
        ref={(node) => { this.node = node; }}
      >
        {children.length ?
          children.map((child, index) => React.cloneElement(child, {
            key: index,
            scrollTo: this.scrollTo,
            container: this.node,
          }))
          : React.cloneElement(children, {
            scrollTo: this.scrollTo,
            container: this.node,
          })
        }
      </CustomTag>
    );
  }
}

ScrollToElement.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  mobileOnly: PropTypes.bool,
  tagName: PropTypes.string,
};

ScrollToElement.defaultProps = {
  className: null,
  duration: 500,
  mobileOnly: true,
  tagName: 'div',
};
