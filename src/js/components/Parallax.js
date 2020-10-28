import React, { Component, Fragment } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';



function clamp(number, lower, upper) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
    return number;
}

/**
 * Gets the parallax X and Y offsets to be applied to an element
 * based upon the percent the element has moved in the viewport
 * and the min/max offsets
 * @returns {Object}
 */

function getParallaxOffsets(offsets, percentMoved, slowerScrollRate) {
    const {
        yMin,
        yMax,
        xMin,
        xMax,
    } = offsets;

    const yUnit = yMax.unit;
    const xUnit = xMax.unit;

    // sets parallax to faster or slower than the rate of scroll
    let x = 0;
    let y = 0;

    if (slowerScrollRate) {
        x = scaleBetween(percentMoved, xMin.value, xMax.value, 0, 100);
        y = scaleBetween(percentMoved, yMin.value, yMax.value, 0, 100);
    } else {
        // flipped max/min
        x = scaleBetween(percentMoved, xMax.value, xMin.value, 0, 100);
        y = scaleBetween(percentMoved, yMax.value, yMin.value, 0, 100);
    }

    return {
        x: {
            value: x,
            unit: xUnit,
        },
        y: {
            value: y,
            unit: yUnit,
        },
    };
}

/**
 * Takes a parallax element and returns whether the element
 * is in view based on the cached position of the element,
 * current scroll position and the window height.
 * @param {object} element
 * @return {boolean} isInView
 */

function isElementInView(element, windowHeight, scrollY) {
    const top = element.attributes.top - scrollY;
    const bottom = element.attributes.bottom - scrollY;

    const topInView     = top    >= 0 && top    <= windowHeight;
    const bottomInView  = bottom >= 0 && bottom <= windowHeight;
    const covering      = top    <= 0 && bottom >= windowHeight;

    const isInView = topInView || bottomInView || covering;

    return isInView;
}

/**
 * Determines the unit of a string and parses the value
 *
 * @param {string} value
 * @return {object} The parsed value and the unit if any
 */

function parseValueAndUnit(value) {
    const isBool = typeof value === 'boolean';
    const isObject = typeof value === 'object';
    const isString = typeof value === 'string';
    const isNumb = typeof value === 'number';

    if (isBool || isObject) {
        throw new Error('Ivalid value provided. Must provide a value as a string with % or px units.');
    }

    if (isNumb) {
        return {
            value,
            unit: '%', // defaults to percent if not unit is passed
        };
    } else if (isString && value.slice(-1) === '%') {
        // remove % then parse
        value = parseInt(value.slice(0, -1), 10);

        return {
            value,
            unit: '%',
        };
    } else if (isString && value.slice(-2) === 'px') {
        // remove px then parse
        value = parseInt(value.slice(0, -2), 10);

        return {
            value,
            unit: 'px',
        };
    }
}

function offsetMin(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    if (!typeof value === 'string' || !typeof value === 'number') {
        return new Error(`[${propName}] in ${componentName} must be a string with with "%"" or "px" units or number`);
    }

    if (props[propName]) {
        let value = props[propName];
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value <= 0 ? null : new Error(`[${propName}] in ${componentName} is greater than zero. [${propName}] must be less than or equal to zero.`);
    }
    return null;
}

function offsetMax(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    if (!typeof value === 'string' || !typeof value === 'number') {
        return new Error(`[${propName}] in ${componentName} must be a string with with "%"" or "px" units or number`);
    }

    if (props[propName]) {
        let value = props[propName];
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value >= 0 ? null : new Error(`[${propName}] in ${componentName} is less than zero. [${propName}] must be greater than or equal to zero.`);
    }
    return null;
}

function scaleBetween(value, newMin, newMax, oldMin, oldMax) {
    return (newMax - newMin) * (value - oldMin) / (oldMax - oldMin) + newMin;
}

function testForPassiveScroll() {
    let supportsPassiveOption = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            },
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) {}
    return supportsPassiveOption;
}

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up window scroll/resize
 * listeners, managing and caching parallax element positions,
 * determining which elements are inside the viewport based on
 * scroll position, and then updating parallax element styles
 * based on min/max offsets and current scroll position.
 *
 */
function ParallaxController() {
    // All parallax elements to be updated
    const elements = [];

    // Tracks current scroll y distance
    let scrollY = 0;

    // Window inner height
    let windowHeight = 0;

    // ID to increment for elements
    let id = 0;

    // Ticking
    let ticking = false;

    // Scroll direction
    // let scrollDown = null;

    // Passive support
    const supportsPassive = testForPassiveScroll();

    function _addListeners() {
        window.addEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.addEventListener('resize', _handleResize, false);
    }

    function _removeListeners() {
        window.removeEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.removeEventListener('resize', _handleResize, false);
    }

    _addListeners();

    /**
     * Window scroll handler. Sets the 'scrollY'
     * and then calls '_updateElementPositions()'.
     */
    function _handleScroll() {
        // reference to prev scroll y
        // const prevScrollY = scrollY;

        // Save current scroll
        scrollY = window.pageYOffset; // Supports IE 9 and up.

        // direction
        // scrollDown = scrollY > prevScrollY;

        // Only called if the last animation request has been
        // completed and there are parallax elements to update
        if (!ticking && elements.length > 0) {
            ticking = true;
            window.requestAnimationFrame(_updateElementPositions);
        }
    }

    /**
     * Window resize handler. Sets the new window inner height
     * then updates parallax element attributes and positions.
     */
    function _handleResize() {
        _setWindowHeight();
        _updateElementAttributes();
        _updateElementPositions();
    }

    /**
     * Creates a unique id to distinguish parallax elements.
     * @return {Number}
     */
    function _createID() {
        ++id;
        return id;
    }

    /**
     * Update element positions.
     * Determines if the element is in view based on the cached
     * attributes, if so set the elements parallax styles.
     */
    function _updateElementPositions() {
        elements.forEach(element => {
            if (element.props.disabled) return;

            // check if the element is in view then
            const isInView = isElementInView(element, windowHeight, scrollY);

            // set styles if it is
            if (isInView) _setParallaxStyles(element);

            // reset ticking so more animations can be called
            ticking = false;
        });
    }

    /**
     * Update element attributes.
     * Sets up the elements offsets based on the props passed from
     * the component then caches the elements current position and
     * other important attributes.
     */
    function _updateElementAttributes() {
        elements.forEach(element => {
            if (element.props.disabled) return;

            _setupOffsets(element);

            _cacheAttributes(element);
        });
    }

    /**
     * Remove parallax styles from all elements.
     */
    function _removeParallaxStyles() {
        elements.forEach(element => {
            _resetStyles(element);
        });
    }

    /**
     * Cache the window height.
     */
    function _setWindowHeight() {
        const html = document.documentElement;
        windowHeight = window.innerHeight || html.clientHeight;
    }

    /**
     * Takes a parallax element and caches important values that
     * cause layout reflow and paints. Stores the values as an
     * attribute object accesible on the parallax element.
     * @param {object} element
     */
    function _cacheAttributes(element) {
        const { yMin, yMax, xMax, xMin } = element.offsets;

        const { slowerScrollRate } = element.props;

        // NOTE: Many of these cause layout and reflow so we're not
        // calculating them on every frame -- instead these values
        // are cached on the element to access later when determining
        // the element's position and offset.
        const el = element.elOuter;
        const rect = el.getBoundingClientRect();
        const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;
        const scrollY = window.pageYOffset;

        // NOTE: offsetYMax and offsetYMin are percents
        // based of the height of the element. They must be
        // calculated as px to correctly determine whether
        // the element is in the viewport.
        const yPercent = yMax.unit === '%' || yMin.unit === '%';
        const xPercent = xMax.unit === '%' || xMin.unit === '%';

        // X offsets
        let yMinPx = yMin.value;
        let yMaxPx = yMax.value;

        if (yPercent) {
            const h100 = elHeight / 100;
            yMaxPx = yMax.value * h100;
            yMinPx = yMin.value * h100; // negative value
        }

        // Y offsets
        let xMinPx = xMax.value;
        let xMaxPx = xMin.value;

        if (xPercent) {
            const w100 = elWidth / 100;
            xMaxPx = xMax.value * w100;
            xMinPx = xMin.value * w100; // negative value
        }

        // NOTE: must add the current scroll position when the
        // element is checked so that we get its absolute position
        // relative to the document and not the viewport then
        // add the min/max offsets calculated above.
        let top = 0;
        let bottom = 0;

        if (slowerScrollRate) {
            top = rect.top + scrollY + yMinPx;
            bottom = rect.bottom + scrollY + yMaxPx;
        } else {
            top = rect.top + scrollY + yMaxPx * -1;
            bottom = rect.bottom + scrollY + yMinPx * -1;
        }

        // NOTE: Total distance the element will move from when
        // the top enters the view to the bottom leaving
        // accounting for elements height and max/min offsets.
        const totalDist = windowHeight + (elHeight + Math.abs(yMinPx) + yMaxPx);

        element.attributes = {
            top,
            bottom,
            elHeight,
            elWidth,
            yMaxPx,
            yMinPx,
            xMaxPx,
            xMinPx,
            totalDist,
        };
    }

    /**
     * Takes a parallax element and parses the offset props to get the value
     * and unit. Sets these values as offset object accessible on the element.
     * @param {object} element
     */
    function _setupOffsets(element) {
        const {
            offsetYMin,
            offsetYMax,
            offsetXMax,
            offsetXMin,
        } = element.props;

        const yMin = parseValueAndUnit(offsetYMin);
        const yMax = parseValueAndUnit(offsetYMax);
        const xMin = parseValueAndUnit(offsetXMax);
        const xMax = parseValueAndUnit(offsetXMin);

        if (xMin.unit !== xMax.unit || yMin.unit !== yMax.unit) {
            throw new Error(
                'Must provide matching units for the min and max offset values of each axis.'
            );
        }

        const xUnit = xMin.unit || '%';
        const yUnit = yMin.unit || '%';

        element.offsets = {
            xUnit,
            yUnit,
            yMin,
            yMax,
            xMin,
            xMax,
        };
    }

    /**
     * Takes a parallax element and set the styles based on the
     * offsets and percent the element has moved though the viewport.
     * @param {object} element
     */
    function _setParallaxStyles(element) {
        const top = element.attributes.top - scrollY;
        const { totalDist } = element.attributes;

        // Percent the element has moved based on current and total distance to move
        const percentMoved = (top * -1 + windowHeight) / totalDist * 100;

        // console.log(percentMoved);
        // Scale percentMoved to min/max percent determined by offset props
        const { slowerScrollRate } = element.props;

        // Get the parallax X and Y offsets
        const offsets = getParallaxOffsets(
            element.offsets,
            percentMoved,
            slowerScrollRate
        );

        // Apply styles
        const el = element.elInner;
        el.style.cssText = `position:relative; opacity:${percentMoved * 0.01};
            transform:translate3d(${offsets.x.value}${offsets.x.unit}, ${offsets.y.value}${offsets.y.unit}, 0)`;
    }

    /**
     * Takes a parallax element and removes parallax offset styles.
     * @param {object} element
     */
    function _resetStyles(element) {
        const el = element.elInner;
        el.style.cssText = `position:relative;
            transform:translate3d(0, 0, 0)`;
    }

    /**
     * -------------------------------------------------------
     * Public methods
     * -------------------------------------------------------
     */

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} options
     * @return {object} element
     */
    this.createElement = function(options) {
        const id = _createID();
        const element = {
            id,
            ...options,
        };

        elements.push(element);
        this.update();

        return element;
    };

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} element
     */
    this.removeElement = function(element) {
        // gets the index of the element to update based on id
        const index = elements.findIndex(el => el.id === element.id);

        if (index !== -1) {
            elements.splice(index, 1);
        }
    };

    /**
     * Updates an existing parallax element object with new options.
     * @param {object} element
     * @param {object} options
     */
    this.updateElement = function(element, options) {
        // gets the index of the element to update based on id
        const index = elements.findIndex(el => el.id === element.id);

        // create new element with options and replaces the old
        if (index !== -1) {
            elements[index] = Object.assign({}, elements[index], options);

            // call update to set attributes and positions based on the new options
            this.update();
        }
    };

    /**
     * Remove element styles.
     * @param {object} element
     */
    this.resetElementStyles = function(element) {
        _resetStyles(element);
    };

    /**
     * Updates all parallax element attributes and postitions.
     */
    this.update = function() {
        _setWindowHeight();
        _updateElementAttributes();
        _updateElementPositions();
    };

    /**
     * Removes listeners, reset all styles then nullifies the global ParallaxController.
     */
    this.destroy = function() {
        _removeListeners();
        _removeParallaxStyles();
    };
}

/**
 * Static method to instantiate the ParallaxController.
 * Returns a new or existing instance of the ParallaxController.
 * @returns {Object} ParallaxController
 */
ParallaxController.init = function() {
    const hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
        throw new Error(
            'Looks like ParallaxController.init() was called on the server. This method must be called on the client.'
        );
    }

    // Keep global reference for legacy versions >= 1.0.0

    if (hasWindow) {
        return new ParallaxController();
    }
};
    
export class ParallaxProvider extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static childContextTypes = {
        parallaxController: PropTypes.object,
    };

    getChildContext() {
        // Passes down the reference to the controller
        const { parallaxController } = this;
        return { parallaxController };
    }

    componentWillMount() {
        // Don't initialize on the server
        const isServer = typeof window === 'undefined';

        if (!isServer) {
            // Must not be the server so kick it off...
            this.parallaxController = ParallaxController.init();
        }
    }

    componentWillUnmount() {
        if (this.parallaxController) {
            // Remove scroll and resize listener if the provider is unmounted
            this.parallaxController.destroy();
        }
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

export class Parallax extends React.Component {
    static defaultProps = {
        disabled: false,
        offsetYMax: 0,
        offsetYMin: 0,
        offsetXMax: 0,
        offsetXMin: 0,
        slowerScrollRate: false, // determines whether scroll rate is faster or slower than standard scroll
        tag: 'div',
    };

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool.isRequired,
        offsetXMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offsetXMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offsetYMax: offsetMax,
        offsetYMin: offsetMin,
        slowerScrollRate: PropTypes.bool.isRequired,
        tag: PropTypes.string.isRequired,
    };

    static contextTypes = {
        parallaxController: PropTypes.object, // not required because this could be rendered on the server.
    };

    componentDidMount() {
        // Make sure the provided controller is an instance of the Parallax Controller
        const isInstance = this.controller instanceof ParallaxController;

        // Throw if neither context or global is available
        if (!this.controller && !isInstance) {
            throw new Error(
                "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
            );
        }

        // Deprecation warning for <=1.0.0
        // If no context is available but the window global is then warn
        if (!this.context.parallaxController && window.ParallaxController) {
            console.log(
                'Calling ParallaxController.init() has been deprecated in favor of using the <ParallaxProvider /> component. For usage details see: https://github.com/jscottsmith/react-scroll-parallax/tree/v1.1.0#usage'
            );
        }

        // create a new parallax element and save the reference
        this.element = this.controller.createElement({
            elInner: this._inner,
            elOuter: this._outer,
            props: {
                disabled: this.props.disabled,
                offsetXMax: this.props.offsetXMax,
                offsetXMin: this.props.offsetXMin,
                offsetYMax: this.props.offsetYMax,
                offsetYMin: this.props.offsetYMin,
                slowerScrollRate: this.props.slowerScrollRate,
            },
        });
    }

    componentWillReceiveProps(nextProps) {
        // updates the elements props when changed
        if (this.props !== nextProps) {
            this.controller.updateElement(this.element, {
                props: {
                    disabled: nextProps.disabled,
                    offsetXMax: nextProps.offsetXMax,
                    offsetXMin: nextProps.offsetXMin,
                    offsetYMax: nextProps.offsetYMax,
                    offsetYMin: nextProps.offsetYMin,
                    slowerScrollRate: nextProps.slowerScrollRate,
                },
            });
        }
        // resets element styles when disabled
        if (this.props.disabled !== nextProps.disabled && nextProps.disabled) {
            this.controller.resetElementStyles(this.element);
        }
    }

    componentWillUnmount() {
        this.controller.removeElement(this.element);
    }

    get controller() {
        // Legacy versions may use the global, not context
        return this.context.parallaxController || window.ParallaxController;
    }

    // refs
    mapRefOuter = ref => {
        this._outer = ref;
    };

    mapRefInner = ref => {
        this._inner = ref;
    };

    render() {
        const { children, className, tag: Tag } = this.props;

        const rootClass = 'parallax-outer' + (className ? ` ${className}` : '');

        return (
            <Tag className={rootClass} ref={this.mapRefOuter}>
                <div className="parallax-inner" ref={this.mapRefInner}>
                    {children}
                </div>
            </Tag>
        );
    }
}
