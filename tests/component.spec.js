/* global describe, it */

var expect = require('expect')
var React = require('react')
var TestUtils = require('react-addons-test-utils')
var jsdom = require('jsdom').jsdom

//  Fake Dom
if (typeof window === 'undefined') {
  global.document = jsdom('<html><body></body></html>')
  global.window = document.defaultView
  global.navigator = { userAgent: 'node.js' }
  global.Element = window.Element
}

var Flickity = require('../lib/index.js')(React)

describe('Flickity', function () {
  it('should render the component', function () {
    var flickityComponent = React.createElement(Flickity)
    var flickity = TestUtils.renderIntoDocument(flickityComponent)
    expect(flickity.state.selectedIndex).toEqual(0)
  })

  it('should render 3 children', function () {
    var flickityComponent = React.createElement(
      Flickity,
      {
        disableImagesLoaded: false
      },
      React.createElement('img', { src: '/images/placeholder.png' }),
      React.createElement('img', { src: '/images/placeholder.png' }),
      React.createElement('img', { src: '/images/placeholder.png' })
    )
    var flickity = TestUtils.renderIntoDocument(flickityComponent)
    expect(flickity.props.children.length).toEqual(3)
  })

  it('should consume all flickity options', function () {
    var expected = {
      accessibility: false,
      cellAlign: 'left',
      freeScrollFriction: 2,
      friction: 2,
      percentPosition: false,
      resize: false,
      selectedAttraction: 1.025,
      setGallerySize: false,
      draggable: false,
      touchVerticalScroll: false,
      prevNextButtons: false,
      leftArrowText: '-',
      rightArrowText: '-',
      arrowShape: { x0: 20, x1: 60, y1: 50, x2: 70, y2: 40, x3: 10 },
      pageDots: false,
      pauseAutoPlayOnHover: false
    }

    var flickityComponent = React.createElement(
      Flickity,
      {
        options: expected
      }
    )
    var flickity = TestUtils.renderIntoDocument(flickityComponent)
    expect(flickity.flkty.options).toEqual(expected)
  })
})
