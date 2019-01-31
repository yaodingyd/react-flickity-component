'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _flickity = require('flickity');

var _flickity2 = _interopRequireDefault(_flickity);

var _imagesloaded = require('imagesloaded');

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlickityComponent = function (_Component) {
  _inherits(FlickityComponent, _Component);

  function FlickityComponent(props) {
    _classCallCheck(this, FlickityComponent);

    var _this = _possibleConstructorReturn(this, (FlickityComponent.__proto__ || Object.getPrototypeOf(FlickityComponent)).call(this, props));

    _this.state = {
      flickityReady: false
    };

    _this.carousel = null;
    _this.flkty = null;
    return _this;
  }

  _createClass(FlickityComponent, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          children = _props.children,
          _props$options = _props.options,
          draggable = _props$options.draggable,
          initialIndex = _props$options.initialIndex,
          reloadOnUpdate = _props.reloadOnUpdate;
      var flickityReady = this.state.flickityReady;

      if (reloadOnUpdate || !prevState.flickityReady && flickityReady) {
        this.flkty.deactivate();
        this.flkty.selectedIndex = initialIndex || 0;
        this.flkty.options.draggable = draggable === undefined ? children ? children.length > 1 : false : draggable;
        this.flkty.activate();
      } else {
        this.flkty.reloadCells();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!_ExecutionEnvironment.canUseDOM) return null;
      var _props2 = this.props,
          disableImagesLoaded = _props2.disableImagesLoaded,
          flickityRef = _props2.flickityRef,
          options = _props2.options;

      var carousel = this.carousel;
      this.flkty = new _flickity2.default(carousel, options);
      var setFlickityToReady = function setFlickityToReady() {
        return _this2.setState({ flickityReady: true });
      };
      if (disableImagesLoaded) setFlickityToReady();else (0, _imagesloaded2.default)(carousel, setFlickityToReady);
      if (flickityRef) flickityRef(this.flkty);
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal() {
      if (!this.carousel) return null;
      var mountNode = this.carousel.querySelector('.flickity-slider');
      if (mountNode) return (0, _reactDom.createPortal)(this.props.children, mountNode);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(this.props.elementType, {
        className: this.props.className,
        ref: function ref(c) {
          _this3.carousel = c;
        }
      }, this.renderPortal());
    }
  }]);

  return FlickityComponent;
}(_react.Component);

FlickityComponent.propTypes = {
  disableImagesLoaded: _propTypes2.default.bool,
  reloadOnUpdate: _propTypes2.default.bool,
  options: _propTypes2.default.object,
  className: _propTypes2.default.string,
  elementType: _propTypes2.default.string,
  children: _propTypes2.default.array,
  flickityRef: _propTypes2.default.func
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  reloadOnUpdate: false,
  options: {},
  className: '',
  elementType: 'div'
};

exports.default = FlickityComponent;
module.exports = exports.default;
//# sourceMappingURL=index.js.map