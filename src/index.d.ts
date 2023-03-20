import React from "react";

export interface ReactFlickityComponentProps {
  className?: string;
  disableImagesLoaded?: boolean;
  elementType?: string;
  flickityRef?: (ref: Flickity) => void;
  options?: FlickityOptions;
  reloadOnUpdate?: boolean;
  static?: boolean;
  children?: React.ReactNode;
}

declare class Flickity extends React.Component<ReactFlickityComponentProps, any> {
  public on(eventName: FlickityEventName, listener: Function): void;
  public off(eventName: FlickityEventName, listener: Function): void;
  public select(index: number, isWrapped?: boolean, isInstant?: boolean): void;
  public previous(isWrapped?: boolean, isInstant?: boolean): void;
  public next(isWrapped?: boolean, isInstant?: boolean): void;
  public selectCell(value: number | string, isWrapped?: boolean, isInstant?: boolean): void;
  public resize(): void;
  public reposition(): void;
  public prepend(elements: React.ReactNode): void;
  public append(elements: React.ReactNode): void;
  public insert(elements: React.ReactNode, index: number): void;
  public remove(elements: React.ReactNode): void;
  public playPlayer(): void;
  public stopPlayer(): void;
  public pausePlayer(): void;
  public unpausePlayer(): void;
  public destroy(): void;
  public reloadCells(): void;
  public getCellElements(): React.ReactNode;
  public selectedIndex: number;
  public selectedElement: React.ReactNode;
  public selectedElements: React.ReactNode;
  public cells: React.ReactNode;
  public slides: React.ReactNode[];
  public viewFullscreen(): void;
  public exitFullscreen(): void;
  public toggleFullscreen(): void;
}

export default Flickity;

/**
 * @todo - Get @types/flickity to export FlickityOptions type
 */
export interface FlickityOptions {
    /**
     * Specify selector for cell elements. cellSelector is useful if you have other elements in your gallery elements that are not cells.
     *
     * default: '.gallery-cell'
     */
    cellSelector?: string;

    /**
     * Zero-based index or selector string of the initial selected cell.
     */
    initialIndex?: number | string;

    /**
     * Enable keyboard navigation. Users can tab to a Flickity gallery, and pressing left & right keys to change cells.
     *
     * default: true
     */
    accessibility?: boolean;

    /**
     * Sets the height of the gallery to the height of the tallest cell.  Set to  false if you prefer to size the gallery with CSS, rather than using the size of cells.
     *
     * default: true
     */
    setGallerySize?: boolean;

    /**
     * Adjusts sizes and positions when window is resized.
     *
     * default: true
     */
    resize?: boolean;

    /**
     * Align cells within the gallery element.
     * opttions: 'left', 'center', 'right'
     *
     * default: 'center'
     */
    cellAlign?: string;

    /**
     * Contains cells to gallery element to prevent excess scroll at beginning or end. Has no effect if wrapAround is enabled
     *
     * default: true
     */
    contain?: boolean;

    /**
     * Unloaded images have no size, which can throw off cell positions. To fix this, the imagesLoaded option re-positions cells once their images have loaded.
     *
     * default: true
     */
    imagesLoaded?: boolean;

    /**
     * Sets positioning in percent values, rather than pixel values. If your cells do not have percent widths, we recommended percentPosition: false.
     *
     * default: false
     */
    percentPosition?: boolean;

    /**
     * Enables right-to-left layout.
     *
     * default: false
     */
    rightToLeft?: boolean;

    /**
     * Enables dragging and flicking
     *
     * default: true
     */
    draggable?: boolean;

    /**
     * Enables content to be freely scrolled and flicked without aligning cells to an end position.
     * Enable freeScroll and wrapAround and you can flick forever, man.
     *
     * default: false
     */
    freeScroll?: boolean;

    /**
     * At the end of cells, wrap-around to the other end for infinite scrolling.
     *
     * default: false
     */
    wrapAround?: boolean;

    /**
     * Groups cells together in slides. Flicking, page dots, and previous/next buttons are mapped to group slides, not individual cells.
     * `is-selected` class is added to the multiple cells in the selected slide.
     * If set to true, group cells that fit in carousel viewport.
     * If set to a number, group cells by that number.
     * If set to a percent string, group cells that fit in the percent of the width of the carousel viewport.
     */
    groupCells?: boolean | number | string;

    /**
     * Loads cell images when a cell is selected.
     * Set the image's URL to load with the `data-flickity-lazyload` attribute.
     * If set to `true`, lazyloads image in selected slide
     * If set to a number n, load images in selected slide and next n slides and previous n slides.
     *
     * default: false
     */
    lazyLoad?: boolean | number;

    /**
     * Loads cell background image when a cell is selected.
     * Set the background image's URL to load with the `data-flickity-bg-lazyload` attribute.
     * If set to `true`, lazyloads background image in selected slide
     * If set to a number n, load background images in selected slide and next n slides and previous n slides.
     * bgLazyLoad requires the flickity-bg-lazyload package. This package is not included and must be installed separately.
     */
    bgLazyLoad?: boolean | number;

    /**
     * Automatically advances to the next cell.
     *
     * default: false
     */
    autoPlay?: boolean | number;

    /**
     * Auto-playing will pause when the user hovers over the carousel.
     * 
     * default: false
     */
     pauseAutoPlayOnHover?: boolean;

    /**
     * Changes height of carousel to fit height of selected slide.
     */
    adaptiveHeight?: boolean;

    /**
     * You can enable and disable Flickity with CSS. watchCSS option watches the content of :after of the gallery element. Flickity is enabled if :after content is 'flickity'.
     * note: IE8 and Android 2.3 do not support watching :after. Flickity will be disabled when watchCSS: true. Set watchCSS: 'fallbackOn' to enable Flickity for these browsers.
     *
     * default: false
     */
    watchCSS?: boolean | string;

    /**
     * Use one Flickity gallery as navigation for another.
     *
     * default: disabled
     */
    asNavFor?: string;

    /**
     * The number of pixels a mouse or touch has to move before dragging begins. Increase dragThreshold to allow for more wiggle room for vertical page scrolling on touch devices.
     *
     * default: 3
     */
    dragThreshold?: number;

    /**
     * selectedAttraction attracts the position of the slider to the selected cell. Higher attraction makes the slider move faster. Lower makes it move slower.
     *
     * default: 0.025
     */
    selectedAttraction?: number;

    /**
     * Friction slows the movement of slider. Higher friction makes the slider feel stickier and less bouncy. Lower friction makes the slider feel looser and more wobbly.
     *
     * default: 0.28
     */
    friction?: number;

    /**
     * Slows movement of slider when freeScroll: true. Higher friction makes the slider feel stickier. Lower friction makes the slider feel looser.
     *
     * default: 0.075
     */
    freeScrollFriction?: number;

    /**
     * Creates and enables previous & next buttons.
     *
     * default: true
     */
    prevNextButtons?: boolean;

    /**
     * Creates and enables paging dots.
     *
     * default: true
     */
    pageDots?: boolean;

    /**
     * Draws the shape of the arrows in the previous & next buttons.
     * javascript dictionary of points or path to SVG file
     */
    arrowShape?: string | { x0: number, x1: number, y1: number, x2: number, y2: number, x3: number };
}


/**
 * ready: Triggered after Flickity has been activated.
 * change: Triggered when the selected slide is changed.
 * select: Triggered when a slide is selected.
 * settle: Triggered when the slider is settled at its end position.
 * scroll: Triggered when the slider moves.
 * dragStart: Triggered when dragging starts and the slider starts moving.
 * dragMove: Triggered when dragging moves and the slider moves.
 * dragEnd: Triggered when dragging ends.
 * pointerMove: Triggered when the user's pointer moves.
 * pointerUp: Triggered when the user's pointer unpresses.
 * staticClick: Triggered when the user's pointer is pressed and unpressed and has not moved enough to start dragging.
 * lazyLoad: Triggered after an image has been loaded with lazyLoad.
 * bgLazyLoad: Triggered after a background image has been loaded with bgLazyLoad.
 * fullscreenChange: Triggered after entering or exiting fullscreen view.
 */
export type FlickityEventName = 'ready' | 'change' | 'select' | 'settle' | 'scroll' |'dragStart'
    | 'dragMove' | 'dragEnd' | 'pointerDown' | 'pointerMove' | 'pointerUp' 
    | 'staticClick' | 'lazyLoad' | 'bgLazyLoad' | 'fullscreenChange'
