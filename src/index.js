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
    this.imagesLoaded = this.imagesLoaded.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.reloadOnUpdate ||
      (!prevState.flickityReady && this.state.flickityReady)
    ) {
      this.flkty.reloadCells();
      this.flkty.resize();
    }
    this.imagesLoaded();
  }

  imagesLoaded() {
    if (!this.props.disableImagesLoaded && canUseDOM) {
      imagesloaded(
        this.carousel,
        function(instance) {
          this.flkty.reloadCells();
        }.bind(this)
      );
    }
  }

  componentDidMount() {
    const carousel = this.carousel;
    if (canUseDOM) {
      this.flkty = new Flickity(carousel, this.props.options);
      this.flkty.selectedIndex = this.props.options.initialIndex || 0;
      this.setState({ flickityReady: true });
      if (this.props.flickityRef) {
        this.props.flickityRef(this.flkty);
      }
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
