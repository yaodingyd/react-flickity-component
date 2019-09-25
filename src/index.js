import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import imagesloaded from 'imagesloaded';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import PropTypes from 'prop-types';

class FlickityComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flickityReady: false,
      flickityCreated: false,
      cellCount: 0,
    };

    this.carousel = null;
    this.flkty = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children,
      options: { draggable, initialIndex },
      reloadOnUpdate,
    } = this.props;
    const { flickityReady } = this.state;
    if (reloadOnUpdate || (!prevState.flickityReady && flickityReady)) {
      this.flkty.deactivate();
      this.flkty.selectedIndex = initialIndex || 0;
      this.flkty.options.draggable =
        draggable === undefined
          ? children
            ? children.length > 1
            : false
          : draggable;
      this.flkty.activate();
    } else {
      this.flkty.reloadCells();
    }
  }

  componentDidMount() {
    if (!canUseDOM) return null;
    const Flickity = require('flickity');
    const { flickityRef, options } = this.props;
    this.flkty = new Flickity(this.carousel, options);
    if (flickityRef) flickityRef(this.flkty);
    if (this.props.static) {
      this.setReady();
    } else {
      this.setState({ flickityCreated: true });
    }
  }

  setReady() {
    if (this.state.flickityReady) return;
    const setFlickityToReady = () => this.setState({ flickityReady: true });
    if (this.props.disableImagesLoaded) setFlickityToReady();
    else imagesloaded(this.carousel, setFlickityToReady);
  }

  renderPortal() {
    if (!this.carousel) return null;
    const mountNode = this.carousel.querySelector('.flickity-slider');
    if (mountNode) {
      const element = createPortal(this.props.children, mountNode);
      setTimeout(() => this.setReady(), 0);
      const cellCount = React.Children.count(this.props.children);
      if (cellCount !== this.state.cellCount)
        this.setState({ flickityReady: false, cellCount });
      return element;
    }
  }

  render() {
    return React.createElement(
      this.props.elementType,
      {
        className: this.props.className,
        ref: c => {
          this.carousel = c;
        },
      },
      this.props.static ? this.props.children : this.renderPortal()
    );
  }
}

FlickityComponent.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  disableImagesLoaded: PropTypes.bool,
  elementType: PropTypes.string,
  flickityRef: PropTypes.func,
  options: PropTypes.object,
  reloadOnUpdate: PropTypes.bool,
  static: PropTypes.bool,
};

FlickityComponent.defaultProps = {
  className: '',
  disableImagesLoaded: false,
  elementType: 'div',
  options: {},
  reloadOnUpdate: false,
  static: false,
};

export default FlickityComponent;
