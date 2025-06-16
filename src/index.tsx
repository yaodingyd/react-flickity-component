import React, { Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import imagesloaded from 'imagesloaded';
import Flickity from 'flickity';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);


export type FlickityEventName = 'ready' | 'change' | 'select' | 'settle' | 'scroll' | 'dragStart'
  | 'dragMove' | 'dragEnd' | 'pointerDown' | 'pointerMove' | 'pointerUp' 
  | 'staticClick' | 'lazyLoad' | 'bgLazyLoad' | 'fullscreenChange';


export interface ReactFlickityComponentProps {
  className?: string;
  disableImagesLoaded?: boolean;
  elementType?: string;
  flickityRef?: (ref: Flickity) => void;
  options?: Flickity.Options;
  reloadOnUpdate?: boolean;
  static?: boolean;
  children?: ReactNode;
}

interface FlickityComponentState {
  flickityReady: boolean;
  flickityCreated: boolean;
  cellCount: number;
}

interface FlickityInstance extends Flickity {
  isActive: boolean;
  deactivate: () => void;
  selectedIndex: number;
  options: Flickity.Options;
  activate: () => void;
}

class FlickityComponent extends Component<ReactFlickityComponentProps, FlickityComponentState> {
  static defaultProps: Partial<ReactFlickityComponentProps> = {
    className: '',
    disableImagesLoaded: false,
    elementType: 'div',
    options: {},
    reloadOnUpdate: false,
    static: false,
  };

  private carousel: HTMLElement | null = null;
  private flkty: FlickityInstance | null = null;

  constructor(props: ReactFlickityComponentProps) {
    super(props);

    this.state = {
      flickityReady: false,
      flickityCreated: false,
      cellCount: 0,
    };
  }

  static getDerivedStateFromProps(props: ReactFlickityComponentProps, state: FlickityComponentState) {
    const cellCount = React.Children.count(props.children);
    if (cellCount !== state.cellCount)
      return { flickityReady: false, cellCount };
    return null;
  }

  componentDidUpdate(prevProps: ReactFlickityComponentProps, prevState: FlickityComponentState) {
    if (!this.flkty) return;
    const {
      children,
      options: { draggable, initialIndex } = {},
      reloadOnUpdate,
      disableImagesLoaded,
    } = this.props;
    const { flickityReady } = this.state;
    
    if (reloadOnUpdate || (!prevState.flickityReady && flickityReady)) {
      const isActive = this.flkty.isActive;
      this.flkty.deactivate();
      this.flkty.selectedIndex = Number(initialIndex) || 0;
      this.flkty.options.draggable =
        draggable === undefined
          ? children
            ? React.Children.count(children) > 1
            : false
          : draggable;
      if (isActive) this.flkty.activate();
      if (!disableImagesLoaded && this.carousel) {
        imagesloaded(this.carousel, () => {
          this.flkty?.reloadCells();
        });
      }
    } else {
      this.flkty.reloadCells();
    }
  }


  async componentDidMount() {
    if (!canUseDOM || !this.carousel) return;
    const FlickityClass = (await import('flickity')).default;
    const { flickityRef, options = {} } = this.props;
    this.flkty = new FlickityClass(this.carousel, options) as FlickityInstance;
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
    else if (this.carousel) imagesloaded(this.carousel, setFlickityToReady);
  }

  renderPortal() {
    if (!this.carousel) return null;
    const mountNode = this.carousel.querySelector('.flickity-slider');
    if (mountNode) {
      const element = createPortal(this.props.children, mountNode);
      setTimeout(() => this.setReady(), 0);
      return element;
    }
  }

  render() {
    const { elementType = 'div', className = '', static: isStatic, children } = this.props;
    
    return React.createElement(
      elementType,
      {
        className,
        ref: (c: HTMLElement | null) => {
          this.carousel = c;
        },
      },
      isStatic ? children : this.renderPortal()
    );
  }
}

export default FlickityComponent;