import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Flickity from 'flickity';
import imagesloaded from 'imagesloaded';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import PropTypes from 'prop-types';

class FlickityComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flickityReady: false,
    };

    this.carousel = null;
    this.flkty = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      children,
      disableImagesLoaded,
      options: { draggable, initialIndex },
      reloadOnUpdate,
    } = this.props;

    if (
      reloadOnUpdate ||
      (!prevState.flickityReady && this.state.flickityReady)
    ) {
      this.flkty.deactivate();
      this.flkty.selectedIndex = initialIndex || 0;
      this.flkty.options.draggable =
        draggable === undefined
          ? children
            ? children.length > 1
            : false
          : draggable;
      if (!disableImagesLoaded) {
        imagesloaded(
          this.carousel,
          function() {
            this.flkty.activate();
          }.bind(this)
        );
      } else {
        this.flkty.activate();
      }
    } else if (!disableImagesLoaded && canUseDOM) {
      imagesloaded(
        this.carousel,
        function() {
          this.flkty.reloadCells();
        }.bind(this)
      );
    } else {
      this.flkty.reloadCells();
    }
  }

  componentDidMount() {
    if (canUseDOM) {
      const { flickityRef, options } = this.props;
      const carousel = this.carousel;
      this.flkty = new Flickity(carousel, options);
      this.setState({ flickityReady: true });
      if (flickityRef) flickityRef(this.flkty);
    }
  }

  renderPortal() {
    if (!this.carousel) {
      return null;
    }
    const mountNode = this.carousel.querySelector('.flickity-slider');
    if (mountNode) {
      return createPortal(this.props.children, mountNode);
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
      this.renderPortal()
    );
  }
}

FlickityComponent.propTypes = {
  disableImagesLoaded: PropTypes.bool,
  reloadOnUpdate: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  elementType: PropTypes.string,
  children: PropTypes.array,
  flickityRef: PropTypes.func,
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  reloadOnUpdate: false,
  options: {},
  className: '',
  elementType: 'div',
};

export default FlickityComponent;
