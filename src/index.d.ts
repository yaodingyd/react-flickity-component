import React, { Component } from "react";

interface Props {
    className?: string;
    elementType?: string;
    options?: FlickityOptions;
    disableImagesLoaded?: boolean;
    reloadOnUpdate?: boolean;
    flickityRef?: (ref: HTMLDivElement) => void;
}

declare class Flickity extends React.Component<Props, any> {}

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
     * Zero-based index of the initial selected cell.
     */
    initialIndex?: number;

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