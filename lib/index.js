"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _imagesloaded = _interopRequireDefault(require("imagesloaded"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var FlickityComponent = /*#__PURE__*/function (_Component) {
  _inherits(FlickityComponent, _Component);

  var _super = _createSuper(FlickityComponent);

  function FlickityComponent(props) {
    var _this;

    _classCallCheck(this, FlickityComponent);

    _this = _super.call(this, props);
    _this.state = {
      flickityReady: false,
      flickityCreated: false,
      cellCount: 0
    };
    _this.carousel = null;
    _this.flkty = null;
    return _this;
  }

  _createClass(FlickityComponent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          _this$props$options = _this$props.options,
          draggable = _this$props$options.draggable,
          initialIndex = _this$props$options.initialIndex,
          reloadOnUpdate = _this$props.reloadOnUpdate,
          disableImagesLoaded = _this$props.disableImagesLoaded;
      var flickityReady = this.state.flickityReady;

      if (reloadOnUpdate || !prevState.flickityReady && flickityReady) {
        var isActive = this.flkty.isActive;
        this.flkty.deactivate();
        this.flkty.selectedIndex = initialIndex || 0;
        this.flkty.options.draggable = draggable === undefined ? children ? children.length > 1 : false : draggable;
        if (isActive) this.flkty.activate();

        if (!disableImagesLoaded && this.carousel) {
          (0, _imagesloaded["default"])(this.carousel, function () {
            _this2.flkty.reloadCells();
          });
        }
      } else {
        this.flkty.reloadCells();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!canUseDOM) return null;

      var Flickity = require('flickity');

      var _this$props2 = this.props,
          flickityRef = _this$props2.flickityRef,
          options = _this$props2.options;
      this.flkty = new Flickity(this.carousel, options);
      if (flickityRef) flickityRef(this.flkty);

      if (this.props["static"]) {
        this.setReady();
      } else {
        this.setState({
          flickityCreated: true
        });
      }
    }
  }, {
    key: "setReady",
    value: function setReady() {
      var _this3 = this;

      if (this.state.flickityReady) return;

      var setFlickityToReady = function setFlickityToReady() {
        return _this3.setState({
          flickityReady: true
        });
      };

      if (this.props.disableImagesLoaded) setFlickityToReady();else (0, _imagesloaded["default"])(this.carousel, setFlickityToReady);
    }
  }, {
    key: "renderPortal",
    value: function renderPortal() {
      var _this4 = this;

      if (!this.carousel) return null;
      var mountNode = this.carousel.querySelector('.flickity-slider');

      if (mountNode) {
        var element = /*#__PURE__*/(0, _reactDom.createPortal)(this.props.children, mountNode);
        setTimeout(function () {
          return _this4.setReady();
        }, 0);
        return element;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/_react["default"].createElement(this.props.elementType, {
        className: this.props.className,
        ref: function ref(c) {
          _this5.carousel = c;
        }
      }, this.props["static"] ? this.props.children : this.renderPortal());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var cellCount = _react["default"].Children.count(props.children);

      if (cellCount !== state.cellCount) return {
        flickityReady: false,
        cellCount: cellCount
      };
      return null;
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