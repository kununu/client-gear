import React, {PropTypes, Component} from 'react';
import Scroll from 'react-scroll';
import getElementPositionY from '@kununu/kununu-utils/dist/kununu-helpers/elementPosition'; // eslint-disable-line

// Think about using matchMedia here and move it to utils
const isMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 550 : false);

export default class ScrollToElement extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    duration: PropTypes.number,
    mobileOnly: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    duration: 500,
    mobileOnly: true,
  }

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

    return (
      <div
        {...this.getAdditionalProps()}
        ref={(node) => { this.node = node; }}
      >
        {children.length ?
          children.map((child, index) => React.cloneElement(child, {
            key: index,
            scrollTo: this.scrollTo,
          }))
        : React.cloneElement(children, {scrollTo: this.scrollTo})
        }
      </div>
    );
  }
}
