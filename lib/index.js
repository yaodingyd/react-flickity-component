"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _flickity = _interopRequireDefault(require("flickity"));

var _imagesloaded = _interopRequireDefault(require("imagesloaded"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FlickityComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(FlickityComponent, _Component);

  function FlickityComponent(props) {
    var _this;

    _classCallCheck(this, FlickityComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlickityComponent).call(this, props));
    _this.state = {
      flickityReady: false
    };
    _this.carousel = null;
    _this.flkty = null;
    return _this;
  }

  _createClass(FlickityComponent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props = this.props,
          children = _this$props.children,
          _this$props$options = _this$props.options,
          draggable = _this$props$options.draggable,
          initialIndex = _this$props$options.initialIndex,
          reloadOnUpdate = _this$props.reloadOnUpdate;
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!_ExecutionEnvironment.canUseDOM) return null;
      var _this$props2 = this.props,
          disableImagesLoaded = _this$props2.disableImagesLoaded,
          flickityRef = _this$props2.flickityRef,
          options = _this$props2.options;
      var carousel = this.carousel;
      this.flkty = new _flickity["default"](carousel, options);

      var setFlickityToReady = function setFlickityToReady() {
        return _this2.setState({
          flickityReady: true
        });
      };

      if (disableImagesLoaded) setFlickityToReady();else (0, _imagesloaded["default"])(carousel, setFlickityToReady);
      if (flickityRef) flickityRef(this.flkty);
    }
  }, {
    key: "renderPortal",
    value: function renderPortal() {
      if (!this.carousel) return null;
      var mountNode = this.carousel.querySelector('.flickity-slider');
      if (mountNode) return (0, _reactDom.createPortal)(this.props.children, mountNode);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement(this.props.elementType, {
        className: this.props.className,
        ref: function ref(c) {
          _this3.carousel = c;
        }
      }, this.props["static"] ? this.props.children : this.renderPortal());
    }
  }]);

  return FlickityComponent;
}(_react.Component);

FlickityComponent.propTypes = {
  children: _propTypes["default"].array,
  className: _propTypes["default"].string,
  disableImagesLoaded: _propTypes["default"].bool,
  elementType: _propTypes["default"].string,
  flickityRef: _propTypes["default"].func,
  options: _propTypes["default"].object,
  reloadOnUpdate: _propTypes["default"].bool,
  "static": _propTypes["default"].bool
};
FlickityComponent.defaultProps = {
  className: '',
  disableImagesLoaded: false,
  elementType: 'div',
  options: {},
  reloadOnUpdate: false,
  "static": false
};
var _default = FlickityComponent;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map