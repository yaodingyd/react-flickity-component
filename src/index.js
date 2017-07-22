import React, { Component } from 'react'
import Flickity from 'flickity'
import imagesloaded from 'imagesloaded'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import PropTypes from 'prop-types'

class FlickityComponent extends Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedIndex: 0
    }

    this.carousel = null
    this.flkty = null
    this.updateSelected = this.updateSelected.bind(this)
    this.imagesLoaded = this.imagesLoaded.bind(this)
  }

  updateSelected () {
    const index = this.flkty.selectedIndex
    this.setState({
      selectedIndex: index
    })
    if (this.props.onSwipe) {
      this.props.onSwipe(index)
    }
  }

  componentWillUnmount () {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected)
      this.flkty.destroy()
    }
  }

  imagesLoaded () {
    if (!this.props.disableImagesLoaded && canUseDOM) {
      imagesloaded(
        this.carousel,
        function (instance) {
          this.flkty.reloadCells()
        }.bind(this)
      )
    }
  }

  componentDidMount () {
    const carousel = this.carousel
    if (canUseDOM) {
      this.flkty = new Flickity(carousel, this.props.options)
      this.flkty.on('cellSelect', this.updateSelected)
      this.imagesLoaded()
    }
  }

  render () {
    return React.createElement(this.props.elementType, {
      className: this.props.className,
      ref: (c) => { this.carousel = c }
    }, this.props.children)
  }
}

FlickityComponent.propTypes = {
  disableImagesLoaded: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  elementType: PropTypes.string,
  children: PropTypes.array,
  onSwipe: PropTypes.func
}

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  options: {},
  className: '',
  elementType: 'div'
}

export default FlickityComponent
