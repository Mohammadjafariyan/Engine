(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["query-generator-query-generator-module"],{

/***/ "./node_modules/angular2-draggable/fesm5/angular2-draggable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/angular2-draggable/fesm5/angular2-draggable.js ***!
  \*********************************************************************/
/*! exports provided: AngularDraggableDirective, AngularResizableDirective, AngularDraggableModule, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularDraggableDirective", function() { return AngularDraggableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularResizableDirective", function() { return AngularResizableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularDraggableModule", function() { return AngularDraggableModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    Position.fromEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e instanceof MouseEvent) {
            return new Position(e.clientX, e.clientY);
        }
        else {
            return new Position(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Position.isIPosition = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return !!obj && ('x' in obj) && ('y' in obj);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    Position.getCurrent = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var /** @type {?} */ pos = new Position(0, 0);
        if (window) {
            var /** @type {?} */ computed = window.getComputedStyle(el);
            if (computed) {
                pos.x = parseInt(computed.getPropertyValue('left'), 10);
                pos.y = parseInt(computed.getPropertyValue('top'), 10);
            }
            return pos;
        }
        else {
            console.error('Not Supported!');
            return null;
        }
    };
    /**
     * @param {?} p
     * @return {?}
     */
    Position.copy = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        return new Position(0, 0).set(p);
    };
    Object.defineProperty(Position.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return { x: this.x, y: this.y };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} p
     * @return {?}
     */
    Position.prototype.add = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    };
    /**
     * @param {?} p
     * @return {?}
     */
    Position.prototype.subtract = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    };
    /**
     * @return {?}
     */
    Position.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    /**
     * @param {?} p
     * @return {?}
     */
    Position.prototype.set = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    };
    return Position;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HelperBlock = /** @class */ (function () {
    function HelperBlock(parent, renderer) {
        this.parent = parent;
        this.renderer = renderer;
        this._added = false;
        // generate helper div
        var /** @type {?} */ helper = renderer.createElement('div');
        renderer.setStyle(helper, 'position', 'absolute');
        renderer.setStyle(helper, 'width', '100%');
        renderer.setStyle(helper, 'height', '100%');
        renderer.setStyle(helper, 'background-color', 'transparent');
        renderer.setStyle(helper, 'top', '0');
        renderer.setStyle(helper, 'left', '0');
        // done
        this._helper = helper;
    }
    /**
     * @return {?}
     */
    HelperBlock.prototype.add = /**
     * @return {?}
     */
    function () {
        // append div to parent
        if (this.parent && !this._added) {
            this.parent.appendChild(this._helper);
            this._added = true;
        }
    };
    /**
     * @return {?}
     */
    HelperBlock.prototype.remove = /**
     * @return {?}
     */
    function () {
        if (this.parent && this._added) {
            this.parent.removeChild(this._helper);
            this._added = false;
        }
    };
    /**
     * @return {?}
     */
    HelperBlock.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this._helper = null;
        this._added = false;
    };
    Object.defineProperty(HelperBlock.prototype, "el", {
        get: /**
         * @return {?}
         */
        function () {
            return this._helper;
        },
        enumerable: true,
        configurable: true
    });
    return HelperBlock;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularDraggableDirective = /** @class */ (function () {
    function AngularDraggableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.allowDrag = true;
        this.moving = false;
        this.orignal = null;
        this.oldTrans = new Position(0, 0);
        this.tempTrans = new Position(0, 0);
        this.currTrans = new Position(0, 0);
        this.oldZIndex = '';
        this._zIndex = '';
        this.needTransform = false;
        /**
         * Bugfix: iFrames, and context unrelated elements block all events, and are unusable
         * https://github.com/xieziyu/angular2-draggable/issues/84
         */
        this._helperBlock = null;
        this.started = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.stopped = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.edge = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * List of allowed out of bounds edges *
         */
        this.outOfBounds = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
        /**
         * Round the position to nearest grid
         */
        this.gridSize = 1;
        /**
         * Whether to limit the element stay in the bounds
         */
        this.inBounds = false;
        /**
         * Whether the element should use it's previous drag position on a new drag event.
         */
        this.trackPosition = true;
        /**
         * Input css scale transform of element so translations are correct
         */
        this.scale = 1;
        /**
         * Whether to prevent default event
         */
        this.preventDefaultEvent = false;
        /**
         * Set initial position by offsets
         */
        this.position = { x: 0, y: 0 };
        /**
         * Emit position offsets when moving
         */
        this.movingOffset = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Emit position offsets when put back
         */
        this.endOffset = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._helperBlock = new HelperBlock(el.nativeElement, renderer);
    }
    Object.defineProperty(AngularDraggableDirective.prototype, "zIndex", {
        /** Set z-index when not dragging */
        set: /**
         * Set z-index when not dragging
         * @param {?} setting
         * @return {?}
         */
        function (setting) {
            this.renderer.setStyle(this.el.nativeElement, 'z-index', setting);
            this._zIndex = setting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularDraggableDirective.prototype, "ngDraggable", {
        set: /**
         * @param {?} setting
         * @return {?}
         */
        function (setting) {
            if (setting !== undefined && setting !== null && setting !== '') {
                this.allowDrag = !!setting;
                var /** @type {?} */ element = this.handle ? this.handle : this.el.nativeElement;
                if (this.allowDrag) {
                    this.renderer.addClass(element, 'ng-draggable');
                }
                else {
                    this.renderer.removeClass(element, 'ng-draggable');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.allowDrag) {
            var /** @type {?} */ element = this.handle ? this.handle : this.el.nativeElement;
            this.renderer.addClass(element, 'ng-draggable');
        }
        this.resetPosition();
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.bounds = null;
        this.handle = null;
        this.orignal = null;
        this.oldTrans = null;
        this.tempTrans = null;
        this.currTrans = null;
        this._helperBlock.dispose();
        this._helperBlock = null;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AngularDraggableDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['position'] && !changes['position'].isFirstChange()) {
            var /** @type {?} */ p = changes['position'].currentValue;
            if (!this.moving) {
                if (Position.isIPosition(p)) {
                    this.oldTrans.set(p);
                }
                else {
                    this.oldTrans.reset();
                }
                this.transform();
            }
            else {
                this.needTransform = true;
            }
        }
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.inBounds) {
            this.boundsCheck();
            this.oldTrans.add(this.tempTrans);
            this.tempTrans.reset();
        }
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.resetPosition = /**
     * @return {?}
     */
    function () {
        if (Position.isIPosition(this.position)) {
            this.oldTrans.set(this.position);
        }
        else {
            this.oldTrans.reset();
        }
        this.tempTrans.reset();
        this.transform();
    };
    /**
     * @param {?} p
     * @return {?}
     */
    AngularDraggableDirective.prototype.moveTo = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        if (this.orignal) {
            p.subtract(this.orignal);
            this.tempTrans.set(p);
            this.transform();
            if (this.bounds) {
                this.edge.emit(this.boundsCheck());
            }
            this.movingOffset.emit(this.currTrans.value);
        }
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.transform = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ translateX = this.tempTrans.x + this.oldTrans.x;
        var /** @type {?} */ translateY = this.tempTrans.y + this.oldTrans.y;
        // Snap to grid: by grid size
        if (this.gridSize > 1) {
            translateX = Math.round(translateX / this.gridSize) * this.gridSize;
            translateY = Math.round(translateY / this.gridSize) * this.gridSize;
        }
        var /** @type {?} */ value = "translate(" + translateX + "px, " + translateY + "px)";
        if (this.scale !== 1) {
            value += " scale(" + this.scale + ")";
        }
        this.renderer.setStyle(this.el.nativeElement, 'transform', value);
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', value);
        this.renderer.setStyle(this.el.nativeElement, '-ms-transform', value);
        this.renderer.setStyle(this.el.nativeElement, '-moz-transform', value);
        this.renderer.setStyle(this.el.nativeElement, '-o-transform', value);
        // save current position
        this.currTrans.x = translateX;
        this.currTrans.y = translateY;
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.pickUp = /**
     * @return {?}
     */
    function () {
        // get old z-index:
        this.oldZIndex = this.el.nativeElement.style.zIndex ? this.el.nativeElement.style.zIndex : '';
        if (window) {
            this.oldZIndex = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue('z-index');
        }
        if (this.zIndexMoving) {
            this.renderer.setStyle(this.el.nativeElement, 'z-index', this.zIndexMoving);
        }
        if (!this.moving) {
            this.started.emit(this.el.nativeElement);
            this.moving = true;
        }
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.boundsCheck = /**
     * @return {?}
     */
    function () {
        if (this.bounds) {
            var /** @type {?} */ boundary = this.bounds.getBoundingClientRect();
            var /** @type {?} */ elem = this.el.nativeElement.getBoundingClientRect();
            var /** @type {?} */ result = {
                'top': this.outOfBounds.top ? true : boundary.top < elem.top,
                'right': this.outOfBounds.right ? true : boundary.right > elem.right,
                'bottom': this.outOfBounds.bottom ? true : boundary.bottom > elem.bottom,
                'left': this.outOfBounds.left ? true : boundary.left < elem.left
            };
            if (this.inBounds) {
                if (!result.top) {
                    this.tempTrans.y -= elem.top - boundary.top;
                }
                if (!result.bottom) {
                    this.tempTrans.y -= elem.bottom - boundary.bottom;
                }
                if (!result.right) {
                    this.tempTrans.x -= elem.right - boundary.right;
                }
                if (!result.left) {
                    this.tempTrans.x -= elem.left - boundary.left;
                }
                this.transform();
            }
            return result;
        }
    };
    /** Get current offset */
    /**
     * Get current offset
     * @return {?}
     */
    AngularDraggableDirective.prototype.getCurrentOffset = /**
     * Get current offset
     * @return {?}
     */
    function () {
        return this.currTrans.value;
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.putBack = /**
     * @return {?}
     */
    function () {
        if (this._zIndex) {
            this.renderer.setStyle(this.el.nativeElement, 'z-index', this._zIndex);
        }
        else if (this.zIndexMoving) {
            if (this.oldZIndex) {
                this.renderer.setStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
            }
            else {
                this.el.nativeElement.style.removeProperty('z-index');
            }
        }
        if (this.moving) {
            this.stopped.emit(this.el.nativeElement);
            // Remove the helper div:
            this._helperBlock.remove();
            if (this.needTransform) {
                if (Position.isIPosition(this.position)) {
                    this.oldTrans.set(this.position);
                }
                else {
                    this.oldTrans.reset();
                }
                this.transform();
                this.needTransform = false;
            }
            if (this.bounds) {
                this.edge.emit(this.boundsCheck());
            }
            this.moving = false;
            this.endOffset.emit(this.currTrans.value);
            if (this.trackPosition) {
                this.oldTrans.add(this.tempTrans);
            }
            this.tempTrans.reset();
            if (!this.trackPosition) {
                this.transform();
            }
        }
    };
    /**
     * @param {?} target
     * @param {?} element
     * @return {?}
     */
    AngularDraggableDirective.prototype.checkHandleTarget = /**
     * @param {?} target
     * @param {?} element
     * @return {?}
     */
    function (target, element) {
        // Checks if the target is the element clicked, then checks each child element of element as well
        // Ignores button clicks
        // Ignore elements of type button
        if (element.tagName === 'BUTTON') {
            return false;
        }
        // If the target was found, return true (handle was found)
        if (element === target) {
            return true;
        }
        // Recursively iterate this elements children
        for (var /** @type {?} */ child in element.children) {
            if (element.children.hasOwnProperty(child)) {
                if (this.checkHandleTarget(target, element.children[child])) {
                    return true;
                }
            }
        }
        // Handle was not found in this lineage
        // Note: return false is ignore unless it is the parent element
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularDraggableDirective.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // 1. skip right click;
        if (event instanceof MouseEvent && event.button === 2) {
            return;
        }
        // 2. if handle is set, the element can only be moved by handle
        var /** @type {?} */ target = event.target || event.srcElement;
        if (this.handle !== undefined && !this.checkHandleTarget(target, this.handle)) {
            return;
        }
        if (this.preventDefaultEvent) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.orignal = Position.fromEvent(event);
        this.pickUp();
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        this.putBack();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularDraggableDirective.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.moving && this.allowDrag) {
            if (this.preventDefaultEvent) {
                event.stopPropagation();
                event.preventDefault();
            }
            // Add a transparent helper div:
            this._helperBlock.add();
            this.moveTo(Position.fromEvent(event));
        }
    };
    AngularDraggableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[ngDraggable]',
                    exportAs: 'ngDraggable'
                },] },
    ];
    /** @nocollapse */
    AngularDraggableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    AngularDraggableDirective.propDecorators = {
        started: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        stopped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        edge: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        handle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        bounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        outOfBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        gridSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        zIndexMoving: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        zIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        inBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        trackPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        scale: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        preventDefaultEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        position: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        movingOffset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        endOffset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        ngDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onMouseDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousedown', ['$event'],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['touchstart', ['$event'],] }],
        onMouseLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mouseup',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mouseleave',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchend',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchcancel',] }],
        onMouseMove: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mousemove', ['$event'],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchmove', ['$event'],] }]
    };
    return AngularDraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResizeHandle = /** @class */ (function () {
    function ResizeHandle(parent, renderer, type, css, onMouseDown) {
        var _this = this;
        this.parent = parent;
        this.renderer = renderer;
        this.type = type;
        this.css = css;
        this.onMouseDown = onMouseDown;
        // generate handle div
        var /** @type {?} */ handle = renderer.createElement('div');
        renderer.addClass(handle, 'ng-resizable-handle');
        renderer.addClass(handle, css);
        // add default diagonal for se handle
        if (type === 'se') {
            renderer.addClass(handle, 'ng-resizable-diagonal');
        }
        // append div to parent
        if (this.parent) {
            parent.appendChild(handle);
        }
        // create and register event listener
        this._onResize = function (event) { onMouseDown(event, _this); };
        handle.addEventListener('mousedown', this._onResize);
        handle.addEventListener('touchstart', this._onResize);
        // done
        this._handle = handle;
    }
    /**
     * @return {?}
     */
    ResizeHandle.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this._handle.removeEventListener('mousedown', this._onResize);
        this._handle.removeEventListener('touchstart', this._onResize);
        if (this.parent) {
            this.parent.removeChild(this._handle);
        }
        this._handle = null;
        this._onResize = null;
    };
    Object.defineProperty(ResizeHandle.prototype, "el", {
        get: /**
         * @return {?}
         */
        function () {
            return this._handle;
        },
        enumerable: true,
        configurable: true
    });
    return ResizeHandle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    Size.getCurrent = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var /** @type {?} */ size = new Size(0, 0);
        if (window) {
            var /** @type {?} */ computed = window.getComputedStyle(el);
            if (computed) {
                size.width = parseInt(computed.getPropertyValue('width'), 10);
                size.height = parseInt(computed.getPropertyValue('height'), 10);
            }
            return size;
        }
        else {
            console.error('Not Supported!');
            return null;
        }
    };
    /**
     * @param {?} s
     * @return {?}
     */
    Size.copy = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        return new Size(0, 0).set(s);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    Size.prototype.set = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        this.width = s.width;
        this.height = s.height;
        return this;
    };
    return Size;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularResizableDirective = /** @class */ (function () {
    function AngularResizableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this._resizable = true;
        this._handles = {};
        this._handleType = [];
        this._handleResizing = null;
        this._direction = null;
        this._aspectRatio = 0;
        this._containment = null;
        this._origMousePos = null;
        /**
         * Original Size and Position
         */
        this._origSize = null;
        this._origPos = null;
        /**
         * Current Size and Position
         */
        this._currSize = null;
        this._currPos = null;
        /**
         * Initial Size and Position
         */
        this._initSize = null;
        this._initPos = null;
        /**
         * Snap to gird
         */
        this._gridSize = null;
        this._bounding = null;
        /**
         * Bugfix: iFrames, and context unrelated elements block all events, and are unusable
         * https://github.com/xieziyu/angular2-draggable/issues/84
         */
        this._helperBlock = null;
        /**
         * Which handles can be used for resizing.
         * \@example
         * [rzHandles] = "'n,e,s,w,se,ne,sw,nw'"
         * equals to: [rzHandles] = "'all'"
         *
         *
         */
        this.rzHandles = 'e,s,se';
        /**
         * Whether the element should be constrained to a specific aspect ratio.
         *  Multiple types supported:
         *  boolean: When set to true, the element will maintain its original aspect ratio.
         *  number: Force the element to maintain a specific aspect ratio during resizing.
         */
        this.rzAspectRatio = false;
        /**
         * Constrains resizing to within the bounds of the specified element or region.
         *  Multiple types supported:
         *  Selector: The resizable element will be contained to the bounding box of the first element found by the selector.
         *            If no element is found, no containment will be set.
         *  Element: The resizable element will be contained to the bounding box of this element.
         *  String: Possible values: "parent".
         */
        this.rzContainment = null;
        /**
         * Snaps the resizing element to a grid, every x and y pixels.
         * A number for both width and height or an array values like [ x, y ]
         */
        this.rzGrid = null;
        /**
         * The minimum width the resizable should be allowed to resize to.
         */
        this.rzMinWidth = null;
        /**
         * The minimum height the resizable should be allowed to resize to.
         */
        this.rzMinHeight = null;
        /**
         * The maximum width the resizable should be allowed to resize to.
         */
        this.rzMaxWidth = null;
        /**
         * The maximum height the resizable should be allowed to resize to.
         */
        this.rzMaxHeight = null;
        /**
         * emitted when start resizing
         */
        this.rzStart = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * emitted when start resizing
         */
        this.rzResizing = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * emitted when stop resizing
         */
        this.rzStop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._helperBlock = new HelperBlock(el.nativeElement, renderer);
    }
    Object.defineProperty(AngularResizableDirective.prototype, "ngResizable", {
        /** Disables the resizable if set to false. */
        set: /**
         * Disables the resizable if set to false.
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== undefined && v !== null && v !== '') {
                this._resizable = !!v;
                this.updateResizable();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    AngularResizableDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['rzHandles'] && !changes['rzHandles'].isFirstChange()) {
            this.updateResizable();
        }
        if (changes['rzAspectRatio'] && !changes['rzAspectRatio'].isFirstChange()) {
            this.updateAspectRatio();
        }
        if (changes['rzContainment'] && !changes['rzContainment'].isFirstChange()) {
            this.updateContainment();
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateResizable();
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeHandles();
        this._containment = null;
        this._helperBlock.dispose();
        this._helperBlock = null;
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ elm = this.el.nativeElement;
        this._initSize = Size.getCurrent(elm);
        this._initPos = Position.getCurrent(elm);
        this._currSize = Size.copy(this._initSize);
        this._currPos = Position.copy(this._initPos);
        this.updateAspectRatio();
        this.updateContainment();
    };
    /**
     * A method to reset size
     * @return {?}
     */
    AngularResizableDirective.prototype.resetSize = /**
     * A method to reset size
     * @return {?}
     */
    function () {
        this._currSize = Size.copy(this._initSize);
        this._currPos = Position.copy(this._initPos);
        this.doResize();
    };
    /**
     * A method to get current status
     * @return {?}
     */
    AngularResizableDirective.prototype.getStatus = /**
     * A method to get current status
     * @return {?}
     */
    function () {
        if (!this._currPos || !this._currSize) {
            return null;
        }
        return {
            size: {
                width: this._currSize.width,
                height: this._currSize.height
            },
            position: {
                top: this._currPos.y,
                left: this._currPos.x
            }
        };
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.updateResizable = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this.el.nativeElement;
        // clear handles:
        this.renderer.removeClass(element, 'ng-resizable');
        this.removeHandles();
        // create new ones:
        if (this._resizable) {
            this.renderer.addClass(element, 'ng-resizable');
            this.createHandles();
        }
    };
    /**
     * Use it to update aspect
     * @return {?}
     */
    AngularResizableDirective.prototype.updateAspectRatio = /**
     * Use it to update aspect
     * @return {?}
     */
    function () {
        if (typeof this.rzAspectRatio === 'boolean') {
            if (this.rzAspectRatio && this._currSize.height) {
                this._aspectRatio = (this._currSize.width / this._currSize.height);
            }
            else {
                this._aspectRatio = 0;
            }
        }
        else {
            var /** @type {?} */ r = Number(this.rzAspectRatio);
            this._aspectRatio = isNaN(r) ? 0 : r;
        }
    };
    /**
     * Use it to update containment
     * @return {?}
     */
    AngularResizableDirective.prototype.updateContainment = /**
     * Use it to update containment
     * @return {?}
     */
    function () {
        if (!this.rzContainment) {
            this._containment = null;
            return;
        }
        if (typeof this.rzContainment === 'string') {
            if (this.rzContainment === 'parent') {
                this._containment = this.el.nativeElement.parentElement;
            }
            else {
                this._containment = document.querySelector(this.rzContainment);
            }
        }
        else {
            this._containment = this.rzContainment;
        }
    };
    /**
     * Use it to create handle divs
     * @return {?}
     */
    AngularResizableDirective.prototype.createHandles = /**
     * Use it to create handle divs
     * @return {?}
     */
    function () {
        if (!this.rzHandles) {
            return;
        }
        var /** @type {?} */ tmpHandleTypes;
        if (typeof this.rzHandles === 'string') {
            if (this.rzHandles === 'all') {
                tmpHandleTypes = ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'];
            }
            else {
                tmpHandleTypes = this.rzHandles.replace(/ /g, '').toLowerCase().split(',');
            }
            try {
                for (var tmpHandleTypes_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__values"])(tmpHandleTypes), tmpHandleTypes_1_1 = tmpHandleTypes_1.next(); !tmpHandleTypes_1_1.done; tmpHandleTypes_1_1 = tmpHandleTypes_1.next()) {
                    var type = tmpHandleTypes_1_1.value;
                    // default handle theme: ng-resizable-$type.
                    var /** @type {?} */ handle = this.createHandleByType(type, "ng-resizable-" + type);
                    if (handle) {
                        this._handleType.push(type);
                        this._handles[type] = handle;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tmpHandleTypes_1_1 && !tmpHandleTypes_1_1.done && (_a = tmpHandleTypes_1.return)) _a.call(tmpHandleTypes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            tmpHandleTypes = Object.keys(this.rzHandles);
            try {
                for (var tmpHandleTypes_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__values"])(tmpHandleTypes), tmpHandleTypes_2_1 = tmpHandleTypes_2.next(); !tmpHandleTypes_2_1.done; tmpHandleTypes_2_1 = tmpHandleTypes_2.next()) {
                    var type = tmpHandleTypes_2_1.value;
                    // custom handle theme.
                    var /** @type {?} */ handle = this.createHandleByType(type, this.rzHandles[type]);
                    if (handle) {
                        this._handleType.push(type);
                        this._handles[type] = handle;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (tmpHandleTypes_2_1 && !tmpHandleTypes_2_1.done && (_b = tmpHandleTypes_2.return)) _b.call(tmpHandleTypes_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var e_1, _a, e_2, _b;
    };
    /**
     * Use it to create a handle
     * @param {?} type
     * @param {?} css
     * @return {?}
     */
    AngularResizableDirective.prototype.createHandleByType = /**
     * Use it to create a handle
     * @param {?} type
     * @param {?} css
     * @return {?}
     */
    function (type, css) {
        var /** @type {?} */ _el = this.el.nativeElement;
        if (!type.match(/^(se|sw|ne|nw|n|e|s|w)$/)) {
            console.error('Invalid handle type:', type);
            return null;
        }
        return new ResizeHandle(_el, this.renderer, type, css, this.onMouseDown.bind(this));
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.removeHandles = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__values"])(this._handleType), _b = _a.next(); !_b.done; _b = _a.next()) {
                var type = _b.value;
                this._handles[type].dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this._handleType = [];
        this._handles = {};
        var e_3, _c;
    };
    /**
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    AngularResizableDirective.prototype.onMouseDown = /**
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    function (event, handle) {
        // skip right click;
        if (event instanceof MouseEvent && event.button === 2) {
            return;
        }
        // prevent default events
        event.stopPropagation();
        event.preventDefault();
        if (!this._handleResizing) {
            this._origMousePos = Position.fromEvent(event);
            this.startResize(handle);
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        if (this._handleResizing) {
            this.stopResize();
            this._origMousePos = null;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularResizableDirective.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._handleResizing && this._resizable && this._origMousePos && this._origPos && this._origSize) {
            this.resizeTo(Position.fromEvent(event));
            this.onResizing();
        }
    };
    /**
     * @param {?} handle
     * @return {?}
     */
    AngularResizableDirective.prototype.startResize = /**
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        var /** @type {?} */ elm = this.el.nativeElement;
        this._origSize = Size.getCurrent(elm);
        this._origPos = Position.getCurrent(elm); // x: left, y: top
        this._currSize = Size.copy(this._origSize);
        this._currPos = Position.copy(this._origPos);
        if (this._containment) {
            this.getBounding();
        }
        this.getGridSize();
        // Add a transparent helper div:
        this._helperBlock.add();
        this._handleResizing = handle;
        this.updateDirection();
        this.rzStart.emit(this.getResizingEvent());
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.stopResize = /**
     * @return {?}
     */
    function () {
        // Remove the helper div:
        this._helperBlock.remove();
        this.rzStop.emit(this.getResizingEvent());
        this._handleResizing = null;
        this._direction = null;
        this._origSize = null;
        this._origPos = null;
        if (this._containment) {
            this.resetBounding();
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.onResizing = /**
     * @return {?}
     */
    function () {
        this.rzResizing.emit(this.getResizingEvent());
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.getResizingEvent = /**
     * @return {?}
     */
    function () {
        return {
            host: this.el.nativeElement,
            handle: this._handleResizing ? this._handleResizing.el : null,
            size: {
                width: this._currSize.width,
                height: this._currSize.height
            },
            position: {
                top: this._currPos.y,
                left: this._currPos.x
            }
        };
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.updateDirection = /**
     * @return {?}
     */
    function () {
        this._direction = {
            n: !!this._handleResizing.type.match(/n/),
            s: !!this._handleResizing.type.match(/s/),
            w: !!this._handleResizing.type.match(/w/),
            e: !!this._handleResizing.type.match(/e/)
        };
    };
    /**
     * @param {?} p
     * @return {?}
     */
    AngularResizableDirective.prototype.resizeTo = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        p.subtract(this._origMousePos);
        var /** @type {?} */ tmpX = Math.round(p.x / this._gridSize.x) * this._gridSize.x;
        var /** @type {?} */ tmpY = Math.round(p.y / this._gridSize.y) * this._gridSize.y;
        if (this._direction.n) {
            // n, ne, nw
            this._currPos.y = this._origPos.y + tmpY;
            this._currSize.height = this._origSize.height - tmpY;
        }
        else if (this._direction.s) {
            // s, se, sw
            this._currSize.height = this._origSize.height + tmpY;
        }
        if (this._direction.e) {
            // e, ne, se
            this._currSize.width = this._origSize.width + tmpX;
        }
        else if (this._direction.w) {
            // w, nw, sw
            this._currSize.width = this._origSize.width - tmpX;
            this._currPos.x = this._origPos.x + tmpX;
        }
        this.checkBounds();
        this.checkSize();
        this.adjustByRatio();
        this.doResize();
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.doResize = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ container = this.el.nativeElement;
        this.renderer.setStyle(container, 'height', this._currSize.height + 'px');
        this.renderer.setStyle(container, 'width', this._currSize.width + 'px');
        this.renderer.setStyle(container, 'left', this._currPos.x + 'px');
        this.renderer.setStyle(container, 'top', this._currPos.y + 'px');
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.adjustByRatio = /**
     * @return {?}
     */
    function () {
        if (this._aspectRatio) {
            if (this._direction.e || this._direction.w) {
                this._currSize.height = this._currSize.width / this._aspectRatio;
            }
            else {
                this._currSize.width = this._aspectRatio * this._currSize.height;
            }
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.checkBounds = /**
     * @return {?}
     */
    function () {
        if (this._containment) {
            var /** @type {?} */ maxWidth = this._bounding.width - this._bounding.pr - this.el.nativeElement.offsetLeft - this._bounding.translateX;
            var /** @type {?} */ maxHeight = this._bounding.height - this._bounding.pb - this.el.nativeElement.offsetTop - this._bounding.translateY;
            if (this._direction.n && (this._currPos.y + this._bounding.translateY) < 0) {
                this._currPos.y = -this._bounding.translateY;
                this._currSize.height = this._origSize.height + this._origPos.y + this._bounding.translateY;
            }
            if (this._direction.w && (this._currPos.x + this._bounding.translateX) < 0) {
                this._currPos.x = -this._bounding.translateX;
                this._currSize.width = this._origSize.width + this._origPos.x + this._bounding.translateX;
            }
            if (this._currSize.width > maxWidth) {
                this._currSize.width = maxWidth;
            }
            if (this._currSize.height > maxHeight) {
                this._currSize.height = maxHeight;
            }
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.checkSize = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ minHeight = !this.rzMinHeight ? 1 : this.rzMinHeight;
        var /** @type {?} */ minWidth = !this.rzMinWidth ? 1 : this.rzMinWidth;
        if (this._currSize.height < minHeight) {
            this._currSize.height = minHeight;
            if (this._direction.n) {
                this._currPos.y = this._origPos.y + (this._origSize.height - minHeight);
            }
        }
        if (this._currSize.width < minWidth) {
            this._currSize.width = minWidth;
            if (this._direction.w) {
                this._currPos.x = this._origPos.x + (this._origSize.width - minWidth);
            }
        }
        if (this.rzMaxHeight && this._currSize.height > this.rzMaxHeight) {
            this._currSize.height = this.rzMaxHeight;
            if (this._direction.n) {
                this._currPos.y = this._origPos.y + (this._origSize.height - this.rzMaxHeight);
            }
        }
        if (this.rzMaxWidth && this._currSize.width > this.rzMaxWidth) {
            this._currSize.width = this.rzMaxWidth;
            if (this._direction.w) {
                this._currPos.x = this._origPos.x + (this._origSize.width - this.rzMaxWidth);
            }
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.getBounding = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ el = this._containment;
        var /** @type {?} */ computed = window.getComputedStyle(el);
        if (computed) {
            var /** @type {?} */ p = computed.getPropertyValue('position');
            var /** @type {?} */ nativeEl = window.getComputedStyle(this.el.nativeElement);
            var /** @type {?} */ transforms = nativeEl.getPropertyValue('transform').replace(/[^-\d,]/g, '').split(',');
            this._bounding = {};
            this._bounding.width = el.clientWidth;
            this._bounding.height = el.clientHeight;
            this._bounding.pr = parseInt(computed.getPropertyValue('padding-right'), 10);
            this._bounding.pb = parseInt(computed.getPropertyValue('padding-bottom'), 10);
            if (transforms.length >= 6) {
                this._bounding.translateX = parseInt(transforms[4], 10);
                this._bounding.translateY = parseInt(transforms[5], 10);
            }
            else {
                this._bounding.translateX = 0;
                this._bounding.translateY = 0;
            }
            this._bounding.position = computed.getPropertyValue('position');
            if (p === 'static') {
                this.renderer.setStyle(el, 'position', 'relative');
            }
        }
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.resetBounding = /**
     * @return {?}
     */
    function () {
        if (this._bounding && this._bounding.position === 'static') {
            this.renderer.setStyle(this._containment, 'position', 'relative');
        }
        this._bounding = null;
    };
    /**
     * @return {?}
     */
    AngularResizableDirective.prototype.getGridSize = /**
     * @return {?}
     */
    function () {
        // set default value:
        this._gridSize = { x: 1, y: 1 };
        if (this.rzGrid) {
            if (typeof this.rzGrid === 'number') {
                this._gridSize = { x: this.rzGrid, y: this.rzGrid };
            }
            else if (Array.isArray(this.rzGrid)) {
                this._gridSize = { x: this.rzGrid[0], y: this.rzGrid[1] };
            }
        }
    };
    AngularResizableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[ngResizable]',
                    exportAs: 'ngResizable'
                },] },
    ];
    /** @nocollapse */
    AngularResizableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    AngularResizableDirective.propDecorators = {
        ngResizable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzHandles: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzAspectRatio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzContainment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzGrid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzMinWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzMinHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzMaxWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzMaxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rzStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        rzResizing: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        rzStop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onMouseLeave: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mouseup',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mouseleave',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchend',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchcancel',] }],
        onMouseMove: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:mousemove', ['$event'],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:touchmove', ['$event'],] }]
    };
    return AngularResizableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularDraggableModule = /** @class */ (function () {
    function AngularDraggableModule() {
    }
    AngularDraggableModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [],
                    declarations: [
                        AngularDraggableDirective,
                        AngularResizableDirective
                    ],
                    exports: [
                        AngularDraggableDirective,
                        AngularResizableDirective
                    ]
                },] },
    ];
    return AngularDraggableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZHJhZ2dhYmxlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyMi1kcmFnZ2FibGUvbGliL21vZGVscy9wb3NpdGlvbi50cyIsIm5nOi8vYW5ndWxhcjItZHJhZ2dhYmxlL2xpYi93aWRnZXRzL2hlbHBlci1ibG9jay50cyIsIm5nOi8vYW5ndWxhcjItZHJhZ2dhYmxlL2xpYi9hbmd1bGFyLWRyYWdnYWJsZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXIyLWRyYWdnYWJsZS9saWIvd2lkZ2V0cy9yZXNpemUtaGFuZGxlLnRzIiwibmc6Ly9hbmd1bGFyMi1kcmFnZ2FibGUvbGliL21vZGVscy9zaXplLnRzIiwibmc6Ly9hbmd1bGFyMi1kcmFnZ2FibGUvbGliL2FuZ3VsYXItcmVzaXphYmxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhcjItZHJhZ2dhYmxlL2xpYi9hbmd1bGFyLWRyYWdnYWJsZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJUG9zaXRpb24ge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbiBpbXBsZW1lbnRzIElQb3NpdGlvbiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikgeyB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRXZlbnQoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcclxuICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xyXG4gICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUG9zaXRpb24oZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzSVBvc2l0aW9uKG9iaik6IG9iaiBpcyBJUG9zaXRpb24ge1xyXG4gICAgcmV0dXJuICEhb2JqICYmICgneCcgaW4gb2JqKSAmJiAoJ3knIGluIG9iaik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q3VycmVudChlbDogRWxlbWVudCkge1xyXG4gICAgbGV0IHBvcyA9IG5ldyBQb3NpdGlvbigwLCAwKTtcclxuXHJcbiAgICBpZiAod2luZG93KSB7XHJcbiAgICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICBpZiAoY29tcHV0ZWQpIHtcclxuICAgICAgICBwb3MueCA9IHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ2xlZnQnKSwgMTApO1xyXG4gICAgICAgIHBvcy55ID0gcGFyc2VJbnQoY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSgndG9wJyksIDEwKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcG9zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTm90IFN1cHBvcnRlZCEnKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29weShwOiBQb3NpdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbigwLCAwKS5zZXQocCk7XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsdWUoKTogSVBvc2l0aW9uIHtcclxuICAgIHJldHVybiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH07XHJcbiAgfVxyXG5cclxuICBhZGQocDogSVBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLnggKz0gcC54O1xyXG4gICAgdGhpcy55ICs9IHAueTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc3VidHJhY3QocDogSVBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLnggLT0gcC54O1xyXG4gICAgdGhpcy55IC09IHAueTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0KHA6IElQb3NpdGlvbikge1xyXG4gICAgdGhpcy54ID0gcC54O1xyXG4gICAgdGhpcy55ID0gcC55O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBlckJsb2NrIHtcclxuICBwcm90ZWN0ZWQgX2hlbHBlcjogRWxlbWVudDtcclxuICBwcml2YXRlIF9hZGRlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBwYXJlbnQ6IEVsZW1lbnQsXHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge1xyXG4gICAgLy8gZ2VuZXJhdGUgaGVscGVyIGRpdlxyXG4gICAgbGV0IGhlbHBlciA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmVuZGVyZXIuc2V0U3R5bGUoaGVscGVyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuICAgIHJlbmRlcmVyLnNldFN0eWxlKGhlbHBlciwgJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgIHJlbmRlcmVyLnNldFN0eWxlKGhlbHBlciwgJ2hlaWdodCcsICcxMDAlJyk7XHJcbiAgICByZW5kZXJlci5zZXRTdHlsZShoZWxwZXIsICdiYWNrZ3JvdW5kLWNvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XHJcbiAgICByZW5kZXJlci5zZXRTdHlsZShoZWxwZXIsICd0b3AnLCAnMCcpO1xyXG4gICAgcmVuZGVyZXIuc2V0U3R5bGUoaGVscGVyLCAnbGVmdCcsICcwJyk7XHJcblxyXG4gICAgLy8gZG9uZVxyXG4gICAgdGhpcy5faGVscGVyID0gaGVscGVyO1xyXG4gIH1cclxuXHJcbiAgYWRkKCkge1xyXG4gICAgLy8gYXBwZW5kIGRpdiB0byBwYXJlbnRcclxuICAgIGlmICh0aGlzLnBhcmVudCAmJiAhdGhpcy5fYWRkZWQpIHtcclxuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5faGVscGVyKTtcclxuICAgICAgdGhpcy5fYWRkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuX2FkZGVkKSB7XHJcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuX2hlbHBlcik7XHJcbiAgICAgIHRoaXMuX2FkZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5faGVscGVyID0gbnVsbDtcclxuICAgIHRoaXMuX2FkZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGVscGVyO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLFxyXG4gIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLFxyXG4gIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElQb3NpdGlvbiwgUG9zaXRpb24gfSBmcm9tICcuL21vZGVscy9wb3NpdGlvbic7XHJcbmltcG9ydCB7IEhlbHBlckJsb2NrIH0gZnJvbSAnLi93aWRnZXRzL2hlbHBlci1ibG9jayc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ0RyYWdnYWJsZV0nLFxyXG4gIGV4cG9ydEFzOiAnbmdEcmFnZ2FibGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgcHJpdmF0ZSBhbGxvd0RyYWcgPSB0cnVlO1xyXG4gIHByaXZhdGUgbW92aW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvcmlnbmFsOiBQb3NpdGlvbiA9IG51bGw7XHJcbiAgcHJpdmF0ZSBvbGRUcmFucyA9IG5ldyBQb3NpdGlvbigwLCAwKTtcclxuICBwcml2YXRlIHRlbXBUcmFucyA9IG5ldyBQb3NpdGlvbigwLCAwKTtcclxuICBwcml2YXRlIGN1cnJUcmFucyA9IG5ldyBQb3NpdGlvbigwLCAwKTtcclxuICBwcml2YXRlIG9sZFpJbmRleCA9ICcnO1xyXG4gIHByaXZhdGUgX3pJbmRleCA9ICcnO1xyXG4gIHByaXZhdGUgbmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBCdWdmaXg6IGlGcmFtZXMsIGFuZCBjb250ZXh0IHVucmVsYXRlZCBlbGVtZW50cyBibG9jayBhbGwgZXZlbnRzLCBhbmQgYXJlIHVudXNhYmxlXHJcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3hpZXppeXUvYW5ndWxhcjItZHJhZ2dhYmxlL2lzc3Vlcy84NFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hlbHBlckJsb2NrOiBIZWxwZXJCbG9jayA9IG51bGw7XHJcblxyXG4gIEBPdXRwdXQoKSBzdGFydGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHN0b3BwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgZWRnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAvKiogTWFrZSB0aGUgaGFuZGxlIEhUTUxFbGVtZW50IGRyYWdnYWJsZSAqL1xyXG4gIEBJbnB1dCgpIGhhbmRsZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKiBTZXQgdGhlIGJvdW5kcyBIVE1MRWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIGJvdW5kczogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKiBMaXN0IG9mIGFsbG93ZWQgb3V0IG9mIGJvdW5kcyBlZGdlcyAqKi9cclxuICBASW5wdXQoKSBvdXRPZkJvdW5kcyA9IHtcclxuICAgIHRvcDogZmFsc2UsXHJcbiAgICByaWdodDogZmFsc2UsXHJcbiAgICBib3R0b206IGZhbHNlLFxyXG4gICAgbGVmdDogZmFsc2VcclxuICB9O1xyXG5cclxuICAvKiogUm91bmQgdGhlIHBvc2l0aW9uIHRvIG5lYXJlc3QgZ3JpZCAqL1xyXG4gIEBJbnB1dCgpIGdyaWRTaXplID0gMTtcclxuXHJcbiAgLyoqIFNldCB6LWluZGV4IHdoZW4gZHJhZ2dpbmcgKi9cclxuICBASW5wdXQoKSB6SW5kZXhNb3Zpbmc6IHN0cmluZztcclxuXHJcbiAgLyoqIFNldCB6LWluZGV4IHdoZW4gbm90IGRyYWdnaW5nICovXHJcbiAgQElucHV0KCkgc2V0IHpJbmRleChzZXR0aW5nOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIHNldHRpbmcpO1xyXG4gICAgdGhpcy5fekluZGV4ID0gc2V0dGluZztcclxuICB9XHJcbiAgLyoqIFdoZXRoZXIgdG8gbGltaXQgdGhlIGVsZW1lbnQgc3RheSBpbiB0aGUgYm91bmRzICovXHJcbiAgQElucHV0KCkgaW5Cb3VuZHMgPSBmYWxzZTtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGVsZW1lbnQgc2hvdWxkIHVzZSBpdCdzIHByZXZpb3VzIGRyYWcgcG9zaXRpb24gb24gYSBuZXcgZHJhZyBldmVudC4gKi9cclxuICBASW5wdXQoKSB0cmFja1Bvc2l0aW9uID0gdHJ1ZTtcclxuXHJcbiAgLyoqIElucHV0IGNzcyBzY2FsZSB0cmFuc2Zvcm0gb2YgZWxlbWVudCBzbyB0cmFuc2xhdGlvbnMgYXJlIGNvcnJlY3QgKi9cclxuICBASW5wdXQoKSBzY2FsZSA9IDE7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRvIHByZXZlbnQgZGVmYXVsdCBldmVudCAqL1xyXG4gIEBJbnB1dCgpIHByZXZlbnREZWZhdWx0RXZlbnQgPSBmYWxzZTtcclxuXHJcbiAgLyoqIFNldCBpbml0aWFsIHBvc2l0aW9uIGJ5IG9mZnNldHMgKi9cclxuICBASW5wdXQoKSBwb3NpdGlvbjogSVBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XHJcblxyXG4gIC8qKiBFbWl0IHBvc2l0aW9uIG9mZnNldHMgd2hlbiBtb3ZpbmcgKi9cclxuICBAT3V0cHV0KCkgbW92aW5nT2Zmc2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9zaXRpb24+KCk7XHJcblxyXG4gIC8qKiBFbWl0IHBvc2l0aW9uIG9mZnNldHMgd2hlbiBwdXQgYmFjayAqL1xyXG4gIEBPdXRwdXQoKSBlbmRPZmZzZXQgPSBuZXcgRXZlbnRFbWl0dGVyPElQb3NpdGlvbj4oKTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbmdEcmFnZ2FibGUoc2V0dGluZzogYW55KSB7XHJcbiAgICBpZiAoc2V0dGluZyAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmcgIT09IG51bGwgJiYgc2V0dGluZyAhPT0gJycpIHtcclxuICAgICAgdGhpcy5hbGxvd0RyYWcgPSAhIXNldHRpbmc7XHJcblxyXG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuaGFuZGxlID8gdGhpcy5oYW5kbGUgOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5hbGxvd0RyYWcpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsICduZy1kcmFnZ2FibGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsICduZy1kcmFnZ2FibGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICB0aGlzLl9oZWxwZXJCbG9jayA9IG5ldyBIZWxwZXJCbG9jayhlbC5uYXRpdmVFbGVtZW50LCByZW5kZXJlcik7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmFsbG93RHJhZykge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuaGFuZGxlID8gdGhpcy5oYW5kbGUgOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ25nLWRyYWdnYWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmJvdW5kcyA9IG51bGw7XHJcbiAgICB0aGlzLmhhbmRsZSA9IG51bGw7XHJcbiAgICB0aGlzLm9yaWduYWwgPSBudWxsO1xyXG4gICAgdGhpcy5vbGRUcmFucyA9IG51bGw7XHJcbiAgICB0aGlzLnRlbXBUcmFucyA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJUcmFucyA9IG51bGw7XHJcbiAgICB0aGlzLl9oZWxwZXJCbG9jay5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLl9oZWxwZXJCbG9jayA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1sncG9zaXRpb24nXSAmJiAhY2hhbmdlc1sncG9zaXRpb24nXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgbGV0IHAgPSBjaGFuZ2VzWydwb3NpdGlvbiddLmN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcclxuICAgICAgICBpZiAoUG9zaXRpb24uaXNJUG9zaXRpb24ocCkpIHtcclxuICAgICAgICAgIHRoaXMub2xkVHJhbnMuc2V0KHApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9sZFRyYW5zLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmluQm91bmRzKSB7XHJcbiAgICAgIHRoaXMuYm91bmRzQ2hlY2soKTtcclxuICAgICAgdGhpcy5vbGRUcmFucy5hZGQodGhpcy50ZW1wVHJhbnMpO1xyXG4gICAgICB0aGlzLnRlbXBUcmFucy5yZXNldCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQb3NpdGlvbigpIHtcclxuICAgIGlmIChQb3NpdGlvbi5pc0lQb3NpdGlvbih0aGlzLnBvc2l0aW9uKSkge1xyXG4gICAgICB0aGlzLm9sZFRyYW5zLnNldCh0aGlzLnBvc2l0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2xkVHJhbnMucmVzZXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMudGVtcFRyYW5zLnJlc2V0KCk7XHJcbiAgICB0aGlzLnRyYW5zZm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlVG8ocDogUG9zaXRpb24pIHtcclxuICAgIGlmICh0aGlzLm9yaWduYWwpIHtcclxuICAgICAgcC5zdWJ0cmFjdCh0aGlzLm9yaWduYWwpO1xyXG4gICAgICB0aGlzLnRlbXBUcmFucy5zZXQocCk7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5ib3VuZHMpIHtcclxuICAgICAgICB0aGlzLmVkZ2UuZW1pdCh0aGlzLmJvdW5kc0NoZWNrKCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm1vdmluZ09mZnNldC5lbWl0KHRoaXMuY3VyclRyYW5zLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtKCkge1xyXG5cclxuICAgIGxldCB0cmFuc2xhdGVYID0gdGhpcy50ZW1wVHJhbnMueCArIHRoaXMub2xkVHJhbnMueDtcclxuICAgIGxldCB0cmFuc2xhdGVZID0gdGhpcy50ZW1wVHJhbnMueSArIHRoaXMub2xkVHJhbnMueTtcclxuXHJcbiAgICAvLyBTbmFwIHRvIGdyaWQ6IGJ5IGdyaWQgc2l6ZVxyXG4gICAgaWYgKHRoaXMuZ3JpZFNpemUgPiAxKSB7XHJcbiAgICAgIHRyYW5zbGF0ZVggPSBNYXRoLnJvdW5kKHRyYW5zbGF0ZVggLyB0aGlzLmdyaWRTaXplKSAqIHRoaXMuZ3JpZFNpemU7XHJcbiAgICAgIHRyYW5zbGF0ZVkgPSBNYXRoLnJvdW5kKHRyYW5zbGF0ZVkgLyB0aGlzLmdyaWRTaXplKSAqIHRoaXMuZ3JpZFNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHZhbHVlID0gYHRyYW5zbGF0ZSgke3RyYW5zbGF0ZVh9cHgsICR7dHJhbnNsYXRlWX1weClgO1xyXG5cclxuICAgIGlmICh0aGlzLnNjYWxlICE9PSAxKSB7XHJcbiAgICAgIHZhbHVlICs9IGAgc2NhbGUoJHt0aGlzLnNjYWxlfSlgO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdmFsdWUpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LXRyYW5zZm9ybScsIHZhbHVlKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLW1zLXRyYW5zZm9ybScsIHZhbHVlKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLW1vei10cmFuc2Zvcm0nLCB2YWx1ZSk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy1vLXRyYW5zZm9ybScsIHZhbHVlKTtcclxuXHJcbiAgICAvLyBzYXZlIGN1cnJlbnQgcG9zaXRpb25cclxuICAgIHRoaXMuY3VyclRyYW5zLnggPSB0cmFuc2xhdGVYO1xyXG4gICAgdGhpcy5jdXJyVHJhbnMueSA9IHRyYW5zbGF0ZVk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBpY2tVcCgpIHtcclxuICAgIC8vIGdldCBvbGQgei1pbmRleDpcclxuICAgIHRoaXMub2xkWkluZGV4ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggOiAnJztcclxuXHJcbiAgICBpZiAod2luZG93KSB7XHJcbiAgICAgIHRoaXMub2xkWkluZGV4ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd6LWluZGV4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuekluZGV4TW92aW5nKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIHRoaXMuekluZGV4TW92aW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubW92aW5nKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRlZC5lbWl0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJvdW5kc0NoZWNrKCkge1xyXG4gICAgaWYgKHRoaXMuYm91bmRzKSB7XHJcbiAgICAgIGxldCBib3VuZGFyeSA9IHRoaXMuYm91bmRzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBsZXQgZWxlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IHtcclxuICAgICAgICAndG9wJzogdGhpcy5vdXRPZkJvdW5kcy50b3AgPyB0cnVlIDogYm91bmRhcnkudG9wIDwgZWxlbS50b3AsXHJcbiAgICAgICAgJ3JpZ2h0JzogdGhpcy5vdXRPZkJvdW5kcy5yaWdodCA/IHRydWUgOiBib3VuZGFyeS5yaWdodCA+IGVsZW0ucmlnaHQsXHJcbiAgICAgICAgJ2JvdHRvbSc6IHRoaXMub3V0T2ZCb3VuZHMuYm90dG9tID8gdHJ1ZSA6IGJvdW5kYXJ5LmJvdHRvbSA+IGVsZW0uYm90dG9tLFxyXG4gICAgICAgICdsZWZ0JzogdGhpcy5vdXRPZkJvdW5kcy5sZWZ0ID8gdHJ1ZSA6IGJvdW5kYXJ5LmxlZnQgPCBlbGVtLmxlZnRcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmluQm91bmRzKSB7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQudG9wKSB7XHJcbiAgICAgICAgICB0aGlzLnRlbXBUcmFucy55IC09IGVsZW0udG9wIC0gYm91bmRhcnkudG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFyZXN1bHQuYm90dG9tKSB7XHJcbiAgICAgICAgICB0aGlzLnRlbXBUcmFucy55IC09IGVsZW0uYm90dG9tIC0gYm91bmRhcnkuYm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFyZXN1bHQucmlnaHQpIHtcclxuICAgICAgICAgIHRoaXMudGVtcFRyYW5zLnggLT0gZWxlbS5yaWdodCAtIGJvdW5kYXJ5LnJpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFyZXN1bHQubGVmdCkge1xyXG4gICAgICAgICAgdGhpcy50ZW1wVHJhbnMueCAtPSBlbGVtLmxlZnQgLSBib3VuZGFyeS5sZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBHZXQgY3VycmVudCBvZmZzZXQgKi9cclxuICBnZXRDdXJyZW50T2Zmc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VyclRyYW5zLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXRCYWNrKCkge1xyXG4gICAgaWYgKHRoaXMuX3pJbmRleCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCB0aGlzLl96SW5kZXgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnpJbmRleE1vdmluZykge1xyXG4gICAgICBpZiAodGhpcy5vbGRaSW5kZXgpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCB0aGlzLm9sZFpJbmRleCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd6LWluZGV4Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tb3ZpbmcpIHtcclxuICAgICAgdGhpcy5zdG9wcGVkLmVtaXQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgaGVscGVyIGRpdjpcclxuICAgICAgdGhpcy5faGVscGVyQmxvY2sucmVtb3ZlKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5uZWVkVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgaWYgKFBvc2l0aW9uLmlzSVBvc2l0aW9uKHRoaXMucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICB0aGlzLm9sZFRyYW5zLnNldCh0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vbGRUcmFucy5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcclxuICAgICAgICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuYm91bmRzKSB7XHJcbiAgICAgICAgdGhpcy5lZGdlLmVtaXQodGhpcy5ib3VuZHNDaGVjaygpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbmRPZmZzZXQuZW1pdCh0aGlzLmN1cnJUcmFucy52YWx1ZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy50cmFja1Bvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vbGRUcmFucy5hZGQodGhpcy50ZW1wVHJhbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRlbXBUcmFucy5yZXNldCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLnRyYWNrUG9zaXRpb24pIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0hhbmRsZVRhcmdldCh0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICAvLyBDaGVja3MgaWYgdGhlIHRhcmdldCBpcyB0aGUgZWxlbWVudCBjbGlja2VkLCB0aGVuIGNoZWNrcyBlYWNoIGNoaWxkIGVsZW1lbnQgb2YgZWxlbWVudCBhcyB3ZWxsXHJcbiAgICAvLyBJZ25vcmVzIGJ1dHRvbiBjbGlja3NcclxuXHJcbiAgICAvLyBJZ25vcmUgZWxlbWVudHMgb2YgdHlwZSBidXR0b25cclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdCVVRUT04nKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgdGFyZ2V0IHdhcyBmb3VuZCwgcmV0dXJuIHRydWUgKGhhbmRsZSB3YXMgZm91bmQpXHJcbiAgICBpZiAoZWxlbWVudCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlY3Vyc2l2ZWx5IGl0ZXJhdGUgdGhpcyBlbGVtZW50cyBjaGlsZHJlblxyXG4gICAgZm9yIChsZXQgY2hpbGQgaW4gZWxlbWVudC5jaGlsZHJlbikge1xyXG4gICAgICBpZiAoZWxlbWVudC5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShjaGlsZCkpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0hhbmRsZVRhcmdldCh0YXJnZXQsIGVsZW1lbnQuY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIHdhcyBub3QgZm91bmQgaW4gdGhpcyBsaW5lYWdlXHJcbiAgICAvLyBOb3RlOiByZXR1cm4gZmFsc2UgaXMgaWdub3JlIHVubGVzcyBpdCBpcyB0aGUgcGFyZW50IGVsZW1lbnRcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXHJcbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XHJcbiAgICAvLyAxLiBza2lwIHJpZ2h0IGNsaWNrO1xyXG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBldmVudC5idXR0b24gPT09IDIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gMi4gaWYgaGFuZGxlIGlzIHNldCwgdGhlIGVsZW1lbnQgY2FuIG9ubHkgYmUgbW92ZWQgYnkgaGFuZGxlXHJcbiAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XHJcbiAgICBpZiAodGhpcy5oYW5kbGUgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5jaGVja0hhbmRsZVRhcmdldCh0YXJnZXQsIHRoaXMuaGFuZGxlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJldmVudERlZmF1bHRFdmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9yaWduYWwgPSBQb3NpdGlvbi5mcm9tRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5waWNrVXAoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbGVhdmUnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNoZW5kJylcclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaGNhbmNlbCcpXHJcbiAgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgdGhpcy5wdXRCYWNrKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNobW92ZScsIFsnJGV2ZW50J10pXHJcbiAgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5tb3ZpbmcgJiYgdGhpcy5hbGxvd0RyYWcpIHtcclxuICAgICAgaWYgKHRoaXMucHJldmVudERlZmF1bHRFdmVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZCBhIHRyYW5zcGFyZW50IGhlbHBlciBkaXY6XHJcbiAgICAgIHRoaXMuX2hlbHBlckJsb2NrLmFkZCgpO1xyXG4gICAgICB0aGlzLm1vdmVUbyhQb3NpdGlvbi5mcm9tRXZlbnQoZXZlbnQpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzaXplSGFuZGxlIHtcclxuICBwcm90ZWN0ZWQgX2hhbmRsZTogRWxlbWVudDtcclxuICBwcml2YXRlIF9vblJlc2l6ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgcGFyZW50OiBFbGVtZW50LFxyXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGNzczogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlRG93bjogYW55XHJcbiAgKSB7XHJcbiAgICAvLyBnZW5lcmF0ZSBoYW5kbGUgZGl2XHJcbiAgICBsZXQgaGFuZGxlID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhoYW5kbGUsICduZy1yZXNpemFibGUtaGFuZGxlJyk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhoYW5kbGUsIGNzcyk7XHJcblxyXG4gICAgLy8gYWRkIGRlZmF1bHQgZGlhZ29uYWwgZm9yIHNlIGhhbmRsZVxyXG4gICAgaWYgKHR5cGUgPT09ICdzZScpIHtcclxuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoaGFuZGxlLCAnbmctcmVzaXphYmxlLWRpYWdvbmFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIGRpdiB0byBwYXJlbnRcclxuICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaGFuZGxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIHJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVyXHJcbiAgICB0aGlzLl9vblJlc2l6ZSA9IChldmVudCkgPT4geyBvbk1vdXNlRG93bihldmVudCwgdGhpcyk7IH07XHJcbiAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25SZXNpemUpO1xyXG4gICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblJlc2l6ZSk7XHJcblxyXG4gICAgLy8gZG9uZVxyXG4gICAgdGhpcy5faGFuZGxlID0gaGFuZGxlO1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuX2hhbmRsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vblJlc2l6ZSk7XHJcbiAgICB0aGlzLl9oYW5kbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uUmVzaXplKTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5faGFuZGxlKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2hhbmRsZSA9IG51bGw7XHJcbiAgICB0aGlzLl9vblJlc2l6ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIElTaXplIHtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2l6ZSBpbXBsZW1lbnRzIElTaXplIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgd2lkdGg6IG51bWJlciwgcHVibGljIGhlaWdodDogbnVtYmVyKSB7IH1cclxuXHJcbiAgc3RhdGljIGdldEN1cnJlbnQoZWw6IEVsZW1lbnQpIHtcclxuICAgIGxldCBzaXplID0gbmV3IFNpemUoMCwgMCk7XHJcblxyXG4gICAgaWYgKHdpbmRvdykge1xyXG4gICAgICBjb25zdCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgICAgaWYgKGNvbXB1dGVkKSB7XHJcbiAgICAgICAgc2l6ZS53aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyksIDEwKTtcclxuICAgICAgICBzaXplLmhlaWdodCA9IHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLCAxMCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdOb3QgU3VwcG9ydGVkIScpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb3B5KHM6IFNpemUpIHtcclxuICAgIHJldHVybiBuZXcgU2l6ZSgwLCAwKS5zZXQocyk7XHJcbiAgfVxyXG5cclxuICBzZXQoczogSVNpemUpIHtcclxuICAgIHRoaXMud2lkdGggPSBzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBzLmhlaWdodDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLFxyXG4gIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLFxyXG4gIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSGVscGVyQmxvY2sgfSBmcm9tICcuL3dpZGdldHMvaGVscGVyLWJsb2NrJztcclxuaW1wb3J0IHsgUmVzaXplSGFuZGxlIH0gZnJvbSAnLi93aWRnZXRzL3Jlc2l6ZS1oYW5kbGUnO1xyXG5pbXBvcnQgeyBSZXNpemVIYW5kbGVUeXBlIH0gZnJvbSAnLi9tb2RlbHMvcmVzaXplLWhhbmRsZS10eXBlJztcclxuaW1wb3J0IHsgUG9zaXRpb24sIElQb3NpdGlvbiB9IGZyb20gJy4vbW9kZWxzL3Bvc2l0aW9uJztcclxuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4vbW9kZWxzL3NpemUnO1xyXG5pbXBvcnQgeyBJUmVzaXplRXZlbnQgfSBmcm9tICcuL21vZGVscy9yZXNpemUtZXZlbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdSZXNpemFibGVdJyxcclxuICBleHBvcnRBczogJ25nUmVzaXphYmxlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclJlc2l6YWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xyXG4gIHByaXZhdGUgX3Jlc2l6YWJsZSA9IHRydWU7XHJcbiAgcHJpdmF0ZSBfaGFuZGxlczogeyBba2V5OiBzdHJpbmddOiBSZXNpemVIYW5kbGUgfSA9IHt9O1xyXG4gIHByaXZhdGUgX2hhbmRsZVR5cGU6IHN0cmluZ1tdID0gW107XHJcbiAgcHJpdmF0ZSBfaGFuZGxlUmVzaXppbmc6IFJlc2l6ZUhhbmRsZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfZGlyZWN0aW9uOiB7ICduJzogYm9vbGVhbiwgJ3MnOiBib29sZWFuLCAndyc6IGJvb2xlYW4sICdlJzogYm9vbGVhbiB9ID0gbnVsbDtcclxuICBwcml2YXRlIF9hc3BlY3RSYXRpbyA9IDA7XHJcbiAgcHJpdmF0ZSBfY29udGFpbm1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuICBwcml2YXRlIF9vcmlnTW91c2VQb3M6IFBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgLyoqIE9yaWdpbmFsIFNpemUgYW5kIFBvc2l0aW9uICovXHJcbiAgcHJpdmF0ZSBfb3JpZ1NpemU6IFNpemUgPSBudWxsO1xyXG4gIHByaXZhdGUgX29yaWdQb3M6IFBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgLyoqIEN1cnJlbnQgU2l6ZSBhbmQgUG9zaXRpb24gKi9cclxuICBwcml2YXRlIF9jdXJyU2l6ZTogU2l6ZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfY3VyclBvczogUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAvKiogSW5pdGlhbCBTaXplIGFuZCBQb3NpdGlvbiAqL1xyXG4gIHByaXZhdGUgX2luaXRTaXplOiBTaXplID0gbnVsbDtcclxuICBwcml2YXRlIF9pbml0UG9zOiBQb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gIC8qKiBTbmFwIHRvIGdpcmQgKi9cclxuICBwcml2YXRlIF9ncmlkU2l6ZTogSVBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfYm91bmRpbmc6IGFueSA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1Z2ZpeDogaUZyYW1lcywgYW5kIGNvbnRleHQgdW5yZWxhdGVkIGVsZW1lbnRzIGJsb2NrIGFsbCBldmVudHMsIGFuZCBhcmUgdW51c2FibGVcclxuICAgKiBodHRwczovL2dpdGh1Yi5jb20veGlleml5dS9hbmd1bGFyMi1kcmFnZ2FibGUvaXNzdWVzLzg0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGVscGVyQmxvY2s6IEhlbHBlckJsb2NrID0gbnVsbDtcclxuXHJcbiAgLyoqIERpc2FibGVzIHRoZSByZXNpemFibGUgaWYgc2V0IHRvIGZhbHNlLiAqL1xyXG4gIEBJbnB1dCgpIHNldCBuZ1Jlc2l6YWJsZSh2OiBhbnkpIHtcclxuICAgIGlmICh2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbCAmJiB2ICE9PSAnJykge1xyXG4gICAgICB0aGlzLl9yZXNpemFibGUgPSAhIXY7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVzaXphYmxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGljaCBoYW5kbGVzIGNhbiBiZSB1c2VkIGZvciByZXNpemluZy5cclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFtyekhhbmRsZXNdID0gXCInbixlLHMsdyxzZSxuZSxzdyxudydcIlxyXG4gICAqIGVxdWFscyB0bzogW3J6SGFuZGxlc10gPSBcIidhbGwnXCJcclxuICAgKlxyXG4gICAqICovXHJcbiAgQElucHV0KCkgcnpIYW5kbGVzOiBSZXNpemVIYW5kbGVUeXBlID0gJ2UscyxzZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGNvbnN0cmFpbmVkIHRvIGEgc3BlY2lmaWMgYXNwZWN0IHJhdGlvLlxyXG4gICAqICBNdWx0aXBsZSB0eXBlcyBzdXBwb3J0ZWQ6XHJcbiAgICogIGJvb2xlYW46IFdoZW4gc2V0IHRvIHRydWUsIHRoZSBlbGVtZW50IHdpbGwgbWFpbnRhaW4gaXRzIG9yaWdpbmFsIGFzcGVjdCByYXRpby5cclxuICAgKiAgbnVtYmVyOiBGb3JjZSB0aGUgZWxlbWVudCB0byBtYWludGFpbiBhIHNwZWNpZmljIGFzcGVjdCByYXRpbyBkdXJpbmcgcmVzaXppbmcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcnpBc3BlY3RSYXRpbzogYm9vbGVhbiB8IG51bWJlciA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJhaW5zIHJlc2l6aW5nIHRvIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBvciByZWdpb24uXHJcbiAgICogIE11bHRpcGxlIHR5cGVzIHN1cHBvcnRlZDpcclxuICAgKiAgU2VsZWN0b3I6IFRoZSByZXNpemFibGUgZWxlbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB0byB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBmaXJzdCBlbGVtZW50IGZvdW5kIGJ5IHRoZSBzZWxlY3Rvci5cclxuICAgKiAgICAgICAgICAgIElmIG5vIGVsZW1lbnQgaXMgZm91bmQsIG5vIGNvbnRhaW5tZW50IHdpbGwgYmUgc2V0LlxyXG4gICAqICBFbGVtZW50OiBUaGUgcmVzaXphYmxlIGVsZW1lbnQgd2lsbCBiZSBjb250YWluZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGlzIGVsZW1lbnQuXHJcbiAgICogIFN0cmluZzogUG9zc2libGUgdmFsdWVzOiBcInBhcmVudFwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJ6Q29udGFpbm1lbnQ6IHN0cmluZyB8IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogU25hcHMgdGhlIHJlc2l6aW5nIGVsZW1lbnQgdG8gYSBncmlkLCBldmVyeSB4IGFuZCB5IHBpeGVscy5cclxuICAgKiBBIG51bWJlciBmb3IgYm90aCB3aWR0aCBhbmQgaGVpZ2h0IG9yIGFuIGFycmF5IHZhbHVlcyBsaWtlIFsgeCwgeSBdXHJcbiAgICovXHJcbiAgQElucHV0KCkgcnpHcmlkOiBudW1iZXIgfCBudW1iZXJbXSA9IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSB3aWR0aCB0aGUgcmVzaXphYmxlIHNob3VsZCBiZSBhbGxvd2VkIHRvIHJlc2l6ZSB0by4gKi9cclxuICBASW5wdXQoKSByek1pbldpZHRoOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gaGVpZ2h0IHRoZSByZXNpemFibGUgc2hvdWxkIGJlIGFsbG93ZWQgdG8gcmVzaXplIHRvLiAqL1xyXG4gIEBJbnB1dCgpIHJ6TWluSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gd2lkdGggdGhlIHJlc2l6YWJsZSBzaG91bGQgYmUgYWxsb3dlZCB0byByZXNpemUgdG8uICovXHJcbiAgQElucHV0KCkgcnpNYXhXaWR0aDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIGhlaWdodCB0aGUgcmVzaXphYmxlIHNob3VsZCBiZSBhbGxvd2VkIHRvIHJlc2l6ZSB0by4gKi9cclxuICBASW5wdXQoKSByek1heEhlaWdodDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqIGVtaXR0ZWQgd2hlbiBzdGFydCByZXNpemluZyAqL1xyXG4gIEBPdXRwdXQoKSByelN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxJUmVzaXplRXZlbnQ+KCk7XHJcblxyXG4gIC8qKiBlbWl0dGVkIHdoZW4gc3RhcnQgcmVzaXppbmcgKi9cclxuICBAT3V0cHV0KCkgcnpSZXNpemluZyA9IG5ldyBFdmVudEVtaXR0ZXI8SVJlc2l6ZUV2ZW50PigpO1xyXG5cclxuICAvKiogZW1pdHRlZCB3aGVuIHN0b3AgcmVzaXppbmcgKi9cclxuICBAT3V0cHV0KCkgcnpTdG9wID0gbmV3IEV2ZW50RW1pdHRlcjxJUmVzaXplRXZlbnQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgIHRoaXMuX2hlbHBlckJsb2NrID0gbmV3IEhlbHBlckJsb2NrKGVsLm5hdGl2ZUVsZW1lbnQsIHJlbmRlcmVyKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydyekhhbmRsZXMnXSAmJiAhY2hhbmdlc1sncnpIYW5kbGVzJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVzaXphYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3J6QXNwZWN0UmF0aW8nXSAmJiAhY2hhbmdlc1sncnpBc3BlY3RSYXRpbyddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUFzcGVjdFJhdGlvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3J6Q29udGFpbm1lbnQnXSAmJiAhY2hhbmdlc1sncnpDb250YWlubWVudCddLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUNvbnRhaW5tZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXBkYXRlUmVzaXphYmxlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVtb3ZlSGFuZGxlcygpO1xyXG4gICAgdGhpcy5fY29udGFpbm1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5faGVscGVyQmxvY2suZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5faGVscGVyQmxvY2sgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgY29uc3QgZWxtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5faW5pdFNpemUgPSBTaXplLmdldEN1cnJlbnQoZWxtKTtcclxuICAgIHRoaXMuX2luaXRQb3MgPSBQb3NpdGlvbi5nZXRDdXJyZW50KGVsbSk7XHJcbiAgICB0aGlzLl9jdXJyU2l6ZSA9IFNpemUuY29weSh0aGlzLl9pbml0U2l6ZSk7XHJcbiAgICB0aGlzLl9jdXJyUG9zID0gUG9zaXRpb24uY29weSh0aGlzLl9pbml0UG9zKTtcclxuICAgIHRoaXMudXBkYXRlQXNwZWN0UmF0aW8oKTtcclxuICAgIHRoaXMudXBkYXRlQ29udGFpbm1lbnQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBBIG1ldGhvZCB0byByZXNldCBzaXplICovXHJcbiAgcHVibGljIHJlc2V0U2l6ZSgpIHtcclxuICAgIHRoaXMuX2N1cnJTaXplID0gU2l6ZS5jb3B5KHRoaXMuX2luaXRTaXplKTtcclxuICAgIHRoaXMuX2N1cnJQb3MgPSBQb3NpdGlvbi5jb3B5KHRoaXMuX2luaXRQb3MpO1xyXG4gICAgdGhpcy5kb1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEEgbWV0aG9kIHRvIGdldCBjdXJyZW50IHN0YXR1cyAqL1xyXG4gIHB1YmxpYyBnZXRTdGF0dXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2N1cnJQb3MgfHwgIXRoaXMuX2N1cnJTaXplKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICB3aWR0aDogdGhpcy5fY3VyclNpemUud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLl9jdXJyU2l6ZS5oZWlnaHRcclxuICAgICAgfSxcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICB0b3A6IHRoaXMuX2N1cnJQb3MueSxcclxuICAgICAgICBsZWZ0OiB0aGlzLl9jdXJyUG9zLnhcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUmVzaXphYmxlKCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAvLyBjbGVhciBoYW5kbGVzOlxyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCAnbmctcmVzaXphYmxlJyk7XHJcbiAgICB0aGlzLnJlbW92ZUhhbmRsZXMoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgbmV3IG9uZXM6XHJcbiAgICBpZiAodGhpcy5fcmVzaXphYmxlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgJ25nLXJlc2l6YWJsZScpO1xyXG4gICAgICB0aGlzLmNyZWF0ZUhhbmRsZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBVc2UgaXQgdG8gdXBkYXRlIGFzcGVjdCAqL1xyXG4gIHByaXZhdGUgdXBkYXRlQXNwZWN0UmF0aW8oKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucnpBc3BlY3RSYXRpbyA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIGlmICh0aGlzLnJ6QXNwZWN0UmF0aW8gJiYgdGhpcy5fY3VyclNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSAodGhpcy5fY3VyclNpemUud2lkdGggLyB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHIgPSBOdW1iZXIodGhpcy5yekFzcGVjdFJhdGlvKTtcclxuICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSBpc05hTihyKSA/IDAgOiByO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFVzZSBpdCB0byB1cGRhdGUgY29udGFpbm1lbnQgKi9cclxuICBwcml2YXRlIHVwZGF0ZUNvbnRhaW5tZW50KCkge1xyXG4gICAgaWYgKCF0aGlzLnJ6Q29udGFpbm1lbnQpIHtcclxuICAgICAgdGhpcy5fY29udGFpbm1lbnQgPSBudWxsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJ6Q29udGFpbm1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmICh0aGlzLnJ6Q29udGFpbm1lbnQgPT09ICdwYXJlbnQnKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbm1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jb250YWlubWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KHRoaXMucnpDb250YWlubWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NvbnRhaW5tZW50ID0gdGhpcy5yekNvbnRhaW5tZW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFVzZSBpdCB0byBjcmVhdGUgaGFuZGxlIGRpdnMgKi9cclxuICBwcml2YXRlIGNyZWF0ZUhhbmRsZXMoKSB7XHJcbiAgICBpZiAoIXRoaXMucnpIYW5kbGVzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdG1wSGFuZGxlVHlwZXM6IHN0cmluZ1tdO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJ6SGFuZGxlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKHRoaXMucnpIYW5kbGVzID09PSAnYWxsJykge1xyXG4gICAgICAgIHRtcEhhbmRsZVR5cGVzID0gWyduJywgJ2UnLCAncycsICd3JywgJ25lJywgJ3NlJywgJ253JywgJ3N3J107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG1wSGFuZGxlVHlwZXMgPSB0aGlzLnJ6SGFuZGxlcy5yZXBsYWNlKC8gL2csICcnKS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgb2YgdG1wSGFuZGxlVHlwZXMpIHtcclxuICAgICAgICAvLyBkZWZhdWx0IGhhbmRsZSB0aGVtZTogbmctcmVzaXphYmxlLSR0eXBlLlxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzLmNyZWF0ZUhhbmRsZUJ5VHlwZSh0eXBlLCBgbmctcmVzaXphYmxlLSR7dHlwZX1gKTtcclxuICAgICAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUeXBlLnB1c2godHlwZSk7XHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVzW3R5cGVdID0gaGFuZGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG1wSGFuZGxlVHlwZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJ6SGFuZGxlcyk7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgb2YgdG1wSGFuZGxlVHlwZXMpIHtcclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlIHRoZW1lLlxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzLmNyZWF0ZUhhbmRsZUJ5VHlwZSh0eXBlLCB0aGlzLnJ6SGFuZGxlc1t0eXBlXSk7XHJcbiAgICAgICAgaWYgKGhhbmRsZSkge1xyXG4gICAgICAgICAgdGhpcy5faGFuZGxlVHlwZS5wdXNoKHR5cGUpO1xyXG4gICAgICAgICAgdGhpcy5faGFuZGxlc1t0eXBlXSA9IGhhbmRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKiogVXNlIGl0IHRvIGNyZWF0ZSBhIGhhbmRsZSAqL1xyXG4gIHByaXZhdGUgY3JlYXRlSGFuZGxlQnlUeXBlKHR5cGU6IHN0cmluZywgY3NzOiBzdHJpbmcpOiBSZXNpemVIYW5kbGUge1xyXG4gICAgY29uc3QgX2VsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGlmICghdHlwZS5tYXRjaCgvXihzZXxzd3xuZXxud3xufGV8c3x3KSQvKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIGhhbmRsZSB0eXBlOicsIHR5cGUpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFJlc2l6ZUhhbmRsZShfZWwsIHRoaXMucmVuZGVyZXIsIHR5cGUsIGNzcywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlSGFuZGxlcygpIHtcclxuICAgIGZvciAobGV0IHR5cGUgb2YgdGhpcy5faGFuZGxlVHlwZSkge1xyXG4gICAgICB0aGlzLl9oYW5kbGVzW3R5cGVdLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9oYW5kbGVUeXBlID0gW107XHJcbiAgICB0aGlzLl9oYW5kbGVzID0ge307XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGhhbmRsZTogUmVzaXplSGFuZGxlKSB7XHJcbiAgICAvLyBza2lwIHJpZ2h0IGNsaWNrO1xyXG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBldmVudC5idXR0b24gPT09IDIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByZXZlbnQgZGVmYXVsdCBldmVudHNcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2hhbmRsZVJlc2l6aW5nKSB7XHJcbiAgICAgIHRoaXMuX29yaWdNb3VzZVBvcyA9IFBvc2l0aW9uLmZyb21FdmVudChldmVudCk7XHJcbiAgICAgIHRoaXMuc3RhcnRSZXNpemUoaGFuZGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbGVhdmUnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNoZW5kJylcclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaGNhbmNlbCcpXHJcbiAgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhbmRsZVJlc2l6aW5nKSB7XHJcbiAgICAgIHRoaXMuc3RvcFJlc2l6ZSgpO1xyXG4gICAgICB0aGlzLl9vcmlnTW91c2VQb3MgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaG1vdmUnLCBbJyRldmVudCddKVxyXG4gIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuX2hhbmRsZVJlc2l6aW5nICYmIHRoaXMuX3Jlc2l6YWJsZSAmJiB0aGlzLl9vcmlnTW91c2VQb3MgJiYgdGhpcy5fb3JpZ1BvcyAmJiB0aGlzLl9vcmlnU2l6ZSkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVRvKFBvc2l0aW9uLmZyb21FdmVudChldmVudCkpO1xyXG4gICAgICB0aGlzLm9uUmVzaXppbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhcnRSZXNpemUoaGFuZGxlOiBSZXNpemVIYW5kbGUpIHtcclxuICAgIGNvbnN0IGVsbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMuX29yaWdTaXplID0gU2l6ZS5nZXRDdXJyZW50KGVsbSk7XHJcbiAgICB0aGlzLl9vcmlnUG9zID0gUG9zaXRpb24uZ2V0Q3VycmVudChlbG0pOyAvLyB4OiBsZWZ0LCB5OiB0b3BcclxuICAgIHRoaXMuX2N1cnJTaXplID0gU2l6ZS5jb3B5KHRoaXMuX29yaWdTaXplKTtcclxuICAgIHRoaXMuX2N1cnJQb3MgPSBQb3NpdGlvbi5jb3B5KHRoaXMuX29yaWdQb3MpO1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5tZW50KSB7XHJcbiAgICAgIHRoaXMuZ2V0Qm91bmRpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0R3JpZFNpemUoKTtcclxuXHJcbiAgICAvLyBBZGQgYSB0cmFuc3BhcmVudCBoZWxwZXIgZGl2OlxyXG4gICAgdGhpcy5faGVscGVyQmxvY2suYWRkKCk7XHJcbiAgICB0aGlzLl9oYW5kbGVSZXNpemluZyA9IGhhbmRsZTtcclxuICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XHJcbiAgICB0aGlzLnJ6U3RhcnQuZW1pdCh0aGlzLmdldFJlc2l6aW5nRXZlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BSZXNpemUoKSB7XHJcbiAgICAvLyBSZW1vdmUgdGhlIGhlbHBlciBkaXY6XHJcbiAgICB0aGlzLl9oZWxwZXJCbG9jay5yZW1vdmUoKTtcclxuICAgIHRoaXMucnpTdG9wLmVtaXQodGhpcy5nZXRSZXNpemluZ0V2ZW50KCkpO1xyXG4gICAgdGhpcy5faGFuZGxlUmVzaXppbmcgPSBudWxsO1xyXG4gICAgdGhpcy5fZGlyZWN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuX29yaWdTaXplID0gbnVsbDtcclxuICAgIHRoaXMuX29yaWdQb3MgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5tZW50KSB7XHJcbiAgICAgIHRoaXMucmVzZXRCb3VuZGluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblJlc2l6aW5nKCkge1xyXG4gICAgdGhpcy5yelJlc2l6aW5nLmVtaXQodGhpcy5nZXRSZXNpemluZ0V2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemluZ0V2ZW50KCk6IElSZXNpemVFdmVudCB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBob3N0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgIGhhbmRsZTogdGhpcy5faGFuZGxlUmVzaXppbmcgPyB0aGlzLl9oYW5kbGVSZXNpemluZy5lbCA6IG51bGwsXHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICB3aWR0aDogdGhpcy5fY3VyclNpemUud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLl9jdXJyU2l6ZS5oZWlnaHRcclxuICAgICAgfSxcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICB0b3A6IHRoaXMuX2N1cnJQb3MueSxcclxuICAgICAgICBsZWZ0OiB0aGlzLl9jdXJyUG9zLnhcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRGlyZWN0aW9uKCkge1xyXG4gICAgdGhpcy5fZGlyZWN0aW9uID0ge1xyXG4gICAgICBuOiAhIXRoaXMuX2hhbmRsZVJlc2l6aW5nLnR5cGUubWF0Y2goL24vKSxcclxuICAgICAgczogISF0aGlzLl9oYW5kbGVSZXNpemluZy50eXBlLm1hdGNoKC9zLyksXHJcbiAgICAgIHc6ICEhdGhpcy5faGFuZGxlUmVzaXppbmcudHlwZS5tYXRjaCgvdy8pLFxyXG4gICAgICBlOiAhIXRoaXMuX2hhbmRsZVJlc2l6aW5nLnR5cGUubWF0Y2goL2UvKVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzaXplVG8ocDogUG9zaXRpb24pIHtcclxuICAgIHAuc3VidHJhY3QodGhpcy5fb3JpZ01vdXNlUG9zKTtcclxuXHJcbiAgICBjb25zdCB0bXBYID0gTWF0aC5yb3VuZChwLnggLyB0aGlzLl9ncmlkU2l6ZS54KSAqIHRoaXMuX2dyaWRTaXplLng7XHJcbiAgICBjb25zdCB0bXBZID0gTWF0aC5yb3VuZChwLnkgLyB0aGlzLl9ncmlkU2l6ZS55KSAqIHRoaXMuX2dyaWRTaXplLnk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RpcmVjdGlvbi5uKSB7XHJcbiAgICAgIC8vIG4sIG5lLCBud1xyXG4gICAgICB0aGlzLl9jdXJyUG9zLnkgPSB0aGlzLl9vcmlnUG9zLnkgKyB0bXBZO1xyXG4gICAgICB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPSB0aGlzLl9vcmlnU2l6ZS5oZWlnaHQgLSB0bXBZO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3Rpb24ucykge1xyXG4gICAgICAvLyBzLCBzZSwgc3dcclxuICAgICAgdGhpcy5fY3VyclNpemUuaGVpZ2h0ID0gdGhpcy5fb3JpZ1NpemUuaGVpZ2h0ICsgdG1wWTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGlyZWN0aW9uLmUpIHtcclxuICAgICAgLy8gZSwgbmUsIHNlXHJcbiAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gdGhpcy5fb3JpZ1NpemUud2lkdGggKyB0bXBYO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3Rpb24udykge1xyXG4gICAgICAvLyB3LCBudywgc3dcclxuICAgICAgdGhpcy5fY3VyclNpemUud2lkdGggPSB0aGlzLl9vcmlnU2l6ZS53aWR0aCAtIHRtcFg7XHJcbiAgICAgIHRoaXMuX2N1cnJQb3MueCA9IHRoaXMuX29yaWdQb3MueCArIHRtcFg7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGVja0JvdW5kcygpO1xyXG4gICAgdGhpcy5jaGVja1NpemUoKTtcclxuICAgIHRoaXMuYWRqdXN0QnlSYXRpbygpO1xyXG4gICAgdGhpcy5kb1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkb1Jlc2l6ZSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnaGVpZ2h0JywgdGhpcy5fY3VyclNpemUuaGVpZ2h0ICsgJ3B4Jyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ3dpZHRoJywgdGhpcy5fY3VyclNpemUud2lkdGggKyAncHgnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIHRoaXMuX2N1cnJQb3MueCArICdweCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICd0b3AnLCB0aGlzLl9jdXJyUG9zLnkgKyAncHgnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRqdXN0QnlSYXRpbygpIHtcclxuICAgIGlmICh0aGlzLl9hc3BlY3RSYXRpbykge1xyXG4gICAgICBpZiAodGhpcy5fZGlyZWN0aW9uLmUgfHwgdGhpcy5fZGlyZWN0aW9uLncpIHtcclxuICAgICAgICB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPSB0aGlzLl9jdXJyU2l6ZS53aWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gdGhpcy5fYXNwZWN0UmF0aW8gKiB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tCb3VuZHMoKSB7XHJcbiAgICBpZiAodGhpcy5fY29udGFpbm1lbnQpIHtcclxuICAgICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLl9ib3VuZGluZy53aWR0aCAtIHRoaXMuX2JvdW5kaW5nLnByIC0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQgLSB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVYO1xyXG4gICAgICBjb25zdCBtYXhIZWlnaHQgPSB0aGlzLl9ib3VuZGluZy5oZWlnaHQgLSB0aGlzLl9ib3VuZGluZy5wYiAtIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgLSB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVZO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbi5uICYmICh0aGlzLl9jdXJyUG9zLnkgKyB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVZKSA8IDApIHtcclxuICAgICAgICB0aGlzLl9jdXJyUG9zLnkgPSAtdGhpcy5fYm91bmRpbmcudHJhbnNsYXRlWTtcclxuICAgICAgICB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPSB0aGlzLl9vcmlnU2l6ZS5oZWlnaHQgKyB0aGlzLl9vcmlnUG9zLnkgKyB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVZO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlyZWN0aW9uLncgJiYgKHRoaXMuX2N1cnJQb3MueCArIHRoaXMuX2JvdW5kaW5nLnRyYW5zbGF0ZVgpIDwgMCkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJQb3MueCA9IC10aGlzLl9ib3VuZGluZy50cmFuc2xhdGVYO1xyXG4gICAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gdGhpcy5fb3JpZ1NpemUud2lkdGggKyB0aGlzLl9vcmlnUG9zLnggKyB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVYO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5fY3VyclNpemUud2lkdGggPiBtYXhXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gbWF4V2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tTaXplKCkge1xyXG4gICAgY29uc3QgbWluSGVpZ2h0ID0gIXRoaXMucnpNaW5IZWlnaHQgPyAxIDogdGhpcy5yek1pbkhlaWdodDtcclxuICAgIGNvbnN0IG1pbldpZHRoID0gIXRoaXMucnpNaW5XaWR0aCA/IDEgOiB0aGlzLnJ6TWluV2lkdGg7XHJcblxyXG4gICAgaWYgKHRoaXMuX2N1cnJTaXplLmhlaWdodCA8IG1pbkhlaWdodCkge1xyXG4gICAgICB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPSBtaW5IZWlnaHQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlyZWN0aW9uLm4pIHtcclxuICAgICAgICB0aGlzLl9jdXJyUG9zLnkgPSB0aGlzLl9vcmlnUG9zLnkgKyAodGhpcy5fb3JpZ1NpemUuaGVpZ2h0IC0gbWluSGVpZ2h0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jdXJyU2l6ZS53aWR0aCA8IG1pbldpZHRoKSB7XHJcbiAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gbWluV2lkdGg7XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlyZWN0aW9uLncpIHtcclxuICAgICAgICB0aGlzLl9jdXJyUG9zLnggPSB0aGlzLl9vcmlnUG9zLnggKyAodGhpcy5fb3JpZ1NpemUud2lkdGggLSBtaW5XaWR0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yek1heEhlaWdodCAmJiB0aGlzLl9jdXJyU2l6ZS5oZWlnaHQgPiB0aGlzLnJ6TWF4SGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMuX2N1cnJTaXplLmhlaWdodCA9IHRoaXMucnpNYXhIZWlnaHQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5fZGlyZWN0aW9uLm4pIHtcclxuICAgICAgICB0aGlzLl9jdXJyUG9zLnkgPSB0aGlzLl9vcmlnUG9zLnkgKyAodGhpcy5fb3JpZ1NpemUuaGVpZ2h0IC0gdGhpcy5yek1heEhlaWdodCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yek1heFdpZHRoICYmIHRoaXMuX2N1cnJTaXplLndpZHRoID4gdGhpcy5yek1heFdpZHRoKSB7XHJcbiAgICAgIHRoaXMuX2N1cnJTaXplLndpZHRoID0gdGhpcy5yek1heFdpZHRoO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbi53KSB7XHJcbiAgICAgICAgdGhpcy5fY3VyclBvcy54ID0gdGhpcy5fb3JpZ1Bvcy54ICsgKHRoaXMuX29yaWdTaXplLndpZHRoIC0gdGhpcy5yek1heFdpZHRoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRCb3VuZGluZygpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5fY29udGFpbm1lbnQ7XHJcbiAgICBjb25zdCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgIGlmIChjb21wdXRlZCkge1xyXG4gICAgICBsZXQgcCA9IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ3Bvc2l0aW9uJyk7XHJcblxyXG4gICAgICBjb25zdCBuYXRpdmVFbCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGxldCB0cmFuc2Zvcm1zID0gbmF0aXZlRWwuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykucmVwbGFjZSgvW14tXFxkLF0vZywgJycpLnNwbGl0KCcsJyk7XHJcblxyXG4gICAgICB0aGlzLl9ib3VuZGluZyA9IHt9O1xyXG4gICAgICB0aGlzLl9ib3VuZGluZy53aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xyXG4gICAgICB0aGlzLl9ib3VuZGluZy5oZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIHRoaXMuX2JvdW5kaW5nLnByID0gcGFyc2VJbnQoY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1yaWdodCcpLCAxMCk7XHJcbiAgICAgIHRoaXMuX2JvdW5kaW5nLnBiID0gcGFyc2VJbnQoY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKSwgMTApO1xyXG5cclxuICAgICAgaWYgKHRyYW5zZm9ybXMubGVuZ3RoID49IDYpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZGluZy50cmFuc2xhdGVYID0gcGFyc2VJbnQodHJhbnNmb3Jtc1s0XSwgMTApO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kaW5nLnRyYW5zbGF0ZVkgPSBwYXJzZUludCh0cmFuc2Zvcm1zWzVdLCAxMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fYm91bmRpbmcudHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm91bmRpbmcudHJhbnNsYXRlWSA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2JvdW5kaW5nLnBvc2l0aW9uID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKTtcclxuXHJcbiAgICAgIGlmIChwID09PSAnc3RhdGljJykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0Qm91bmRpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5fYm91bmRpbmcgJiYgdGhpcy5fYm91bmRpbmcucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY29udGFpbm1lbnQsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYm91bmRpbmcgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRHcmlkU2l6ZSgpIHtcclxuICAgIC8vIHNldCBkZWZhdWx0IHZhbHVlOlxyXG4gICAgdGhpcy5fZ3JpZFNpemUgPSB7IHg6IDEsIHk6IDEgfTtcclxuXHJcbiAgICBpZiAodGhpcy5yekdyaWQpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJ6R3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICB0aGlzLl9ncmlkU2l6ZSA9IHsgeDogdGhpcy5yekdyaWQsIHk6IHRoaXMucnpHcmlkIH07XHJcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnJ6R3JpZCkpIHtcclxuICAgICAgICB0aGlzLl9ncmlkU2l6ZSA9IHsgeDogdGhpcy5yekdyaWRbMF0sIHk6IHRoaXMucnpHcmlkWzFdIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2FuZ3VsYXItZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBbmd1bGFyUmVzaXphYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9hbmd1bGFyLXJlc2l6YWJsZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFuZ3VsYXJEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgQW5ndWxhclJlc2l6YWJsZURpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQW5ndWxhckRyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBBbmd1bGFyUmVzaXphYmxlRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckRyYWdnYWJsZU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBS0E7SUFDRSxrQkFBbUIsQ0FBUyxFQUFTLENBQVM7UUFBM0IsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7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

/***/ }),

/***/ "./node_modules/primeng/components/table/table.js":
/*!********************************************************!*\
  !*** ./node_modules/primeng/components/table/table.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var shared_1 = __webpack_require__(/*! ../common/shared */ "./node_modules/primeng/components/common/shared.js");
var paginator_1 = __webpack_require__(/*! ../paginator/paginator */ "./node_modules/primeng/components/paginator/paginator.js");
var domhandler_1 = __webpack_require__(/*! ../dom/domhandler */ "./node_modules/primeng/components/dom/domhandler.js");
var objectutils_1 = __webpack_require__(/*! ../utils/objectutils */ "./node_modules/primeng/components/utils/objectutils.js");
var core_2 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var TableService = /** @class */ (function () {
    function TableService() {
        this.sortSource = new rxjs_1.Subject();
        this.selectionSource = new rxjs_1.Subject();
        this.contextMenuSource = new rxjs_1.Subject();
        this.valueSource = new rxjs_1.Subject();
        this.totalRecordsSource = new rxjs_1.Subject();
        this.columnsSource = new rxjs_1.Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
    }
    TableService.prototype.onSort = function (sortMeta) {
        this.sortSource.next(sortMeta);
    };
    TableService.prototype.onSelectionChange = function () {
        this.selectionSource.next();
    };
    TableService.prototype.onContextMenu = function (data) {
        this.contextMenuSource.next(data);
    };
    TableService.prototype.onValueChange = function (value) {
        this.valueSource.next(value);
    };
    TableService.prototype.onTotalRecordsChange = function (value) {
        this.totalRecordsSource.next(value);
    };
    TableService.prototype.onColumnsChange = function (columns) {
        this.columnsSource.next(columns);
    };
    TableService = __decorate([
        core_2.Injectable()
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
var Table = /** @class */ (function () {
    function Table(el, domHandler, objectUtils, zone, tableService) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.tableService = tableService;
        this.first = 0;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionChange = new core_1.EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.rowTrackBy = function (index, item) { return item; };
        this.lazy = false;
        this.lazyLoadOnInit = true;
        this.compareSelectionBy = 'deepEquals';
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.filters = {};
        this.filterDelay = 300;
        this.expandedRowKeys = {};
        this.rowExpandMode = 'multiple';
        this.virtualScrollDelay = 500;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
        this.onLazyLoad = new core_1.EventEmitter();
        this.onRowExpand = new core_1.EventEmitter();
        this.onRowCollapse = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.onRowReorder = new core_1.EventEmitter();
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.onHeaderCheckboxToggle = new core_1.EventEmitter();
        this.sortFunction = new core_1.EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this.selectionKeys = {};
        this._sortOrder = 1;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toString().toLowerCase();
                return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
            },
            equals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() === filter.getTime();
                else
                    return value.toString().toLowerCase() == filter.toString().toLowerCase();
            },
            notEquals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return false;
                }
                if (value === undefined || value === null) {
                    return true;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() !== filter.getTime();
                else
                    return value.toString().toLowerCase() != filter.toString().toLowerCase();
            },
            in: function (value, filter) {
                if (filter === undefined || filter === null || filter.length === 0) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === value || (value.getTime && filter[i].getTime && value.getTime() === filter[i].getTime())) {
                        return true;
                    }
                }
                return false;
            },
            lt: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() < filter.getTime();
                else
                    return value < filter;
            },
            lte: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() <= filter.getTime();
                else
                    return value <= filter;
            },
            gt: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() > filter.getTime();
                else
                    return value > filter;
            },
            gte: function (value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                if (value.getTime && filter.getTime)
                    return value.getTime() >= filter.getTime();
                else
                    return value >= filter;
            }
        };
    }
    Table.prototype.ngOnInit = function () {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    Table.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'caption':
                    _this.captionTemplate = item.template;
                    break;
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'summary':
                    _this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    _this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    _this.expandedRowTemplate = item.template;
                    break;
                case 'frozenrows':
                    _this.frozenRowsTemplate = item.template;
                    break;
                case 'frozenheader':
                    _this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    _this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    _this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    _this.frozenColGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(Table.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter())
                    this._filter();
            }
            if (this.virtualScroll && this.virtualScrollCallback) {
                this.virtualScrollCallback();
            }
            this.tableService.onValueChange(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (cols) {
            this._columns = cols;
            this.tableService.onColumnsChange(cols);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.tableService.onTotalRecordsChange(this._totalRecords);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.updateSelectionKeys = function () {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (var _i = 0, _a = this._selection; _i < _a.length; _i++) {
                    var data = _a[_i];
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    };
    Table.prototype.onPageChange = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.tableService.onValueChange(this.value);
    };
    Table.prototype.sort = function (event) {
        var originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            var sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
    };
    Table.prototype.sortSingle = function () {
        var _this = this;
        if (this.sortField && this.sortOrder) {
            if (this.resetPageOnSort) {
                this.first = 0;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        var value1 = _this.objectUtils.resolveFieldData(data1, _this.sortField);
                        var value2 = _this.objectUtils.resolveFieldData(data2, _this.sortField);
                        var result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        return (_this.sortOrder * result);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            var sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    };
    Table.prototype.sortMultiple = function () {
        var _this = this;
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    };
    Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    Table.prototype.getSortMeta = function (field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (var i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    };
    Table.prototype.isSorted = function (field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    Table.prototype.handleRowClick = function (event) {
        var targetNode = event.originalEvent.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                var rowData = event.rowData;
                var selected = this.isSelected(rowData);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;
                if (metaSelection) {
                    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = this.selection.concat([rowData]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? this.selection.concat([rowData]) : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
        }
        this.rowTouched = false;
    };
    Table.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    Table.prototype.handleRowRightClick = function (event) {
        if (this.contextMenu) {
            var rowData = event.rowData;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                var selected = this.isSelected(rowData);
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [rowData];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
            }
        }
    };
    Table.prototype.selectRange = function (event, rowIndex) {
        var rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        for (var i = rangeStart; i <= rangeEnd; i++) {
            var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = this.selection.concat([rangeRowData]);
                var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            }
        }
        this.selectionChange.emit(this.selection);
    };
    Table.prototype.clearSelectionRange = function (event) {
        var rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        var _loop_1 = function (i) {
            var rangeRowData = this_1.value[i];
            var selectionIndex = this_1.findIndexInSelection(rangeRowData);
            this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
            var dataKeyValue = this_1.dataKey ? String(this_1.objectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
            if (dataKeyValue) {
                delete this_1.selectionKeys[dataKeyValue];
            }
            this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        };
        var this_1 = this;
        for (var i = rangeStart; i <= rangeEnd; i++) {
            _loop_1(i);
        }
    };
    Table.prototype.isSelected = function (rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    };
    Table.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection && this.selection.length) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Table.prototype.toggleRowWithRadio = function (event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
    };
    Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
        this.selection = this.selection || [];
        var selected = this.isSelected(rowData);
        var dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            var selectionIndex_3 = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? this.selection.concat([rowData]) : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
    };
    Table.prototype.toggleRowsWithCheckbox = function (event, check) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    };
    Table.prototype.equals = function (data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    };
    Table.prototype.filter = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(function () {
            _this._filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    Table.prototype.filterGlobal = function (value, matchMode) {
        this.filter(value, 'global', matchMode);
    };
    Table.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    Table.prototype._filter = function () {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                var globalFilterFieldsArray = void 0;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (var i = 0; i < this.value.length; i++) {
                    var localMatch = true;
                    var globalMatch = false;
                    var localFiltered = false;
                    for (var prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            var filterMeta = this.filters[prop];
                            var filterField = prop;
                            var filterValue = filterMeta.value;
                            var filterMatchMode = filterMeta.matchMode || 'startsWith';
                            var dataFieldValue = this.objectUtils.resolveFieldData(this.value[i], filterField);
                            var filterConstraint = this.filterConstraints[filterMatchMode];
                            if (!filterConstraint(dataFieldValue, filterValue)) {
                                localMatch = false;
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                            var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    var matches = void 0;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
    };
    Table.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    Table.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    };
    Table.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredValue = null;
        this.filters = {};
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    };
    Table.prototype.exportCSV = function (options) {
        var _this = this;
        var data = this.filteredValue || this.value;
        var csv = '\ufeff';
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                var column = _this.columns[i_1];
                if (column.exportable !== false && column.field) {
                    var cellData = _this.objectUtils.resolveFieldData(record, column.field);
                    if (cellData != null) {
                        if (_this.exportFunction) {
                            cellData = _this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';
                    csv += '"' + cellData + '"';
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    Table.prototype.closeCellEdit = function () {
        this.domHandler.removeClass(this.editingCell, 'ui-editing-cell');
        this.editingCell = null;
    };
    Table.prototype.toggleRow = function (rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        var dataKeyValue = String(this.objectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = 1;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
    };
    Table.prototype.isRowExpanded = function (rowData) {
        return this.expandedRowKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] === 1;
    };
    Table.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    Table.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    Table.prototype.onColumnResizeBegin = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        event.preventDefault();
    };
    Table.prototype.onColumnResize = function (event) {
        var containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    };
    Table.prototype.onColumnResizeEnd = function (event, column) {
        var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        var columnWidth = column.offsetWidth;
        var minWidth = parseInt(column.style.minWidth || 15);
        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }
        var newColumnWidth = columnWidth + delta;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            var scrollableView = this.findParentScrollableView(column);
                            var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                            var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                            var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                            var resizeColumnIndex = this.domHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    var scrollableView = this.findParentScrollableView(column);
                    var scrollableBodyTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                    var scrollableHeaderTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                    var scrollableFooterTable = this.domHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    }
                    var resizeColumnIndex = this.domHandler.index(column);
                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    var containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        this.domHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    };
    Table.prototype.findParentScrollableView = function (column) {
        if (column) {
            var parent_1 = column.parentElement;
            while (parent_1 && !this.domHandler.hasClass(parent_1, 'ui-table-scrollable-view')) {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
        else {
            return null;
        }
    };
    Table.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                var col = colGroup.children[resizeColumnIndex];
                var nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    };
    Table.prototype.onColumnDragStart = function (event, columnElement) {
        this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onColumnDragEnter = function (event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
            var dropHeaderOffset = this.domHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    Table.prototype.onColumnDragLeave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    };
    Table.prototype.onColumnDrop = function (event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            var dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    Table.prototype.onRowDragStart = function (event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onRowDragOver = function (event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            var rowY = this.domHandler.getOffset(rowElement).top + this.domHandler.getWindowScrollTop();
            var pageY = event.pageY;
            var rowMidY = rowY + this.domHandler.getOuterHeight(rowElement) / 2;
            var prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    this.domHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                this.droppedRowIndex = index + 1;
                this.domHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    };
    Table.prototype.onRowDragLeave = function (event, rowElement) {
        var prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    };
    Table.prototype.onRowDragEnd = function (event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    };
    Table.prototype.onRowDrop = function (event, rowElement) {
        if (this.droppedRowIndex != null) {
            var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            this.objectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: this.droppedRowIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    };
    Table.prototype.handleVirtualScroll = function (event) {
        var _this = this;
        this.first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        this.zone.run(function () {
            if (_this.virtualScrollTimer) {
                clearTimeout(_this.virtualScrollTimer);
            }
            _this.virtualScrollTimer = setTimeout(function () {
                _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
            }, _this.virtualScrollDelay);
        });
    };
    Table.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    Table.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Table.prototype.ngOnDestroy = function () {
        this.editingCell = null;
        this.initialized = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "frozenColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "frozenValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "tableStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "tableStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "first", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "paginatorPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "defaultSortOrder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "resetPageOnSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "contextMenuSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "contextMenuSelectionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "contextMenuSelectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "metaKeySelection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], Table.prototype, "rowTrackBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "lazy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "lazyLoadOnInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "compareSelectionBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "csvSeparator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "exportFilename", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "filters", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Table.prototype, "globalFilterFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "expandedRowKeys", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "rowExpandMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "virtualScroll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "virtualScrollDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Table.prototype, "virtualRowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "frozenWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Table.prototype, "loadingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "rowHover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "customSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Table.prototype, "autoLayout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Table.prototype, "exportFunction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onFilter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowExpand", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowCollapse", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onColResize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onRowReorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Table.prototype, "sortFunction", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('resizeHelper'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "resizeHelperViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorUp'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "reorderIndicatorUpViewChild", void 0);
    __decorate([
        core_1.ViewChild('reorderIndicatorDown'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "reorderIndicatorDownViewChild", void 0);
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", core_1.ElementRef)
    ], Table.prototype, "tableViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Table.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Table.prototype, "totalRecords", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Table.prototype, "sortField", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Table.prototype, "sortOrder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Table.prototype, "multiSortMeta", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Table.prototype, "selection", null);
    Table = __decorate([
        core_1.Component({
            selector: 'p-table',
            template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,\n                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}\">\n            <div class=\"ui-table-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-table-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-table-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-table-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            \n            <div class=\"ui-table-wrapper\" *ngIf=\"!scrollable\">\n                <table #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                    <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                </table>\n            </div>\n\n            <div class=\"ui-table-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-table-scrollable-view ui-table-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [pScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-table-scrollable-view\" [pScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\"></div>\n            </div>\n            \n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div *ngIf=\"summaryTemplate\" class=\"ui-table-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, TableService]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, objectutils_1.ObjectUtils, core_1.NgZone, TableService])
    ], Table);
    return Table;
}());
exports.Table = Table;
var TableBody = /** @class */ (function () {
    function TableBody(dt) {
        this.dt = dt;
    }
    __decorate([
        core_1.Input("pTableBody"),
        __metadata("design:type", Array)
    ], TableBody.prototype, "columns", void 0);
    __decorate([
        core_1.Input("pTableBodyTemplate"),
        __metadata("design:type", core_1.TemplateRef)
    ], TableBody.prototype, "template", void 0);
    TableBody = __decorate([
        core_1.Component({
            selector: '[pTableBody]',
            template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData)}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns}\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [Table])
    ], TableBody);
    return TableBody;
}());
exports.TableBody = TableBody;
var ScrollableView = /** @class */ (function () {
    function ScrollableView(dt, el, domHandler, zone) {
        var _this = this;
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
        this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                }, 50);
            });
        });
        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        this.initialized = false;
    }
    Object.defineProperty(ScrollableView.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        set: function (val) {
            this._scrollHeight = val;
            this.setScrollHeight();
        },
        enumerable: true,
        configurable: true
    });
    ScrollableView.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.setScrollHeight();
            this.initialized = true;
        }
    };
    ScrollableView.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                this.domHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
            }
            if (this.dt.frozenWidth) {
                this.el.nativeElement.style.left = this.dt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.dt.frozenWidth + ')';
            }
            var frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = this.domHandler.findSingle(frozenView, '.ui-table-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.marginBottom = this.domHandler.calculateScrollbarWidth() + 'px';
            var scrollableView = this.el.nativeElement.nextElementSibling;
            if (scrollableView) {
                this.scrollableSiblingBody = this.domHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
            }
        }
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (this.frozen) {
            this.columnsSubscription = this.dt.tableService.columnsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setScrollHeight();
                    }, 50);
                });
            });
        }
        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
        }
    };
    ScrollableView.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollBarWidth = _this.domHandler.calculateScrollbarWidth();
            if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                _this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
            }
            if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
            }
            if (!_this.frozen) {
                _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
            }
        });
    };
    ScrollableView.prototype.unbindEvents = function () {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    };
    ScrollableView.prototype.onHeaderScroll = function (event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    };
    ScrollableView.prototype.onFooterScroll = function (event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    };
    ScrollableView.prototype.onBodyScroll = function (event) {
        var _this = this;
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
        if (this.dt.virtualScroll) {
            var viewport = this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            var tableHeight = this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            var pageHeight_1 = this.dt.virtualRowHeight * this.dt.rows;
            var virtualTableHeight = this.domHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            var pageCount = (virtualTableHeight / pageHeight_1) || 1;
            var scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';
            if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                var page_1 = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.dt.handleVirtualScroll({
                    page: page_1,
                    callback: function () {
                        _this.scrollTableViewChild.nativeElement.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                        if (_this.frozenSiblingBody) {
                            _this.frozenSiblingBody.children[0].style.top = _this.scrollTableViewChild.nativeElement.style.top;
                        }
                    }
                });
            }
        }
    };
    ScrollableView.prototype.setScrollHeight = function () {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                var containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                var relativeHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                var scrollBodyHeight = (relativeHeight - staticHeight);
                if (this.frozen) {
                    scrollBodyHeight -= this.domHandler.calculateScrollbarWidth();
                }
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if (this.frozen && this.scrollableSiblingBody && this.domHandler.getOuterWidth(this.scrollableSiblingBody) < this.domHandler.getOuterWidth(this.scrollableSiblingBody.children[0]))
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - this.domHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    };
    ScrollableView.prototype.setVirtualScrollerHeight = function () {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    };
    ScrollableView.prototype.hasVerticalOverflow = function () {
        return this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    };
    ScrollableView.prototype.alignScrollBar = function () {
        if (!this.frozen) {
            var scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    };
    ScrollableView.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        this.initialized = false;
    };
    __decorate([
        core_1.Input("pScrollableView"),
        __metadata("design:type", Array)
    ], ScrollableView.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ScrollableView.prototype, "frozen", void 0);
    __decorate([
        core_1.ViewChild('scrollHeader'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollHeaderBox'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollBody'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollTable'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooter'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        core_1.ViewChild('scrollFooterBox'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        core_1.ViewChild('virtualScroller'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableView.prototype, "virtualScrollerViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ScrollableView.prototype, "scrollHeight", null);
    ScrollableView = __decorate([
        core_1.Component({
            selector: '[pScrollableView]',
            template: "\n        <div #scrollHeader class=\"ui-table-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-table-scrollable-header-box\">\n                <table class=\"ui-table-scrollable-header-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\">\n                        <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"dt.frozenValue\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                            <ng-container *ngTemplateOutlet=\"dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}\"></ng-container>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-table-scrollable-body\">\n            <table #scrollTable [ngClass]=\"{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}\" [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate\"></tbody>\n            </table>\n            <div #virtualScroller class=\"ui-table-virtual-scroller\"></div>\n        </div>\n        <div #scrollFooter *ngIf=\"dt.footerTemplate\" class=\"ui-table-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-table-scrollable-footer-box\">\n                <table class=\"ui-table-scrollable-footer-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ScrollableView);
    return ScrollableView;
}());
exports.ScrollableView = ScrollableView;
var SortableColumn = /** @class */ (function () {
    function SortableColumn(dt, domHandler) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
    }
    SortableColumn.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    };
    SortableColumn.prototype.updateSortState = function () {
        this.sorted = this.dt.isSorted(this.field);
    };
    SortableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            this.domHandler.clearSelection();
        }
    };
    SortableColumn.prototype.isEnabled = function () {
        return this.pSortableColumnDisabled !== true;
    };
    SortableColumn.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSortableColumn"),
        __metadata("design:type", String)
    ], SortableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SortableColumn.prototype, "pSortableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], SortableColumn.prototype, "onClick", null);
    SortableColumn = __decorate([
        core_1.Directive({
            selector: '[pSortableColumn]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-sortable-column]': 'isEnabled()',
                '[class.ui-state-highlight]': 'sorted'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler])
    ], SortableColumn);
    return SortableColumn;
}());
exports.SortableColumn = SortableColumn;
var SortIcon = /** @class */ (function () {
    function SortIcon(dt) {
        var _this = this;
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    SortIcon.prototype.ngOnInit = function () {
        this.updateSortState();
    };
    SortIcon.prototype.onClick = function (event) {
        event.preventDefault();
    };
    SortIcon.prototype.updateSortState = function () {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            var sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    };
    Object.defineProperty(SortIcon.prototype, "ariaText", {
        get: function () {
            var text;
            switch (this.sortOrder) {
                case 1:
                    text = this.ariaLabelAsc;
                    break;
                case -1:
                    text = this.ariaLabelDesc;
                    break;
                default:
                    text = this.ariaLabel;
                    break;
            }
            return text;
        },
        enumerable: true,
        configurable: true
    });
    SortIcon.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabelDesc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SortIcon.prototype, "ariaLabelAsc", void 0);
    SortIcon = __decorate([
        core_1.Component({
            selector: 'p-sortIcon',
            template: "\n        <a href=\"#\" (click)=\"onClick($event)\" [attr.aria-label]=\"ariaText\" class=\"ui-table-sort-icon\">\n            <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n        </a>\n    "
        }),
        __metadata("design:paramtypes", [Table])
    ], SortIcon);
    return SortIcon;
}());
exports.SortIcon = SortIcon;
var SelectableRow = /** @class */ (function () {
    function SelectableRow(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRow.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRow.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRow.prototype.onTouchEnd = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    };
    SelectableRow.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSelectableRow"),
        __metadata("design:type", Object)
    ], SelectableRow.prototype, "data", void 0);
    __decorate([
        core_1.Input("pSelectableRowIndex"),
        __metadata("design:type", Number)
    ], SelectableRow.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectableRow.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRow.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRow.prototype, "onTouchEnd", null);
    SelectableRow = __decorate([
        core_1.Directive({
            selector: '[pSelectableRow]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], SelectableRow);
    return SelectableRow;
}());
exports.SelectableRow = SelectableRow;
var SelectableRowDblClick = /** @class */ (function () {
    function SelectableRowDblClick(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRowDblClick.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRowDblClick.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRowDblClick.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRowDblClick.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pSelectableRowDblClick"),
        __metadata("design:type", Object)
    ], SelectableRowDblClick.prototype, "data", void 0);
    __decorate([
        core_1.Input("pSelectableRowIndex"),
        __metadata("design:type", Number)
    ], SelectableRowDblClick.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectableRowDblClick.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('dblclick', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], SelectableRowDblClick.prototype, "onClick", null);
    SelectableRowDblClick = __decorate([
        core_1.Directive({
            selector: '[pSelectableRowDblClick]',
            providers: [domhandler_1.DomHandler],
            host: {
                '[class.ui-state-highlight]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], SelectableRowDblClick);
    return SelectableRowDblClick;
}());
exports.SelectableRowDblClick = SelectableRowDblClick;
var ContextMenuRow = /** @class */ (function () {
    function ContextMenuRow(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                _this.selected = _this.dt.equals(_this.data, data);
            });
        }
    }
    ContextMenuRow.prototype.onContextMenu = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data
            });
            event.preventDefault();
        }
    };
    ContextMenuRow.prototype.isEnabled = function () {
        return this.pContextMenuRowDisabled !== true;
    };
    ContextMenuRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input("pContextMenuRow"),
        __metadata("design:type", Object)
    ], ContextMenuRow.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextMenuRow.prototype, "pContextMenuRowDisabled", void 0);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ContextMenuRow.prototype, "onContextMenu", null);
    ContextMenuRow = __decorate([
        core_1.Directive({
            selector: '[pContextMenuRow]',
            host: {
                '[class.ui-contextmenu-selected]': 'selected'
            }
        }),
        __metadata("design:paramtypes", [Table, TableService])
    ], ContextMenuRow);
    return ContextMenuRow;
}());
exports.ContextMenuRow = ContextMenuRow;
var RowToggler = /** @class */ (function () {
    function RowToggler(dt) {
        this.dt = dt;
    }
    RowToggler.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    };
    RowToggler.prototype.isEnabled = function () {
        return this.pRowTogglerDisabled !== true;
    };
    __decorate([
        core_1.Input('pRowToggler'),
        __metadata("design:type", Object)
    ], RowToggler.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RowToggler.prototype, "pRowTogglerDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], RowToggler.prototype, "onClick", null);
    RowToggler = __decorate([
        core_1.Directive({
            selector: '[pRowToggler]'
        }),
        __metadata("design:paramtypes", [Table])
    ], RowToggler);
    return RowToggler;
}());
exports.RowToggler = RowToggler;
var ResizableColumn = /** @class */ (function () {
    function ResizableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ResizableColumn.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(function () {
                _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
            });
        }
    };
    ResizableColumn.prototype.bindDocumentEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
            document.addEventListener('mousemove', _this.documentMouseMoveListener);
            _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
            document.addEventListener('mouseup', _this.documentMouseUpListener);
        });
    };
    ResizableColumn.prototype.unbindDocumentEvents = function () {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    };
    ResizableColumn.prototype.onMouseDown = function (event) {
        this.dt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    };
    ResizableColumn.prototype.onDocumentMouseMove = function (event) {
        this.dt.onColumnResize(event);
    };
    ResizableColumn.prototype.onDocumentMouseUp = function (event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    };
    ResizableColumn.prototype.isEnabled = function () {
        return this.pResizableColumnDisabled !== true;
    };
    ResizableColumn.prototype.ngOnDestroy = function () {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ResizableColumn.prototype, "pResizableColumnDisabled", void 0);
    ResizableColumn = __decorate([
        core_1.Directive({
            selector: '[pResizableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ResizableColumn);
    return ResizableColumn;
}());
exports.ResizableColumn = ResizableColumn;
var ReorderableColumn = /** @class */ (function () {
    function ReorderableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ReorderableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    };
    ReorderableColumn.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragOverListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragEnterListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableColumn.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableColumn.prototype.onMouseDown = function (event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || this.domHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    };
    ReorderableColumn.prototype.onDragStart = function (event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    ReorderableColumn.prototype.onDragEnter = function (event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragLeave = function (event) {
        this.dt.onColumnDragLeave(event);
    };
    ReorderableColumn.prototype.onDrop = function (event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    };
    ReorderableColumn.prototype.isEnabled = function () {
        return this.pReorderableColumnDisabled !== true;
    };
    ReorderableColumn.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ReorderableColumn.prototype, "pReorderableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReorderableColumn.prototype, "onDrop", null);
    ReorderableColumn = __decorate([
        core_1.Directive({
            selector: '[pReorderableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ReorderableColumn);
    return ReorderableColumn;
}());
exports.ReorderableColumn = ReorderableColumn;
var EditableColumn = /** @class */ (function () {
    function EditableColumn(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    EditableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    };
    EditableColumn.prototype.isValid = function () {
        return (this.dt.editingCell && this.domHandler.find(this.dt.editingCell, '.ng-invalid.ng-dirty').length === 0);
    };
    EditableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.isValid()) {
                        return;
                    }
                    this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    };
    EditableColumn.prototype.openCell = function () {
        var _this = this;
        this.dt.editingCell = this.el.nativeElement;
        this.domHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                var focusable = _this.domHandler.findSingle(_this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    };
    EditableColumn.prototype.closeEditingCell = function () {
        this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
        this.dt.editingCell = null;
    };
    EditableColumn.prototype.onKeyDown = function (event) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.isValid()) {
                    this.closeEditingCell();
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 27) {
                if (this.isValid()) {
                    this.closeEditingCell();
                    this.dt.onEditCancel.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            else if (event.keyCode == 9) {
                this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    };
    EditableColumn.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && !this.domHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.isEnabled = function () {
        return this.pEditableColumnDisabled !== true;
    };
    __decorate([
        core_1.Input("pEditableColumn"),
        __metadata("design:type", Object)
    ], EditableColumn.prototype, "data", void 0);
    __decorate([
        core_1.Input("pEditableColumnField"),
        __metadata("design:type", Object)
    ], EditableColumn.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditableColumn.prototype, "pEditableColumnDisabled", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], EditableColumn.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], EditableColumn.prototype, "onKeyDown", null);
    EditableColumn = __decorate([
        core_1.Directive({
            selector: '[pEditableColumn]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], EditableColumn);
    return EditableColumn;
}());
exports.EditableColumn = EditableColumn;
var CellEditor = /** @class */ (function () {
    function CellEditor(dt, editableColumn) {
        this.dt = dt;
        this.editableColumn = editableColumn;
    }
    CellEditor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'input':
                    _this.inputTemplate = item.template;
                    break;
                case 'output':
                    _this.outputTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], CellEditor.prototype, "templates", void 0);
    CellEditor = __decorate([
        core_1.Component({
            selector: 'p-cellEditor',
            template: "\n        <ng-container *ngIf=\"dt.editingCell === editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!dt.editingCell || dt.editingCell !== editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [Table, EditableColumn])
    ], CellEditor);
    return CellEditor;
}());
exports.CellEditor = CellEditor;
var TableRadioButton = /** @class */ (function () {
    function TableRadioButton(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableRadioButton.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableRadioButton.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        this.domHandler.clearSelection();
    };
    TableRadioButton.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableRadioButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TableRadioButton.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableRadioButton.prototype, "index", void 0);
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableRadioButton.prototype, "boxViewChild", void 0);
    TableRadioButton = __decorate([
        core_1.Component({
            selector: 'p-tableRadioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableRadioButton);
    return TableRadioButton;
}());
exports.TableRadioButton = TableRadioButton;
var TableCheckbox = /** @class */ (function () {
    function TableCheckbox(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableCheckbox.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        this.domHandler.clearSelection();
    };
    TableCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TableCheckbox.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableCheckbox.prototype, "index", void 0);
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableCheckbox.prototype, "boxViewChild", void 0);
    TableCheckbox = __decorate([
        core_1.Component({
            selector: 'p-tableCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableCheckbox);
    return TableCheckbox;
}());
exports.TableCheckbox = TableCheckbox;
var TableHeaderCheckbox = /** @class */ (function () {
    function TableHeaderCheckbox(dt, domHandler, tableService) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.tableService = tableService;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
    }
    TableHeaderCheckbox.prototype.ngOnInit = function () {
        this.checked = this.updateCheckedState();
    };
    TableHeaderCheckbox.prototype.onClick = function (event, checked) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !checked);
            }
        }
        this.domHandler.clearSelection();
    };
    TableHeaderCheckbox.prototype.onFocus = function () {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.onBlur = function () {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.isDisabled = function () {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    };
    TableHeaderCheckbox.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TableHeaderCheckbox.prototype.updateCheckedState = function () {
        var val = this.dt.filteredValue || this.dt.value;
        return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
    };
    __decorate([
        core_1.ViewChild('box'),
        __metadata("design:type", core_1.ElementRef)
    ], TableHeaderCheckbox.prototype, "boxViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableHeaderCheckbox.prototype, "disabled", void 0);
    TableHeaderCheckbox = __decorate([
        core_1.Component({
            selector: 'p-tableHeaderCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event, cb.checked)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"isDisabled()\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [Table, domhandler_1.DomHandler, TableService])
    ], TableHeaderCheckbox);
    return TableHeaderCheckbox;
}());
exports.TableHeaderCheckbox = TableHeaderCheckbox;
var ReorderableRowHandle = /** @class */ (function () {
    function ReorderableRowHandle(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    ReorderableRowHandle.prototype.ngAfterViewInit = function () {
        this.domHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
    };
    __decorate([
        core_1.Input("pReorderableRowHandle"),
        __metadata("design:type", Number)
    ], ReorderableRowHandle.prototype, "index", void 0);
    ReorderableRowHandle = __decorate([
        core_1.Directive({
            selector: '[pReorderableRowHandle]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
    ], ReorderableRowHandle);
    return ReorderableRowHandle;
}());
exports.ReorderableRowHandle = ReorderableRowHandle;
var ReorderableRow = /** @class */ (function () {
    function ReorderableRow(dt, el, domHandler, zone) {
        this.dt = dt;
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
    }
    ReorderableRow.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    };
    ReorderableRow.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragEndListener = _this.onDragEnd.bind(_this);
            _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
            _this.dragOverListener = _this.onDragOver.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableRow.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableRow.prototype.onMouseDown = function (event) {
        if (this.domHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragStart = function (event) {
        this.dt.onRowDragStart(event, this.index);
    };
    ReorderableRow.prototype.onDragEnd = function (event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragOver = function (event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    };
    ReorderableRow.prototype.onDragLeave = function (event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    };
    ReorderableRow.prototype.isEnabled = function () {
        return this.pReorderableRowDisabled !== true;
    };
    ReorderableRow.prototype.onDrop = function (event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    };
    __decorate([
        core_1.Input("pReorderableRow"),
        __metadata("design:type", Number)
    ], ReorderableRow.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReorderableRow.prototype, "onDrop", null);
    ReorderableRow = __decorate([
        core_1.Directive({
            selector: '[pReorderableRow]'
        }),
        __metadata("design:paramtypes", [Table, core_1.ElementRef, domhandler_1.DomHandler, core_1.NgZone])
    ], ReorderableRow);
    return ReorderableRow;
}());
exports.ReorderableRow = ReorderableRow;
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, paginator_1.PaginatorModule],
            exports: [Table, shared_1.SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick],
            declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick]
        })
    ], TableModule);
    return TableModule;
}());
exports.TableModule = TableModule;
//# sourceMappingURL=table.js.map

/***/ }),

/***/ "./node_modules/primeng/table.js":
/*!***************************************!*\
  !*** ./node_modules/primeng/table.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Shorthand */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./components/table/table */ "./node_modules/primeng/components/table/table.js"));

/***/ }),

/***/ "./src/app/compute-design/compute-design.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/compute-design/compute-design.module.ts ***!
  \*********************************************************/
/*! exports provided: ComputeDesignModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputeDesignModule", function() { return ComputeDesignModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _tools_tools_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/tools.component */ "./src/app/compute-design/tools/tools.component.ts");
/* harmony import */ var _design_panel_design_panel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./design-panel/design-panel.component */ "./src/app/compute-design/design-panel/design-panel.component.ts");
/* harmony import */ var angular2_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-draggable */ "./node_modules/angular2-draggable/fesm5/angular2-draggable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ComputeDesignModule = /** @class */ (function () {
    function ComputeDesignModule() {
    }
    ComputeDesignModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], angular2_draggable__WEBPACK_IMPORTED_MODULE_4__["AngularDraggableModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], primeng_dialog__WEBPACK_IMPORTED_MODULE_6__["DialogModule"]
            ],
            declarations: [_tools_tools_component__WEBPACK_IMPORTED_MODULE_2__["ToolsComponent"], _design_panel_design_panel_component__WEBPACK_IMPORTED_MODULE_3__["DesignPanelComponent"]],
            exports: [_design_panel_design_panel_component__WEBPACK_IMPORTED_MODULE_3__["DesignPanelComponent"]]
        })
    ], ComputeDesignModule);
    return ComputeDesignModule;
}());



/***/ }),

/***/ "./src/app/compute-design/design-panel/design-panel.component.css":
/*!************************************************************************!*\
  !*** ./src/app/compute-design/design-panel/design-panel.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input,button,select {\r\n  margin: 5px;\r\n  height: 40px;\r\n  float: left;\r\n}\r\n\r\n\r\n.selected{\r\n  border: 2px solid #005cbf;\r\n}\r\n"

/***/ }),

/***/ "./src/app/compute-design/design-panel/design-panel.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/compute-design/design-panel/design-panel.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-2\">\n    <app-tools (removed)=\"display=true;showRemoveConfirm()\" (refreshed)=\"refresh()\"\n               (buttonSelected)=\"buttonSelected($event)\"\n               [computeButtons]=\"computeButtonsInTools\"></app-tools>\n\n  </div>\n  <div class=\"col-md-10\" #myBounds>\n    <ng-template ngFor let-computeButton [ngForOf]=\"computeButtonsInDesign\" let-i=\"index\">\n      <button (click)=\"select(computeButton)\" [class.selected]=\"computeButton.isSelected\"\n              *ngIf=\"computeButton.type==BetweenButtonType.And\n|| computeButton.type==BetweenButtonType.end\n|| computeButton.type==BetweenButtonType.Or\n|| computeButton.type==BetweenButtonType.start\n|| computeButton.type==constButtonType.notNull\" style=\"float: left;\" type=\"button\" class=\"btn btn-light\"\n      >{{computeButton.name}}\n      </button>\n\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==InputButtonType.text\">\n        <input [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\n               type=\"text\">\n      </div>\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==InputButtonType.number\">\n        <input [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\n               type=\"number\">\n      </div>\n\n\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==SelectButtonType.many\n|| computeButton.type==SelectButtonType.one\n|| computeButton.type==SelectButtonType.multi\">\n        <select [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\n                [attr.multiple]=\"computeButton.type==SelectButtonType.multi ? 'multe' : null\">\n          <ng-template ngFor let-keyValue [ngForOf]=\"computeButton.possibleValue\">\n            <option [value]=\"keyValue.value\">{{keyValue.name}}</option>\n          </ng-template>\n        </select>\n      </div>\n\n\n    </ng-template>\n  </div>\n</div>\n\n<!--(dragover)=\"dragOver(computeButton)\"\n                [inBounds]=\"inBounds\" ngDraggable [position]=\"computeButton.position\"\n                [bounds]=\"myBounds\"-->\n\n\n<p-dialog [(visible)]=\"display\">\n  <p-header>\n    تاکید عملیات\n  </p-header>\n\n  <p>آیا از حذف این {{toRemoveCount}} مورد اطمینان دارید ؟</p>\n\n  <p-footer>\n    <button type=\"button\" (click)=\"remove();display=false\" class=\"btn btn-dark\">بله</button>\n    <button type=\"button\" (click)=\"display=false\" class=\"btn btn-warning\">خیر</button>\n\n  </p-footer>\n</p-dialog>\n"

/***/ }),

/***/ "./src/app/compute-design/design-panel/design-panel.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/compute-design/design-panel/design-panel.component.ts ***!
  \***********************************************************************/
/*! exports provided: DesignPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignPanelComponent", function() { return DesignPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ "./src/app/compute-design/models.ts");
/* harmony import */ var _query_generator_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../query-generator/utility */ "./src/app/query-generator/utility.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DesignPanelComponent = /** @class */ (function () {
    function DesignPanelComponent() {
        this.positionA = { x: 0, y: 0 };
        this.positionB = { x: 160, y: 0 };
        this.computeButtonsInDesign = [];
        this.computeButtonsInTools = [];
        this.inBounds = true;
        this.BetweenButtonType = _models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"];
        this.ComputedButtonType = _models__WEBPACK_IMPORTED_MODULE_1__["ComputedButtonType"];
        this.InputButtonType = _models__WEBPACK_IMPORTED_MODULE_1__["InputButtonType"];
        this.SelectButtonType = _models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"];
        this.constButtonType = _models__WEBPACK_IMPORTED_MODULE_1__["ConstButtonType"];
    }
    DesignPanelComponent.prototype.ngOnInit = function () {
    };
    DesignPanelComponent.prototype.buttonSelected = function (event) {
        var copy = Object(_query_generator_utility__WEBPACK_IMPORTED_MODULE_2__["cloneAll"])(event);
        var last = this.computeButtonsInDesign[this.computeButtonsInDesign.length - 1];
        if (last) {
            copy.position.x = last.position.x + 160;
        }
        copy.order = this.computeButtonsInDesign.length;
        this.fillPossibleValues(copy);
        this.computeButtonsInDesign.push(copy);
    };
    DesignPanelComponent.prototype.dragOver = function (event) {
        this.dragOverButton = event;
    };
    DesignPanelComponent.prototype.onMoving = function (event) {
        if (!this.dragOverButton)
            return;
        var boxWidth = this.dragOverButton.position.x;
        var boxHeight = this.dragOverButton.position.y;
        if (this.positionA.x < this.positionB.x &&
            event.x + boxWidth >= this.positionB.x + boxWidth / 2 &&
            event.x <= this.positionB.x + boxWidth &&
            event.y + boxHeight >= this.positionA.y &&
            event.y <= this.positionA.y + boxHeight) {
            var tmp = this.positionB;
            this.positionB = this.positionA;
            this.positionA = tmp;
        }
        else if (this.positionA.x >= this.positionB.x &&
            event.x <= this.positionB.x + boxWidth / 2 &&
            event.x + boxWidth >= this.positionB.x &&
            event.y + boxHeight >= this.positionA.y &&
            event.y <= this.positionA.y + boxHeight) {
            var tmp = this.positionB;
            this.positionB = this.positionA;
            this.positionA = tmp;
        }
    };
    DesignPanelComponent.prototype.remove = function () {
        this.computeButtonsInDesign = this.computeButtonsInDesign.filter(function (a) { return !a.isSelected; });
    };
    DesignPanelComponent.prototype.showRemoveConfirm = function () {
        this.toRemoveCount = this.computeButtonsInDesign.filter(function (a) { return a.isSelected; }).length;
    };
    DesignPanelComponent.prototype.select = function (event) {
        event.isSelected = !event.isSelected;
    };
    DesignPanelComponent.prototype.refresh = function () {
        var _this = this;
        this.computeButtonsInDesign.forEach(function (a) {
            _this.fillPossibleValues(a);
        });
    };
    DesignPanelComponent.prototype.fillPossibleValues = function (copy) {
        var isSelect = copy.type == _models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].multi ||
            copy.type == _models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one ||
            copy.type == _models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].many;
        if (isSelect) {
            var but = copy;
            if (but.fillContent) {
                but.possibleValue = but.fillContent();
            }
        }
    };
    DesignPanelComponent.prototype.exportSQL = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DesignPanelComponent.prototype, "computeButtonsInDesign", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DesignPanelComponent.prototype, "computeButtonsInTools", void 0);
    DesignPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            moduleId: 'DesignPanelComponent',
            selector: 'app-design-panel',
            template: __webpack_require__(/*! ./design-panel.component.html */ "./src/app/compute-design/design-panel/design-panel.component.html"),
            styles: [__webpack_require__(/*! ./design-panel.component.css */ "./src/app/compute-design/design-panel/design-panel.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DesignPanelComponent);
    return DesignPanelComponent;
}());



/***/ }),

/***/ "./src/app/compute-design/models.ts":
/*!******************************************!*\
  !*** ./src/app/compute-design/models.ts ***!
  \******************************************/
/*! exports provided: ComputeButton, BetweenButtonType, ConstButtonType, ComputedButtonType, SelectButtonType, InputButtonType, BetweenButton, ComputePossibleValue, ConstButton, ComputedButton, InputButton, SelectButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputeButton", function() { return ComputeButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetweenButtonType", function() { return BetweenButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstButtonType", function() { return ConstButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputedButtonType", function() { return ComputedButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectButtonType", function() { return SelectButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputButtonType", function() { return InputButtonType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetweenButton", function() { return BetweenButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputePossibleValue", function() { return ComputePossibleValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstButton", function() { return ConstButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputedButton", function() { return ComputedButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputButton", function() { return InputButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectButton", function() { return SelectButton; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ComputeButton = /** @class */ (function () {
    function ComputeButton() {
        this.position = { x: 0, y: 0 };
        this.isSelected = false;
    }
    return ComputeButton;
}());

/*TYPES */
var BetweenButtonType;
(function (BetweenButtonType) {
    BetweenButtonType[BetweenButtonType["And"] = 1] = "And";
    BetweenButtonType[BetweenButtonType["Or"] = 14] = "Or";
    BetweenButtonType[BetweenButtonType["start"] = 2] = "start";
    BetweenButtonType[BetweenButtonType["end"] = 3] = "end";
})(BetweenButtonType || (BetweenButtonType = {}));
var ConstButtonType;
(function (ConstButtonType) {
    ConstButtonType[ConstButtonType["notNull"] = 4] = "notNull";
})(ConstButtonType || (ConstButtonType = {}));
var ComputedButtonType;
(function (ComputedButtonType) {
    ComputedButtonType[ComputedButtonType["min"] = 7] = "min";
    ComputedButtonType[ComputedButtonType["max"] = 6] = "max";
    ComputedButtonType[ComputedButtonType["convert"] = 5] = "convert";
})(ComputedButtonType || (ComputedButtonType = {}));
/*many: از کوئری یا تمامی مقادیر یک ستون را مقایسه می کند
* one : تنها یکی از مقادیر ستون را انتخاب می کند
* multi : چند مقدار را مقایسه می کند*/
var SelectButtonType;
(function (SelectButtonType) {
    SelectButtonType[SelectButtonType["one"] = 8] = "one";
    SelectButtonType[SelectButtonType["many"] = 9] = "many";
    SelectButtonType[SelectButtonType["multi"] = 12] = "multi";
})(SelectButtonType || (SelectButtonType = {}));
var InputButtonType;
(function (InputButtonType) {
    InputButtonType[InputButtonType["text"] = 10] = "text";
    InputButtonType[InputButtonType["number"] = 11] = "number";
})(InputButtonType || (InputButtonType = {}));
/*TYPES END*/
var BetweenButton = /** @class */ (function (_super) {
    __extends(BetweenButton, _super);
    function BetweenButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BetweenButton;
}(ComputeButton));

var ComputePossibleValue = /** @class */ (function () {
    function ComputePossibleValue() {
    }
    return ComputePossibleValue;
}());

var ConstButton = /** @class */ (function (_super) {
    __extends(ConstButton, _super);
    function ConstButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConstButton;
}(ComputeButton));

var ComputedButton = /** @class */ (function (_super) {
    __extends(ComputedButton, _super);
    function ComputedButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComputedButton;
}(ComputeButton));

var InputButton = /** @class */ (function (_super) {
    __extends(InputButton, _super);
    function InputButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InputButton;
}(ComputeButton));

var SelectButton = /** @class */ (function (_super) {
    __extends(SelectButton, _super);
    function SelectButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SelectButton;
}(ComputeButton));



/***/ }),

/***/ "./src/app/compute-design/tools/tools.component.css":
/*!**********************************************************!*\
  !*** ./src/app/compute-design/tools/tools.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/compute-design/tools/tools.component.html":
/*!***********************************************************!*\
  !*** ./src/app/compute-design/tools/tools.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card text-white bg-secondary mb-3\" style=\"max-width: 18rem;\">\n  <div class=\"card-header\">منو ابزار</div>\n  <div class=\"card-body\">\n    <div class=\"card-title\" >\n      <div class=\"btn-group\" *ngIf=\"computeButtons\">\n      <button   class=\"btn btn-secondary\" (click)=\"refresh()\">بازآوری</button>\n      <button   class=\"btn btn-secondary\" (click)=\"remove()\">حذف</button>\n      </div>\n    </div>\n\n    <div class=\"card-text\" >\n      <div class=\"btn-group-vertical\" *ngIf=\"computeButtons\">\n        <ng-template ngFor let-computeButton [ngForOf]=\"computeButtons\" let-i=\"index\">\n          <button (click)=\"select(computeButton)\"  type=\"button\" class=\"btn btn-secondary\">{{computeButton.name}}</button>\n        </ng-template>\n\n      </div>\n\n\n    </div>\n\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/compute-design/tools/tools.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/compute-design/tools/tools.component.ts ***!
  \*********************************************************/
/*! exports provided: ToolsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolsComponent", function() { return ToolsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolsComponent = /** @class */ (function () {
    function ToolsComponent() {
        this.buttonSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.refreshed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.removed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ToolsComponent.prototype.ngOnInit = function () {
    };
    ToolsComponent.prototype.remove = function () {
        this.removed.emit(true);
    };
    ToolsComponent.prototype.refresh = function () {
        this.refreshed.emit(true);
    };
    ToolsComponent.prototype.select = function (button) {
        this.buttonSelected.emit(button);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], ToolsComponent.prototype, "computeButtons", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ToolsComponent.prototype, "buttonSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ToolsComponent.prototype, "refreshed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ToolsComponent.prototype, "removed", void 0);
    ToolsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tools',
            template: __webpack_require__(/*! ./tools.component.html */ "./src/app/compute-design/tools/tools.component.html"),
            styles: [__webpack_require__(/*! ./tools.component.css */ "./src/app/compute-design/tools/tools.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ToolsComponent);
    return ToolsComponent;
}());



/***/ }),

/***/ "./src/app/database/database.module.ts":
/*!*********************************************!*\
  !*** ./src/app/database/database.module.ts ***!
  \*********************************************/
/*! exports provided: DatabaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseModule", function() { return DatabaseModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _tables_tables_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tables/tables.component */ "./src/app/database/tables/tables.component.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/table.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeng_table__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _queries_queries_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./queries/queries.component */ "./src/app/database/queries/queries.component.ts");
/* harmony import */ var _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dynamic-table/dynamic-table.component */ "./src/app/database/dynamic-table/dynamic-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DatabaseModule = /** @class */ (function () {
    function DatabaseModule() {
    }
    DatabaseModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_3__["DataTableModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_3__["DialogModule"], primeng_table__WEBPACK_IMPORTED_MODULE_4__["TableModule"]
            ],
            declarations: [_tables_tables_component__WEBPACK_IMPORTED_MODULE_2__["TablesComponent"], _queries_queries_component__WEBPACK_IMPORTED_MODULE_5__["QueriesComponent"], _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_6__["JDynamicTableComponent"]],
            exports: [_tables_tables_component__WEBPACK_IMPORTED_MODULE_2__["TablesComponent"], _queries_queries_component__WEBPACK_IMPORTED_MODULE_5__["QueriesComponent"]]
        })
    ], DatabaseModule);
    return DatabaseModule;
}());



/***/ }),

/***/ "./src/app/database/dynamic-table/dynamic-table.component.css":
/*!********************************************************************!*\
  !*** ./src/app/database/dynamic-table/dynamic-table.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/database/dynamic-table/dynamic-table.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/database/dynamic-table/dynamic-table.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-rtl\" dir=\"rtl\">\n  <p-dialog [(visible)]=\"display\" (onHide)=\"onHide($event)\" [maximizable]=\"true\" [draggable]=\"true\" [minWidth]=\"300\">\n    <p-header>\n      انتخاب  از جدول\n    </p-header>\n\n    <p-table *ngIf=\"models\" [value]=\"models\"\n             selectionMode=\"single\" [(selection)]=\"selected\" dataKey=\"Id\">\n      <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n          <th *ngFor=\"let f of fields\">{{f.translate}}</th>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n        <tr [pSelectableRow]=\"rowData\">\n          <ng-template let-f ngFor [ngForOf]=\"fields\">\n            <td>{{rowData[f.name]}}</td>\n          </ng-template>\n\n          <ng-template let-b ngFor [ngForOf]=\"buttons\">\n            <td class=\"btn btn-primary \" (click)=\"b.onclick ? b.onclick(rowData) : null\">{{b.Name}}</td>\n          </ng-template>\n\n        </tr>\n      </ng-template>\n      <!--<ng-template pTemplate=\"summary\">\n\n      </ng-template>-->\n    </p-table>\n\n    <p-footer>\n      <button class=\"btn bg-danger\" (click)=\"select()\">انتخاب</button>\n      <button class=\"btn bg-danger\" (click)=\"cancel()\">لغو</button>\n    </p-footer>\n  </p-dialog>\n</div>\n"

/***/ }),

/***/ "./src/app/database/dynamic-table/dynamic-table.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/database/dynamic-table/dynamic-table.component.ts ***!
  \*******************************************************************/
/*! exports provided: JDynamicTableComponent, DynaButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JDynamicTableComponent", function() { return JDynamicTableComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynaButton", function() { return DynaButton; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JDynamicTableComponent = /** @class */ (function () {
    function JDynamicTableComponent() {
        this._display = false;
        this.selectedEv = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(JDynamicTableComponent.prototype, "display", {
        get: function () {
            return this._display;
        },
        set: function (value) {
            this._display = value;
        },
        enumerable: true,
        configurable: true
    });
    JDynamicTableComponent.prototype.select = function () {
        this.selectedEv.emit(this.selected);
    };
    JDynamicTableComponent.prototype.ngOnInit = function () {
    };
    JDynamicTableComponent.prototype.onHide = function (ev) {
        this._display = false;
    };
    JDynamicTableComponent.prototype.cancel = function () {
        this._display = false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], JDynamicTableComponent.prototype, "display", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], JDynamicTableComponent.prototype, "models", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], JDynamicTableComponent.prototype, "fields", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], JDynamicTableComponent.prototype, "selected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], JDynamicTableComponent.prototype, "selectedEv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], JDynamicTableComponent.prototype, "buttons", void 0);
    JDynamicTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dynamic-table',
            template: __webpack_require__(/*! ./dynamic-table.component.html */ "./src/app/database/dynamic-table/dynamic-table.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-table.component.css */ "./src/app/database/dynamic-table/dynamic-table.component.css")]
        })
    ], JDynamicTableComponent);
    return JDynamicTableComponent;
}());

var DynaButton = /** @class */ (function () {
    function DynaButton() {
    }
    return DynaButton;
}());



/***/ }),

/***/ "./src/app/database/queries.service.ts":
/*!*********************************************!*\
  !*** ./src/app/database/queries.service.ts ***!
  \*********************************************/
/*! exports provided: QueriesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueriesService", function() { return QueriesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QueriesService = /** @class */ (function () {
    function QueriesService(http) {
        this.http = http;
        this.headers = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    Object.defineProperty(QueriesService.prototype, "getRootUrl", {
        get: function () {
            var rootUrl = window['rootUrl'];
            if (!rootUrl) {
                console.error('rootUrl is null');
            }
            return rootUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueriesService.prototype, "getAreaAndPath", {
        get: function () {
            return 'api/query/';
        },
        enumerable: true,
        configurable: true
    });
    QueriesService.prototype.getAllQueries = function (searchTerm, lastIndex, count) {
        return this.http.get("" + this.getRootUrl + this.getAreaAndPath + "/getAll?lastIndex=&count=", this.headers);
    };
    QueriesService.prototype.deleteById = function (Id) {
        return this.http.post("" + this.getRootUrl + this.getAreaAndPath + "/deleteById?id=" + Id, this.headers);
    };
    QueriesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], QueriesService);
    return QueriesService;
}());



/***/ }),

/***/ "./src/app/database/queries/queries.component.css":
/*!********************************************************!*\
  !*** ./src/app/database/queries/queries.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/database/queries/queries.component.html":
/*!*********************************************************!*\
  !*** ./src/app/database/queries/queries.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-dynamic-table [buttons]=\"buttons\" #dynaTable [display]=\"display\" [models]=\"queries\"\n                   [fields]=\"fields\" [selected]=\"selected\"\n                   (selectedEv)=\"selectedEvent($event)\"></app-dynamic-table>\n"

/***/ }),

/***/ "./src/app/database/queries/queries.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/database/queries/queries.component.ts ***!
  \*******************************************************/
/*! exports provided: QueriesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueriesComponent", function() { return QueriesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _form_generator_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../form-generator/models */ "./src/app/form-generator/models.ts");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var _queries_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../queries.service */ "./src/app/database/queries.service.ts");
/* harmony import */ var _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dynamic-table/dynamic-table.component */ "./src/app/database/dynamic-table/dynamic-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QueriesComponent = /** @class */ (function () {
    function QueriesComponent(queriesService) {
        this.queriesService = queriesService;
        this.selectedEv = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(QueriesComponent.prototype, "display", {
        get: function () {
            return this._display;
        },
        set: function (value) {
            this._display = value;
            this.dynaTable.display = value;
            this.ngOnInit();
        },
        enumerable: true,
        configurable: true
    });
    QueriesComponent.prototype.selectedEvent = function (e) {
        this.selected = e;
        this.selectedEv.emit(this.selected);
    };
    QueriesComponent.prototype.select = function () {
        this.selectedEv.emit(this.selected);
    };
    QueriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queriesService.getAllQueries().toPromise().then(function (r) {
            _this.queries = r.result;
        });
        var b = new _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_4__["DynaButton"]();
        b.Name = "حذف";
        b.onclick = function (el) {
            _this.queriesService.deleteById(el.Id).toPromise().then(function (r) {
                alert(r.Message);
                _this.queriesService.getAllQueries().toPromise().then(function (r) {
                    _this.queries = r.result;
                });
            });
        };
        this.buttons = [];
        this.buttons.push(b);
        this.fields = Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_1__["generateDynamicFormFields"])(new _model_model__WEBPACK_IMPORTED_MODULE_2__["Query"]());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dynaTable'),
        __metadata("design:type", _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_4__["JDynamicTableComponent"])
    ], QueriesComponent.prototype, "dynaTable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], QueriesComponent.prototype, "display", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], QueriesComponent.prototype, "selectedEv", void 0);
    QueriesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-queries',
            template: __webpack_require__(/*! ./queries.component.html */ "./src/app/database/queries/queries.component.html"),
            styles: [__webpack_require__(/*! ./queries.component.css */ "./src/app/database/queries/queries.component.css")],
            providers: [_queries_service__WEBPACK_IMPORTED_MODULE_3__["QueriesService"]]
        }),
        __metadata("design:paramtypes", [_queries_service__WEBPACK_IMPORTED_MODULE_3__["QueriesService"]])
    ], QueriesComponent);
    return QueriesComponent;
}());



/***/ }),

/***/ "./src/app/database/tables/tables.component.css":
/*!******************************************************!*\
  !*** ./src/app/database/tables/tables.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/database/tables/tables.component.html":
/*!*******************************************************!*\
  !*** ./src/app/database/tables/tables.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<app-dynamic-table  #dynaTable  [display]=\"display\" [models]=\"models\"\r\n  [fields]=\"fields\" [selected]=\"selected\" (selectedEv)=\"selectedEvent($event)\"></app-dynamic-table>\r\n\r\n"

/***/ }),

/***/ "./src/app/database/tables/tables.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/database/tables/tables.component.ts ***!
  \*****************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/table.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primeng_table__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tables.service */ "./src/app/database/tables.service.ts");
/* harmony import */ var _form_generator_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../form-generator/models */ "./src/app/form-generator/models.ts");
/* harmony import */ var _query_generator_data_data_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../query-generator/data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dynamic-table/dynamic-table.component */ "./src/app/database/dynamic-table/dynamic-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TablesComponent = /** @class */ (function () {
    function TablesComponent(tableService, DataComponent, chd) {
        this.tableService = tableService;
        this.DataComponent = DataComponent;
        this.chd = chd;
        this.selectedEv = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(TablesComponent.prototype, "display", {
        get: function () {
            return this._display;
        },
        set: function (value) {
            this._display = value;
            this.dynaTable.display = value;
            this.ngOnInit();
        },
        enumerable: true,
        configurable: true
    });
    TablesComponent.prototype.selectedEvent = function (event) {
        var ev = Object.assign({}, event);
        this.selected = ev;
        console.log(ev);
        var qm = new _model_model__WEBPACK_IMPORTED_MODULE_1__["QueryModel"]();
        qm.Model = ev;
        // qm.Query = this.DataComponent.currentQuery;
        this.DataComponent.models.push(qm);
        this.tableService.GetWithProperties(qm.Model.Id).toPromise().then(function (r) {
            qm.Model = r.result;
            // qm.Model.Properties = r.result.properties;
            //qm.Model.Properties.forEach(p=>p.uniqId=Utility.generateNewIdNumber());
            qm.Model.AsName = qm.Model.Name;
            qm.LeftJoinTables = [];
            qm.RightJoinTables = [];
        });
    };
    TablesComponent.prototype.select = function () {
        this.selectedEv.emit(this.selected);
    };
    TablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableService.getAllNames().toPromise().then(function (r) {
            _this.models = r.result;
        });
        this.fields = Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_4__["generateDynamicFormFields"])(new _model_model__WEBPACK_IMPORTED_MODULE_1__["Model"]());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dynaTable'),
        __metadata("design:type", _dynamic_table_dynamic_table_component__WEBPACK_IMPORTED_MODULE_6__["JDynamicTableComponent"])
    ], TablesComponent.prototype, "dynaTable", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TablesComponent.prototype, "display", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TablesComponent.prototype, "selectedEv", void 0);
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tables',
            template: __webpack_require__(/*! ./tables.component.html */ "./src/app/database/tables/tables.component.html"),
            styles: [__webpack_require__(/*! ./tables.component.css */ "./src/app/database/tables/tables.component.css")],
            providers: [primeng_table__WEBPACK_IMPORTED_MODULE_2__["TableService"]]
        }),
        __metadata("design:paramtypes", [_tables_service__WEBPACK_IMPORTED_MODULE_3__["TablesService"],
            _query_generator_data_data_component__WEBPACK_IMPORTED_MODULE_5__["DataComponent"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/data/data.component.css":
/*!*********************************************************!*\
  !*** ./src/app/query-generator/data/data.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/data/data.component.html":
/*!**********************************************************!*\
  !*** ./src/app/query-generator/data/data.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  data works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/data/data.component.ts":
/*!********************************************************!*\
  !*** ./src/app/query-generator/data/data.component.ts ***!
  \********************************************************/
/*! exports provided: DataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataComponent", function() { return DataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component */ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.ts");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility */ "./src/app/query-generator/utility.ts");
/* harmony import */ var _database_tables_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../database/tables.service */ "./src/app/database/tables.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DataComponent = /** @class */ (function () {
    function DataComponent(DataService, tableService) {
        this.DataService = DataService;
        this.tableService = tableService;
        this.selectedProperties = [];
        this.joinTables = [];
        this.addParameterFields = [];
        this.WhereComputeButtons = [];
        this.Name = _utility__WEBPACK_IMPORTED_MODULE_3__["Utility"].generateNewId();
    }
    DataComponent.prototype.getPropertiesOnly = function () {
        var arr = [];
        for (var i = 0; i < this.selectedProperties.length; i++) {
            arr.push(this.selectedProperties[i]);
        }
        return arr;
    };
    /*
    
      selectMain(models:QueryModel[],mainTable:QueryModel) {
        if (mainTable) {
          models.forEach(m => m.IsMainTable = false);
          models.find(m => m.Id == mainTable.Id).IsMainTable = true;
        }
          }
    
    */
    DataComponent.prototype.saveQuery = function () {
        var _this = this;
        if (!this.mainTable) {
            alert('جدول اصلی انتخاب نشده است');
            return;
        }
        var m = new _model_model__WEBPACK_IMPORTED_MODULE_2__["Query"]();
        if (this.currentQuery) {
            m.Id = this.currentQuery.Id;
        }
        m.models = [];
        for (var i = 0; i < this.models.length; i++) {
            var j = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.models[i]);
            j.ModelId = this.models[i].Model.Id;
            j.Model = null;
            j.QueryId = 0;
            m.models.push(j);
        }
        m.selectedProperties = [];
        for (var i = 0; i < this.selectedProperties.length; i++) {
            var j = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.selectedProperties[i]);
            j.PropertyId = this.selectedProperties[i].Property.Id;
            j.Property = null;
            m.selectedProperties.push(j);
        }
        //   this.selectMain(m.models,this.mainTable);
        var joins = [];
        var _loop_1 = function (i) {
            var j = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(m.models[i]);
            var _loop_2 = function (k) {
                var exists = joins.find(function (join) { return join.uniqId == j.LeftJoinTables[k].uniqId; });
                if (!exists) {
                    joins.push(j.LeftJoinTables[k]);
                }
                j.LeftJoinTables[k].rightTable = null;
                j.LeftJoinTables[k].leftTable = null;
                j.LeftJoinTables[k].rightProperty.QueryId = 0;
                j.LeftJoinTables[k].rightProperty.Id = 0;
                j.LeftJoinTables[k].leftProperty.QueryId = 0;
                j.LeftJoinTables[k].leftProperty.Id = 0;
            };
            for (var k = 0; k < j.LeftJoinTables.length; k++) {
                _loop_2(k);
            }
            j.LeftJoinTables = [];
            var _loop_3 = function (k) {
                var exists = joins.find(function (join) { return join.uniqId == j.RightJoinTables[k].uniqId; });
                if (!exists) {
                    joins.push(j.RightJoinTables[k]);
                }
                j.RightJoinTables[k].rightTable = null;
                j.RightJoinTables[k].leftTable = null;
                j.RightJoinTables[k].leftTable = null;
                j.RightJoinTables[k].rightTable = null;
                j.RightJoinTables[k].rightProperty.QueryId = 0;
                j.RightJoinTables[k].rightProperty.Id = 0;
                j.RightJoinTables[k].leftProperty.QueryId = 0;
                j.RightJoinTables[k].leftProperty.Id = 0;
            };
            for (var k = 0; k < j.RightJoinTables.length; k++) {
                _loop_3(k);
            }
            j.RightJoinTables = [];
            m.models[i] = (j);
        };
        for (var i = 0; i < m.models.length; i++) {
            _loop_1(i);
        }
        m.joinTables = [];
        for (var i = 0; i < this.joinTables.length; i++) {
            var j = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.joinTables[i]);
            if (j.leftTable) {
                j.leftTable.RightJoinTables = [];
                j.leftTable.LeftJoinTables = [];
            }
            if (j.rightTable) {
                j.rightTable.LeftJoinTables = [];
                j.rightTable.LeftJoinTables = [];
            }
            m.joinTables.push(j);
        }
        m.addParameterFields = this.addParameterFields;
        m.WhereStatement = this.WhereStatement;
        m.WhereComputeButtons = this.WhereComputeButtons;
        m.SQL = this.SQL;
        m.Name = this.Name;
        this.currentQuery = m;
        this.DataService.saveQuery(m).toPromise().then(function (res) {
            //this.models = res;
            _this.currentQuery.Id = res.result;
            _this.loadQuery(_this.currentQuery.Id);
            alert(res.Message);
        });
    };
    DataComponent.prototype.loadQuery = function (id) {
        var _this = this;
        this.DataService.loadQuery(id).toPromise().then(function (result) {
            var res = result.result;
            _this.currentQuery = res;
            _this.mainTable = res.models.find(function (m) { return m.IsMainTable; });
            _this.models = res.models;
            _this.WhereComputeButtons = res.WhereComputeButtons;
            // this.selectMain();
            var asyncesHolder = [];
            var modelCounter = 0;
            _this.models = _this.models ? _this.models : [];
            var _loop_4 = function (i) {
                /* if (this.models[i].Id == this.mainTable.Id) {
                   this.models[i].Model.isMainTable = true;
                   document.getElementById('t'+this.mainTable.Id).click();
                 }*/
                _this.tableService.GetWithProperties(_this.models[i].ModelId).toPromise().then(function (r) {
                    modelCounter++;
                    _this.models[i].Model = r.result;
                    // this.models[i].Model.Properties = r.result.properties;
                    _this.models[i].Model.AsName = _this.models[i].Model.Name;
                    //  this.models[i].Model.JoinTables = [];
                    _this.selectedProperties = _this.selectedProperties ? _this.selectedProperties : [];
                    var _loop_5 = function (j) {
                        var id_1 = _this.selectedProperties[j].Property.Id;
                        var exist = _this.models[i].Model.Properties.find(function (p) { return p.Id == id_1; });
                        if (exist) {
                            _this.selectedProperties[j].onOutPut = true;
                            _this.selectedProperties[j].Property.onOutPut = true;
                            exist.onOutPut = true;
                        }
                    };
                    for (var j = 0; j < _this.selectedProperties.length; j++) {
                        _loop_5(j);
                    }
                    if (modelCounter == _this.models.length - 1) {
                        setTimeout(function () {
                            _this.joinTables = [];
                            if (res.models) {
                                console.log(res.models);
                                for (var t = 0; t < res.models.length; t++) {
                                    var queryModel = res.models[t];
                                    _this.setModels(queryModel.LeftJoinTables);
                                    _this.setModels(queryModel.RightJoinTables);
                                    _this.ClickHelp(queryModel.LeftJoinTables);
                                    _this.ClickHelp(queryModel.RightJoinTables);
                                }
                                _this.tableDesign_active.onMoving(null);
                            }
                            document.getElementById('t' + _this.mainTable.uniqId).click();
                        }, 1000);
                    }
                });
            };
            for (var i = 0; i < _this.models.length; i++) {
                _loop_4(i);
            }
            _this.selectedProperties = res.selectedProperties;
            _this.selectedProperties = _this.selectedProperties ? _this.selectedProperties : [];
            _this.addParameterFields = res.addParameterFields;
            _this.WhereStatement = res.WhereStatement;
            _this.SQL = res.SQL;
            _this.Name = res.Name;
        });
    };
    DataComponent.prototype.init = function () {
        var _this = this;
        this.DataService.getAllDemoTableNames().toPromise().then(function (res) {
            _this.models = res;
        });
    };
    DataComponent.prototype.ngOnInit = function () {
    };
    DataComponent.prototype.findModel = function (rightProperty) {
        var m = this.models.find(function (m) { return m.Model.Id == rightProperty.Property.ModelId; });
        if (!m) {
            console.error('m is null');
        }
        return m;
    };
    DataComponent.prototype.findModelName = function (rightProperty) {
        var m = this.findModel(rightProperty);
        return m.Model.Name;
    };
    DataComponent.prototype.clickSelect = function (rc, lc) {
        if (rc) {
            rc.click();
        }
        if (lc) {
            lc.click();
        }
    };
    DataComponent.prototype.ClickHelp = function (JoinTables) {
        for (var pl = 0; pl < JoinTables.length; pl++) {
            var jt = JoinTables[pl];
            var ll2 = void 0;
            var a = '#pt' + jt.leftTableUniqId;
            var b = '#l' + jt.leftProperty.Property.Id;
            //ll2 = document.querySelector(a).querySelector(b);
            ll2 = $(a).find(b);
            jt.lelement = ll2[0];
            var a2 = '#pt' + jt.rightTableUniqId;
            var b2 = '#r' + jt.rightProperty.Property.Id;
            var rr2 = void 0;
            rr2 = $(a2).find(b2);
            //      rr2= document.querySelector(a2).querySelector(b2);
            /*if (JoinTables[t].rightTableId)
              rr2= document.querySelector('#pt' + JoinTables[t].rightTableId).
              querySelector(' #r' + JoinTables[t].rightProperty.Property.Id);*/
            jt.relement = rr2[0];
            /*  console.log(jt.rightTableUniqId,jt.leftTableUniqId);
              console.log(ll2,rr2);
              console.log('-----------------------------------');
        */
            this.joinTables.push(jt);
            //  this.clickSelect(ll2, rr2);
        }
    };
    DataComponent.prototype.setModels = function (joinTables) {
        var _this = this;
        var _loop_6 = function (i) {
            this_1.joinTables[i].leftTable = this_1.models.find(function (m) { return m.Id == _this.joinTables[i].leftTableId; });
            this_1.joinTables[i].rightTable = this_1.models.find(function (m) { return m.Id == _this.joinTables[i].rightTableId; });
        };
        var this_1 = this;
        for (var i = 0; i < this.joinTables.length; i++) {
            _loop_6(i);
        }
    };
    DataComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-data',
            template: __webpack_require__(/*! ./data.component.html */ "./src/app/query-generator/data/data.component.html"),
            styles: [__webpack_require__(/*! ./data.component.css */ "./src/app/query-generator/data/data.component.css")],
            providers: [_db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_1__["SQLServerSchemaProviderComponent"], _database_tables_service__WEBPACK_IMPORTED_MODULE_4__["TablesService"]]
        }),
        __metadata("design:paramtypes", [_db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_1__["SQLServerSchemaProviderComponent"],
            _database_tables_service__WEBPACK_IMPORTED_MODULE_4__["TablesService"]])
    ], DataComponent);
    return DataComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/db-schema-provider.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/db-schema-provider.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/db-schema-provider.component.ts ***!
  \************************************************************************************/
/*! exports provided: DbSchemaProviderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbSchemaProviderComponent", function() { return DbSchemaProviderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DbSchemaProviderComponent = /** @class */ (function () {
    function DbSchemaProviderComponent(http) {
        this.http = http;
        this.headers = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    Object.defineProperty(DbSchemaProviderComponent.prototype, "getRootUrl", {
        get: function () {
            var rootUrl = window['rootUrl'];
            if (!rootUrl) {
                console.error('rootUrl is null');
            }
            return rootUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DbSchemaProviderComponent.prototype, "getAreaAndPath", {
        get: function () {
            return 'api/query/';
        },
        enumerable: true,
        configurable: true
    });
    DbSchemaProviderComponent.prototype.ngOnInit = function () {
    };
    DbSchemaProviderComponent.prototype.removeCircularity = function (query) {
        /* for (let i = 0; i < query.joinTables.length; i++) {
           query.joinTables[i].leftTableId = query.joinTables[i].leftTable.Id
           query.joinTables[i].rightTableId = query.joinTables[i].rightTable.Id
     
           query.joinTables[i].leftPropertyId = query.joinTables[i].leftProperty.Id
           query.joinTables[i].rightPropertyId = query.joinTables[i].rightProperty.Id
         }
     */
    };
    DbSchemaProviderComponent.prototype.saveQuery = function (query) {
        // this.removeCircularity(query);
        console.log(query);
        /*var json = JSON.stringify(query, function (key, value) {
          if (key == 'leftTable' ||
            key == 'rightTable' ||
            key == 'leftProperty' ||
            key == 'rightProperty') {
          }
          else {
            return value;
          }
        });*/
        console.log(query);
        return this.http.post("" + this.getRootUrl + this.getAreaAndPath + "/saveQuery", query, this.headers);
    };
    DbSchemaProviderComponent.prototype.loadQuery = function (id) {
        return this.http.get("" + this.getRootUrl + this.getAreaAndPath + "/loadQuery?id=" + id);
    };
    DbSchemaProviderComponent.prototype.getAllQueries = function (id) {
        return this.http.get(this.getRootUrl + "/" + this.getAreaAndPath + "/loadQuery?id=" + id);
    };
    DbSchemaProviderComponent.prototype.setBook = function () {
        var book = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Model"]();
        book.Name = "book";
        book.TableName = "book";
        var name = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        name.NameInModel = "name";
        name.NameInTable = "name";
        name.ModelId = book.Id;
        name.ModelName = 'book';
        var id = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        id.NameInModel = "id";
        id.NameInTable = "id";
        id.PK = true;
        id.ModelId = book.Id;
        id.ModelName = 'book';
        //    name.=PropertyType.;
        book.Properties = [];
        book.Properties.push(name);
        book.Properties.push(id);
        return book;
    };
    DbSchemaProviderComponent.prototype.setRent = function () {
        var rent = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Model"]();
        rent.Name = "rent";
        rent.TableName = "rent";
        var id = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        id.NameInModel = "id";
        id.NameInTable = "id";
        id.PK = true;
        id.ModelId = rent.Id;
        id.ModelName = 'rent';
        rent.Properties = [];
        rent.Properties.push(id);
        return rent;
    };
    DbSchemaProviderComponent.prototype.setUser = function () {
        var user = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Model"]();
        user.Name = "user";
        user.TableName = "user";
        var name = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        name.NameInModel = "name";
        name.NameInTable = "name";
        name.ModelId = user.Id;
        name.ModelName = 'user';
        var id = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        id.NameInModel = "id";
        id.NameInTable = "id";
        id.PK = true;
        id.ModelId = user.Id;
        id.ModelName = 'user';
        var lname = new _model_model__WEBPACK_IMPORTED_MODULE_1__["Property"]();
        lname.NameInModel = "lname";
        lname.NameInTable = "lname";
        lname.ModelId = user.Id;
        lname.ModelName = 'user';
        //    name.=PropertyType.;
        user.Properties = [];
        user.Properties.push(name);
        user.Properties.push(lname);
        user.Properties.push(id);
        return user;
    };
    DbSchemaProviderComponent.prototype.getAllTableNames = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
    };
    DbSchemaProviderComponent.prototype.getAllDemoTableNames = function () {
        var models = [];
        var user = this.setUser();
        var book = this.setBook();
        var rent = this.setRent();
        var Bookrents = new _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationProperty"]();
        Bookrents.Name = "rents";
        Bookrents.NavigationPropertyType = _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationPropertyType"].Many;
        Bookrents.ModelId = book.Id;
        book.NavigationProperties.push(Bookrents);
        var Userrents = new _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationProperty"]();
        Userrents.Name = "rents";
        Userrents.NavigationPropertyType = _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationPropertyType"].Many;
        Userrents.ModelId = user.Id;
        user.NavigationProperties.push(Userrents);
        var rentsb = new _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationProperty"]();
        rentsb.Name = "book";
        rentsb.NavigationPropertyType = _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationPropertyType"].One;
        rentsb.ModelId = rent.Id;
        rent.NavigationProperties.push(rentsb);
        var rents = new _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationProperty"]();
        rents.Name = "user";
        rents.NavigationPropertyType = _model_model__WEBPACK_IMPORTED_MODULE_1__["NavigationPropertyType"].One;
        rents.ModelId = rent.Id;
        rent.NavigationProperties.push(rents);
        models.push(book);
        models.push(user);
        models.push(rent);
        var quermodels = [];
        var quermodel1 = new _model_model__WEBPACK_IMPORTED_MODULE_1__["QueryModel"]();
        quermodel1.Model = book;
        var quermodel2 = new _model_model__WEBPACK_IMPORTED_MODULE_1__["QueryModel"]();
        quermodel2.Model = user;
        var quermodel3 = new _model_model__WEBPACK_IMPORTED_MODULE_1__["QueryModel"]();
        quermodel3.Model = rent;
        quermodels.push(quermodel1);
        quermodels.push(quermodel2);
        quermodels.push(quermodel3);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([]);
    };
    DbSchemaProviderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-db-schema-provider',
            template: __webpack_require__(/*! ./db-schema-provider.component.html */ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.html"),
            styles: [__webpack_require__(/*! ./db-schema-provider.component.css */ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], DbSchemaProviderComponent);
    return DbSchemaProviderComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.css":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  sqlserver-schema-provider works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: SQLServerSchemaProviderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SQLServerSchemaProviderComponent", function() { return SQLServerSchemaProviderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _db_schema_provider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db-schema-provider.component */ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SQLServerSchemaProviderComponent = /** @class */ (function (_super) {
    __extends(SQLServerSchemaProviderComponent, _super);
    function SQLServerSchemaProviderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SQLServerSchemaProviderComponent.prototype.ngOnInit = function () {
    };
    SQLServerSchemaProviderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sqlserver-schema-provider',
            template: __webpack_require__(/*! ./sqlserver-schema-provider.component.html */ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.html"),
            styles: [__webpack_require__(/*! ./sqlserver-schema-provider.component.css */ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.css")]
        })
    ], SQLServerSchemaProviderComponent);
    return SQLServerSchemaProviderComponent;
}(_db_schema_provider_component__WEBPACK_IMPORTED_MODULE_1__["DbSchemaProviderComponent"]));



/***/ }),

/***/ "./src/app/query-generator/query-app/query-app.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/query-generator/query-app/query-app.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host >>> *{\r\n  direction: rtl;\r\n  text-align: right;\r\n}\r\n"

/***/ }),

/***/ "./src/app/query-generator/query-app/query-app.component.html":
/*!********************************************************************!*\
  !*** ./src/app/query-generator/query-app/query-app.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav nav-tabs\">\n  <li class=\"nav-item\">\n    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#home\"\n       (click)=\"activeTab=1\">طراحی</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu2\" (click)=\"activeTab=3\">\n      تنظیمات ستون ها</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu1\" (click)=\"activeTab=2\">\n      خروجی Query</a>\n  </li>\n\n\n  <!-- <li class=\"nav-item\">\n     <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu2\">طراحی </a>\n   </li>-->\n</ul>\n\n<!-- Tab panes -->\n<div class=\"tab-content\">\n  <div class=\"tab-pane active\" id=\"home\">\n\n    <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n              aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n\n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <!--  <ul class=\"navbar-nav mr-auto\">\n            <li class=\"nav-item active\">\n              <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" href=\"#\">Link</a>\n            </li>\n            <li class=\"nav-item dropdown\">\n              <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                Dropdown\n              </a>\n              <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n                <a class=\"dropdown-item\" href=\"#\">Action</a>\n                <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                <div class=\"dropdown-divider\"></div>\n                <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n              </div>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\n            </li>\n          </ul>-->\n        <ul class=\"navbar-nav\">\n          <li><a class=\"btn btn-outline-light\" data-toggle=\"modal\" data-target=\"#settingmodal\"><span class=\"oi\"\n                                                                                                     data-glyph=\"menu\"></span></a>\n          </li>\n          <li><a class=\"btn text-success\" (click)=\"DataComponent.saveQuery()\"><span class=\"oi\"\n                                                                                              data-glyph=\"check\">ذخیره</span></a>\n          </li>\n          <li><a class=\"btn  text-success\"\n                 (click)=\"openModalQueries()\"><span >انتخاب کوئری</span></a>\n          <li><a class=\"btn  text-success\"\n                 (click)=\"openModalTables()\"><span >انتخاب جدول</span></a>\n          </li>\n\n        </ul>\n      </div>\n      <a class=\"navbar-brand\" href=\"#\">منو</a>\n\n    </nav>\n    <app-table-design [panelHeight]=\"panelHeight\"></app-table-design>\n\n\n  </div>\n  <div class=\"tab-pane container-fluid fade\" id=\"menu1\">\n    <app-query-generator></app-query-generator>\n\n\n  </div>\n  <div class=\"tab-pane container fade\" id=\"menu2\">\n    <br>\n    <br>\n    <app-column-setting></app-column-setting>\n\n\n  </div>\n</div>\n\n\n<app-tables #tables *ngIf=\"showTables\" [display]=\"showTables\" ></app-tables>\n<app-queries (selectedEv)=\"querySelect($event)\" #queries *ngIf=\"showQueries\" [display]=\"showQueries\" ></app-queries>\n\n<!-- Modal -->\n<div class=\"modal fade\"\n     id=\"settingmodal\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"settingmodalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"settingmodalLabel\">تنظیمات</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"form-inline my-2 my-lg-0\">\n          <div class=\"form-group\">\n            <label>نام کوئری</label>\n            <input type=\"text\" [(ngModel)]=\"DataComponent.Name\">\n          </div>\n          <div class=\"form-group\">\n            <label>اندازه پنل</label>\n            <input type=\"number\" [(ngModel)]=\"panelHeight\">\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">بستن</button>\n        <!--\n                <button type=\"button\" class=\"btn btn-primary\"></button>\n        -->\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/query-generator/query-app/query-app.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/query-generator/query-app/query-app.component.ts ***!
  \******************************************************************/
/*! exports provided: QueryAppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryAppComponent", function() { return QueryAppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _database_tables_tables_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../database/tables/tables.component */ "./src/app/database/tables/tables.component.ts");
/* harmony import */ var _database_queries_queries_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../database/queries/queries.component */ "./src/app/database/queries/queries.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QueryAppComponent = /** @class */ (function () {
    function QueryAppComponent(DataComponent, activatedRoute) {
        this.DataComponent = DataComponent;
        this.activatedRoute = activatedRoute;
        this.panelHeight = 500;
        this.activeTab = 1;
        this.showTables = false;
        this.showQueries = false;
    }
    QueryAppComponent.prototype.openModalTables = function () {
        this.showTables = true;
        if (this.tables)
            this.tables.display = true;
    };
    QueryAppComponent.prototype.querySelect = function (ev) {
        this.DataComponent.loadQuery(ev.Id);
    };
    QueryAppComponent.prototype.openModalQueries = function () {
        this.showQueries = true;
        if (this.queries)
            this.queries.display = true;
    };
    QueryAppComponent.prototype.ngOnInit = function () {
        var id = this.activatedRoute.snapshot.params['id'];
        if (id) {
            //UPDATE
            this.DataComponent.loadQuery(id);
        }
        else {
            this.DataComponent.init();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('tables'),
        __metadata("design:type", _database_tables_tables_component__WEBPACK_IMPORTED_MODULE_3__["TablesComponent"])
    ], QueryAppComponent.prototype, "tables", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('queries'),
        __metadata("design:type", _database_queries_queries_component__WEBPACK_IMPORTED_MODULE_4__["QueriesComponent"])
    ], QueryAppComponent.prototype, "queries", void 0);
    QueryAppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-query-app',
            template: __webpack_require__(/*! ./query-app.component.html */ "./src/app/query-generator/query-app/query-app.component.html"),
            styles: [__webpack_require__(/*! ./query-app.component.css */ "./src/app/query-generator/query-app/query-app.component.css")],
            moduleId: 'QueryAppComponent'
        }),
        __metadata("design:paramtypes", [_data_data_component__WEBPACK_IMPORTED_MODULE_1__["DataComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], QueryAppComponent);
    return QueryAppComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/query-generator-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/query-generator/query-generator-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: QueryGeneratorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryGeneratorRoutingModule", function() { return QueryGeneratorRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _query_app_query_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-app/query-app.component */ "./src/app/query-generator/query-app/query-app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: _query_app_query_app_component__WEBPACK_IMPORTED_MODULE_2__["QueryAppComponent"] },
    { path: 'home/:id', component: _query_app_query_app_component__WEBPACK_IMPORTED_MODULE_2__["QueryAppComponent"] },
];
var QueryGeneratorRoutingModule = /** @class */ (function () {
    function QueryGeneratorRoutingModule() {
    }
    QueryGeneratorRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], QueryGeneratorRoutingModule);
    return QueryGeneratorRoutingModule;
}());



/***/ }),

/***/ "./src/app/query-generator/query-generator.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/query-generator/query-generator.module.ts ***!
  \***********************************************************/
/*! exports provided: QueryGeneratorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryGeneratorModule", function() { return QueryGeneratorModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _query_generator_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-generator-routing.module */ "./src/app/query-generator/query-generator-routing.module.ts");
/* harmony import */ var _query_app_query_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query-app/query-app.component */ "./src/app/query-generator/query-app/query-app.component.ts");
/* harmony import */ var _db_schema_provider_db_schema_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./db-schema-provider/db-schema-provider.component */ "./src/app/query-generator/db-schema-provider/db-schema-provider.component.ts");
/* harmony import */ var _db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component */ "./src/app/query-generator/db-schema-provider/sqlserver-schema-provider/sqlserver-schema-provider.component.ts");
/* harmony import */ var _select_columns_and_join_select_columns_and_join_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./select-columns-and-join/select-columns-and-join.component */ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.ts");
/* harmony import */ var _select_columns_and_join_design_query_design_query_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./select-columns-and-join/design-query/design-query.component */ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.ts");
/* harmony import */ var _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select-columns-and-join/table-design/table-design.component */ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.ts");
/* harmony import */ var _select_columns_and_join_menu_menu_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./select-columns-and-join/menu/menu.component */ "./src/app/query-generator/select-columns-and-join/menu/menu.component.ts");
/* harmony import */ var _select_columns_and_join_column_setting_column_setting_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./select-columns-and-join/column-setting/column-setting.component */ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.ts");
/* harmony import */ var _query_generator_query_generator_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./query-generator/query-generator.component */ "./src/app/query-generator/query-generator/query-generator.component.ts");
/* harmony import */ var _query_generator_sql_query_generator_sql_query_generator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./query-generator/sql-query-generator/sql-query-generator.component */ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.ts");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var angular2_draggable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular2-draggable */ "./node_modules/angular2-draggable/fesm5/angular2-draggable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_generator_form_generator_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../form-generator/form-generator.module */ "./src/app/form-generator/form-generator.module.ts");
/* harmony import */ var _select_columns_and_join_condition_condition_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./select-columns-and-join/condition/condition.component */ "./src/app/query-generator/select-columns-and-join/condition/condition.component.ts");
/* harmony import */ var _compute_design_compute_design_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../compute-design/compute-design.module */ "./src/app/compute-design/compute-design.module.ts");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _database_database_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../database/database.module */ "./src/app/database/database.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var QueryGeneratorModule = /** @class */ (function () {
    function QueryGeneratorModule() {
    }
    QueryGeneratorModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_form_generator_form_generator_module__WEBPACK_IMPORTED_MODULE_16__["FormGeneratorModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], angular2_draggable__WEBPACK_IMPORTED_MODULE_14__["AngularDraggableModule"],
                _query_generator_routing_module__WEBPACK_IMPORTED_MODULE_2__["QueryGeneratorRoutingModule"],
                _compute_design_compute_design_module__WEBPACK_IMPORTED_MODULE_18__["ComputeDesignModule"], primeng_dialog__WEBPACK_IMPORTED_MODULE_19__["DialogModule"], _angular_router__WEBPACK_IMPORTED_MODULE_20__["RouterModule"],
                _database_database_module__WEBPACK_IMPORTED_MODULE_21__["DatabaseModule"]
            ],
            declarations: [_query_app_query_app_component__WEBPACK_IMPORTED_MODULE_3__["QueryAppComponent"], _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_8__["HoldValuePipe"],
                _db_schema_provider_db_schema_provider_component__WEBPACK_IMPORTED_MODULE_4__["DbSchemaProviderComponent"], _db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_5__["SQLServerSchemaProviderComponent"],
                _select_columns_and_join_select_columns_and_join_component__WEBPACK_IMPORTED_MODULE_6__["SelectColumnsAndJoinComponent"], _select_columns_and_join_design_query_design_query_component__WEBPACK_IMPORTED_MODULE_7__["DesignQueryComponent"], _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_8__["TableDesignComponent"],
                _select_columns_and_join_menu_menu_component__WEBPACK_IMPORTED_MODULE_9__["MenuComponent"], _select_columns_and_join_column_setting_column_setting_component__WEBPACK_IMPORTED_MODULE_10__["ColumnSettingComponent"], _query_generator_query_generator_component__WEBPACK_IMPORTED_MODULE_11__["QueryGeneratorComponent"],
                _query_generator_sql_query_generator_sql_query_generator_component__WEBPACK_IMPORTED_MODULE_12__["SqlQueryGeneratorComponent"], _data_data_component__WEBPACK_IMPORTED_MODULE_13__["DataComponent"], _select_columns_and_join_condition_condition_component__WEBPACK_IMPORTED_MODULE_17__["ConditionComponent"]],
            bootstrap: [_query_app_query_app_component__WEBPACK_IMPORTED_MODULE_3__["QueryAppComponent"]],
            providers: [_db_schema_provider_sqlserver_schema_provider_sqlserver_schema_provider_component__WEBPACK_IMPORTED_MODULE_5__["SQLServerSchemaProviderComponent"], _data_data_component__WEBPACK_IMPORTED_MODULE_13__["DataComponent"]]
        })
    ], QueryGeneratorModule);
    return QueryGeneratorModule;
}());



/***/ }),

/***/ "./src/app/query-generator/query-generator/query-generator.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/query-generator.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/query-generator/query-generator.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/query-generator.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<br>\n<div class=\"card\">\n  <div class=\"card-header\">\n    <button (click)=\"generate()\" class=\"btn btn-primary\"> تولید خروجی</button>\n    <b style=\"text-align: left;float: left\">Sql Query</b></div>\n  <pre class=\"card-body\"\n       style=\"direction: ltr !important;text-align: left !important;\"\n  > <code style=\"direction: ltr !important;text-align: left !important;\" >{{ dataComponent.SQL}}</code>\n  </pre>\n  <div class=\"card-footer\">Footer</div>\n</div>\n"

/***/ }),

/***/ "./src/app/query-generator/query-generator/query-generator.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/query-generator.component.ts ***!
  \******************************************************************************/
/*! exports provided: QueryGeneratorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryGeneratorComponent", function() { return QueryGeneratorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sql_query_generator_sql_query_generator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sql-query-generator/sql-query-generator.component */ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.ts");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/data.component */ "./src/app/query-generator/data/data.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QueryGeneratorComponent = /** @class */ (function () {
    function QueryGeneratorComponent(sqlQueryGeneratorComponent, dataComponent) {
        this.sqlQueryGeneratorComponent = sqlQueryGeneratorComponent;
        this.dataComponent = dataComponent;
    }
    QueryGeneratorComponent.prototype.generate = function () {
        var _this = this;
        this.sqlQueryGeneratorComponent.Generate(this.dataComponent.getPropertiesOnly(), null, this.dataComponent.joinTables, this.dataComponent.mainTable).toPromise().then(function (r) {
            _this.dataComponent.SQL = r;
            /*$('code').each(function(i, block) {
              hljs.highlightBlock(block);
            });*/
        });
    };
    QueryGeneratorComponent.prototype.ngOnInit = function () {
    };
    QueryGeneratorComponent.prototype.ngAfterViewInit = function () {
    };
    QueryGeneratorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-query-generator',
            template: __webpack_require__(/*! ./query-generator.component.html */ "./src/app/query-generator/query-generator/query-generator.component.html"),
            styles: [__webpack_require__(/*! ./query-generator.component.css */ "./src/app/query-generator/query-generator/query-generator.component.css")],
            providers: [_sql_query_generator_sql_query_generator_component__WEBPACK_IMPORTED_MODULE_1__["SqlQueryGeneratorComponent"]]
        }),
        __metadata("design:paramtypes", [_sql_query_generator_sql_query_generator_component__WEBPACK_IMPORTED_MODULE_1__["SqlQueryGeneratorComponent"],
            _data_data_component__WEBPACK_IMPORTED_MODULE_2__["DataComponent"]])
    ], QueryGeneratorComponent);
    return QueryGeneratorComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  sql-query-generator works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: SqlQueryGeneratorComponent, AsName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlQueryGeneratorComponent", function() { return SqlQueryGeneratorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsName", function() { return AsName; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../select-columns-and-join/table-design/table-design.component */ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _select_columns_and_join_column_setting_setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../select-columns-and-join/column-setting/setting-dform-inputs.service */ "./src/app/query-generator/select-columns-and-join/column-setting/setting-dform-inputs.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SqlQueryGeneratorComponent = /** @class */ (function () {
    function SqlQueryGeneratorComponent(dataComponent) {
        this.dataComponent = dataComponent;
    }
    SqlQueryGeneratorComponent_1 = SqlQueryGeneratorComponent;
    SqlQueryGeneratorComponent.prototype.ngOnInit = function () {
    };
    SqlQueryGeneratorComponent.prototype.getDefinedQueryVariable = function (addParameterField, typesInsql) {
        if (!addParameterField) {
            console.error('addParameterField is null');
        }
        return "DECLARE   @" + addParameterField.nameInSQL + " " + addParameterField.typeInSQL + " ;";
    };
    SqlQueryGeneratorComponent.prototype.getDefinedQueryVariables = function (addParameterFields) {
        if (!addParameterFields) {
            console.error('addParameterFields is null');
        }
        var variables = '';
        var arr = _select_columns_and_join_column_setting_setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_5__["SettingDFormInputsService"].getTypesInSQL();
        for (var i = 0; i < addParameterFields.length; i++) {
            variables += this.getDefinedQueryVariable(addParameterFields[i], arr);
        }
        return variables;
    };
    SqlQueryGeneratorComponent.prototype.Generate = function (properties, navigationProperties, joinTables, mainTable) {
        if (!mainTable) {
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"].ShowMsg('', 'اشکال', 'جدول اصلی انتخاب نشده است');
            return;
        }
        if (!mainTable.Model.TableName) {
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"].ShowMsg('', 'اشکال', 'جدول اصلی نام ندارد');
        }
        var variables = this.getDefinedQueryVariables(this.dataComponent.addParameterFields);
        var columns = this.GetColumns(properties, navigationProperties);
        var conditions = this.GetConditions(properties, navigationProperties);
        var joins = this.GetJoins(properties, navigationProperties, mainTable);
        columns = columns ? columns : '*';
        //  let select = `${variables}  
        var select = "\n    \n    select " + columns + " from " + mainTable.Model.TableName + " as\n     " + SqlQueryGeneratorComponent_1.GetAsName(mainTable.Model.Name, SqlQueryGeneratorComponent_1.tableAsNames, mainTable) + " ";
        if (joins) {
            select += " " + joins;
        }
        if (conditions) {
            select += " where " + conditions;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(select);
    };
    SqlQueryGeneratorComponent.prototype.GetColumns = function (properties, navigationProperties) {
        var columns = properties.filter(function (p) { return p.onOutPut; });
        var compWithAs = this.GetAsOfColumns(columns);
        return compWithAs;
    };
    SqlQueryGeneratorComponent.prototype.GetConditions = function (properties, navigationProperties) {
        return this.dataComponent.WhereStatement;
    };
    SqlQueryGeneratorComponent.prototype.GetJoins = function (properties, navigationProperties, mainTable) {
        if (!mainTable)
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"].ShowMsg('', '', 'mainTable is null');
        var JoinTables = [];
        mainTable.LeftJoinTables.forEach(function (l) { return JoinTables.push(l); });
        mainTable.RightJoinTables.forEach(function (l) { return JoinTables.push(l); });
        var joins = '';
        for (var i = 0; i < JoinTables.length; i++) {
            var joinTable = JoinTables[i];
            // جداول اصلی و پروپرتی ها را مشخص کن که کدام اصلی و فرعی است
            var firstTableTmp = this.GetMainForJoin(joinTable, mainTable.Model);
            var dependentTable = this.GetDependentTableForJoin(joinTable, firstTableTmp);
            // اگر برابر بود که هیچ در غیر اینصورت عوض کن جای آن ها را
            var firstTable = void 0;
            if (firstTableTmp == mainTable) {
                firstTable = firstTableTmp.Model;
            }
            else {
                firstTable = dependentTable.Model;
                dependentTable = firstTableTmp;
            }
            var modelName = this.dataComponent.findModelName(joinTable.rightProperty);
            var mainProperty = firstTable.Name == modelName ? joinTable.rightProperty : joinTable.leftProperty;
            var dependentProperty = dependentTable.Model.Name == modelName ? joinTable.rightProperty : joinTable.leftProperty;
            var jointype = this.GetJoinType(joinTable);
            var join = void 0;
            // اگر اولی باشد جوین نزن
            join = jointype + " " + dependentTable.Model.TableName + "\n          as " + SqlQueryGeneratorComponent_1.GetAsName(dependentTable.Model.Name, SqlQueryGeneratorComponent_1.tableAsNames, dependentTable) + " on \n           " + SqlQueryGeneratorComponent_1.GetAsName(firstTable.Name, SqlQueryGeneratorComponent_1.tableAsNames, firstTable) + ".\n           " + mainProperty.Property.NameInTableAsName + "=\n           " + SqlQueryGeneratorComponent_1.GetAsName(dependentTable.Model.Name, SqlQueryGeneratorComponent_1.tableAsNames, dependentTable) + ".\n           " + dependentProperty.Property.NameInTableAsName;
            /*     // اگر اولی باشد جوین نزن
                 join = `${jointype} ${dependentTable.TableName}
                     as ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)} on
                      ${SqlQueryGeneratorComponent.GetAsName(firstTable.Name, SqlQueryGeneratorComponent.tableAsNames, firstTable)}.
                      ${mainProperty.NameInTable}=
                      ${SqlQueryGeneratorComponent.GetAsName(dependentTable.Name, SqlQueryGeneratorComponent.tableAsNames, dependentTable)}.
                      ${dependentProperty.NameInTable}`;*/
            /*else {
             join = `${jointype} ${firstTable.Name} as
               ${this.GetAsName(firstTable.Name, this.tableAsNames, firstTable)} on
                ${this.GetAsName(firstTable.Name, this.tableAsNames, firstTable)}.
                ${mainProperty.NameInTable}=
                ${this.GetAsName(dependentTable.Name, this.tableAsNames, dependentTable)}.
                ${dependentProperty.NameInTable}`;
           }*/
            // let joins = `inner join table2 as t on t.id=s.1`;
            joins += ' ' + join;
        }
        return joins;
    };
    SqlQueryGeneratorComponent.prototype.GetMainForJoin = function (table, Ftable) {
        return table.rightTable && table.rightTable.Model.Name == Ftable.Name ? table.leftTable : table.rightTable;
    };
    SqlQueryGeneratorComponent.prototype.GetDependentTableForJoin = function (table, Ftable) {
        return table.rightTable && table.rightTable.Model.Name == Ftable.Name ? table.leftTable : table.rightTable;
    };
    SqlQueryGeneratorComponent.prototype.GetJoinType = function (table) {
        switch (table.joinType) {
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].InnerJoin:
                return 'inner join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].LeftJoin:
                return 'left join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].Rightjoin:
                return 'right join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].Join:
                return ' join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].OuterInnerJoin:
                return 'outer inner join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].OuterJoin:
                return 'outer  join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].OuterLeftJoin:
                return 'outer left join';
            case _select_columns_and_join_table_design_table_design_component__WEBPACK_IMPORTED_MODULE_2__["JoinTableType"].OuterRightjoin:
                return 'outer  right join';
        }
        console.error('connot determine');
    };
    SqlQueryGeneratorComponent.prototype.GetAsOfColumns = function (columns) {
        var c = 0;
        var names = '';
        for (var i = 0; i < columns.length; i++) {
            var name_1 = this.dataComponent.findModel(columns[i]).Model.AsName + ".\n      " + columns[i].Property.NameInTable + "  \n      as  \n       " + columns[i].NameInTableAsName + " ";
            names += ' ' + name_1;
            // آخری نباشد
            if (columns.length - 1 != i) {
                names += ',';
            }
        }
        return names;
    };
    SqlQueryGeneratorComponent.prototype.GetAsOfColumnsNav = function (columns) {
        return "";
    };
    // CHECK ALL AS NAMES MUST UNIQe
    SqlQueryGeneratorComponent.GetAsName = function (Name, asNames, obj) {
        // اگر پیدا کردی برگردان
        var exists = asNames.findIndex(function (f) {
            return f.name == Name && f.obj == obj;
        });
        if (exists != -1) {
        }
        else {
            // اگر پیدا نکردی با همان ابجکت اضافه کن
            asNames.push({ name: Name, as: '_' + Name, obj: obj });
        }
        var _loop_1 = function (i) {
            var index = asNames.findIndex(function (f) {
                return f.as == asNames[i].as
                    && f.name == asNames[i].name
                    && f.obj != asNames[i].obj;
            });
            var c = 0;
            // DUBLICATE EXISTS
            if (index != -1) {
                while (true) {
                    index = asNames.findIndex(function (f) { return f.as == asNames[i].as
                        && f.name == asNames[i].name
                        && f.obj != asNames[i].obj; });
                    // DUBLICATE AGAIN
                    if (index != -1) {
                        asNames[i].as = asNames[i].name + ("" + c++);
                    }
                    else {
                        break;
                    }
                }
            }
        };
        // REMOVE DUBLICATES
        for (var i = 0; i < asNames.length; i++) {
            _loop_1(i);
        }
        //  برگردان
        exists = asNames.findIndex(function (f) {
            return f.name == Name && f.obj == obj;
        });
        if (exists != -1) {
            return asNames[exists].as;
        }
        else {
            console.error('could not find');
        }
    };
    var SqlQueryGeneratorComponent_1;
    SqlQueryGeneratorComponent.tableAsNames = [];
    SqlQueryGeneratorComponent.outputAsNames = [];
    SqlQueryGeneratorComponent = SqlQueryGeneratorComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sql-query-generator',
            template: __webpack_require__(/*! ./sql-query-generator.component.html */ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.html"),
            styles: [__webpack_require__(/*! ./sql-query-generator.component.css */ "./src/app/query-generator/query-generator/sql-query-generator/sql-query-generator.component.css")]
        }),
        __metadata("design:paramtypes", [_data_data_component__WEBPACK_IMPORTED_MODULE_4__["DataComponent"]])
    ], SqlQueryGeneratorComponent);
    return SqlQueryGeneratorComponent;
}());

var AsName = /** @class */ (function () {
    function AsName() {
    }
    return AsName;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.css":
/*!*****************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host >>> .form-group{\r\n  margin-top: 4px;\r\n  margin-right: 4px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-condition></app-condition>\n\n<table class=\"table col-md-12\" style=\"border:2px solid #0c5460\">\n  <thead>\n  <tr>\n    <!--  <th scope=\"col\" colspan=\"1\">\n        <button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\"><span>+</span> پارامتر ورودی\n        </button>\n      </th>-->\n    <th scope=\"col\" colspan=\"5\" style=\"text-align:center;font-weight: bold\">تنظیمات ستون ها</th>\n  </tr>\n  <tr>\n    <th scope=\"col\">در خروجی</th>\n    <th scope=\"col\">نام</th>\n    <th scope=\"col\">نام در جدول</th>\n    <th scope=\"col\">نام در کوئری</th>\n    <th scope=\"col\">نام  جدول</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr *ngFor=\"let property of DataComponent.selectedProperties;let tableI=index;\">\n    <th scope=\"row\"><input type=\"checkbox\" [(ngModel)]=\"property.Property.onOutPut\"></th>\n    <td>{{property.Property.NameInModel}}</td>\n    <td>{{property.Property.NameInTable}}</td>\n    <td>{{property.Property.ModelName}}</td>\n\n    <td><input type=\"text\" [(ngModel)]=\"property.NameInTableAsName\" (change)=\"AsNameChanged(property)\"></td>\n\n  </tr>\n  </tbody>\n</table>\n\n<table class=\"table col-md-12\" style=\"border:2px solid #0c5460\">\n  <thead>\n  <tr>\n    <th scope=\"col\" colspan=\"2\">\n      <button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\"><span>+</span> پارامتر ورودی\n      </button>\n\n      <button (click)=\"delete()\"\n              class=\"btn btn-danger\"><span>-</span> حذف\n      </button>\n    </th>\n    <th scope=\"col\" colspan=\"5\" style=\"text-align:center;font-weight: bold\">پارامتر های ورودی</th>\n  </tr>\n  <tr>\n    <th scope=\"col\">انتخاب</th>\n    <th scope=\"col\">نام در متد</th>\n    <th scope=\"col\">نام در SQL</th>\n    <th scope=\"col\">نام در کامنت</th>\n    <th scope=\"col\">نوع در مدل</th>\n    <th scope=\"col\">نوع در SQL</th>\n    <th scope=\"col\">عملیات</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr *ngFor=\"let property of DataComponent.addParameterFields;let tableI=index;\">\n    <th scope=\"row\"><input type=\"checkbox\" [(ngModel)]=\"property.isSelected\"></th>\n    <td>{{property.nameInMethod}}</td>\n    <td>{{property.nameInSQL}}</td>\n    <td>{{property.nameInComment}}</td>\n    <td>{{property.typeInModel}}</td>\n    <td>{{property.typeInSQL}}</td>\n    <td>\n      <button data-toggle=\"modal\" data-target=\"#conditionModal\" class=\"btn btn-primary\"><span>+</span> شرط\n      </button>\n      <button (click)=\"edit(property)\" data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\">\n        <span></span> ویرایش\n      </button>\n    </td>\n  </tr>\n  </tbody>\n</table>\n\n\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n     aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">پارامتر ورودی</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <dynamic-form-save [fields]=\"addParameterFields\" [isInline]=\"true\"></dynamic-form-save>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">بستن</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveParameter()\">ذخیره</button>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: ColumnSettingComponent, AddParameterForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnSettingComponent", function() { return ColumnSettingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddParameterForm", function() { return AddParameterForm; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting-dform-inputs.service */ "./src/app/query-generator/select-columns-and-join/column-setting/setting-dform-inputs.service.ts");
/* harmony import */ var _form_generator_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../form-generator/models */ "./src/app/form-generator/models.ts");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utility */ "./src/app/query-generator/utility.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ColumnSettingComponent = /** @class */ (function () {
    function ColumnSettingComponent(DataComponent, SettingDFormInputsService) {
        this.DataComponent = DataComponent;
        this.SettingDFormInputsService = SettingDFormInputsService;
        this.parameterForm = new AddParameterForm();
    }
    ColumnSettingComponent.prototype.AsNameChanged = function (p) {
        if (p.NameInTableAsName) {
            p.NameInTableAsName = '[' + p.NameInTableAsName + ']';
        }
    };
    ColumnSettingComponent.prototype.initAddParams = function () {
        this.addParameterFields = Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["generateDynamicFormFields"])(this.parameterForm);
        this.addParameterFields.find(function (a) { return a.name === "uniqId"; }).value = this.parameterForm.uniqId;
    };
    ColumnSettingComponent.prototype.delete = function () {
        this.DataComponent.addParameterFields =
            this.DataComponent.addParameterFields.filter(function (a) { return !a.isSelected; });
    };
    ColumnSettingComponent.prototype.ngOnInit = function () {
        this.initAddParams();
    };
    ColumnSettingComponent.prototype.saveParameter = function () {
        var _this = this;
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["mapFormInputValues"])(this.parameterForm, this.addParameterFields);
        var index = this.DataComponent.addParameterFields.findIndex(function (f) { return f.uniqId == _this.parameterForm.uniqId; });
        if (index == -1) {
            this.DataComponent.addParameterFields.push(Object(_utility__WEBPACK_IMPORTED_MODULE_5__["cloneAll"])(this.parameterForm));
        }
        else {
            this.DataComponent.addParameterFields[index] = Object(_utility__WEBPACK_IMPORTED_MODULE_5__["cloneAll"])(this.parameterForm);
        }
        this.parameterForm = new AddParameterForm();
        this.addParameterFields = Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["generateDynamicFormFields"])(this.parameterForm);
        this.addParameterFields.find(function (a) { return a.name === "uniqId"; }).value = this.parameterForm.uniqId;
    };
    ColumnSettingComponent.prototype.edit = function (property) {
        this.parameterForm = property;
        this.addParameterFields = Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["generateDynamicFormFields"])(property);
    };
    ColumnSettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            moduleId: 'ColumnSettingComponent',
            selector: 'app-column-setting',
            template: __webpack_require__(/*! ./column-setting.component.html */ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.html"),
            styles: [__webpack_require__(/*! ./column-setting.component.css */ "./src/app/query-generator/select-columns-and-join/column-setting/column-setting.component.css")],
            providers: [_setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_2__["SettingDFormInputsService"]]
        }),
        __metadata("design:paramtypes", [_data_data_component__WEBPACK_IMPORTED_MODULE_1__["DataComponent"],
            _setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_2__["SettingDFormInputsService"]])
    ], ColumnSettingComponent);
    return ColumnSettingComponent;
}());

var AddParameterForm = /** @class */ (function () {
    function AddParameterForm() {
        this.nameInSQL = null;
        this.nameInMethod = null;
        this.nameInComment = null;
        this.typeInModel = null;
        this.typeInSQL = null;
        /*
          @InputField('range', 'رنج', FieldType.Text)
          range = null;
        
          @InputField('defaultValue', 'مقدار اولیه ثابت', FieldType.Text)
          defaultValue = null;*/
        this.uniqId = null;
        this.nullable = null;
        this.uniqId = _utility__WEBPACK_IMPORTED_MODULE_5__["Utility"].generateNewId();
    }
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('nameInSQL', 'نام در SQL', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].Text),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "nameInSQL", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('nameInMethod', 'نام در متد', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].Text),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "nameInMethod", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('nameInComment', 'نام در کامنت', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].Text),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "nameInComment", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('typeInModel', 'نوع پارامتر ', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].DropDown, _setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_2__["SettingDFormInputsService"].getTypesInCode()),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "typeInModel", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('typeInSQL', 'نوع در SQL', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].DropDown, _setting_dform_inputs_service__WEBPACK_IMPORTED_MODULE_2__["SettingDFormInputsService"].getTypesInSQL()),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "typeInSQL", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])(_utility__WEBPACK_IMPORTED_MODULE_5__["Globals"].uniqId, _utility__WEBPACK_IMPORTED_MODULE_5__["Globals"].uniqId, _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].Hidden),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "uniqId", void 0);
    __decorate([
        Object(_form_generator_models__WEBPACK_IMPORTED_MODULE_3__["InputField"])('nullable', 'nullable', _model_model__WEBPACK_IMPORTED_MODULE_4__["FieldType"].Checkbox),
        __metadata("design:type", Object)
    ], AddParameterForm.prototype, "nullable", void 0);
    return AddParameterForm;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/column-setting/setting-dform-inputs.service.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/column-setting/setting-dform-inputs.service.ts ***!
  \********************************************************************************************************/
/*! exports provided: SettingDFormInputsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingDFormInputsService", function() { return SettingDFormInputsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _form_generator_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../form-generator/models */ "./src/app/form-generator/models.ts");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/model */ "./src/app/model/model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingDFormInputsService = /** @class */ (function () {
    function SettingDFormInputsService() {
    }
    SettingDFormInputsService_1 = SettingDFormInputsService;
    SettingDFormInputsService.getTypesInCode = function () {
        return SettingDFormInputsService_1.getKeyValueOfEnum(_model_model__WEBPACK_IMPORTED_MODULE_2__["PropertyType"]);
    };
    SettingDFormInputsService.getKeyValueOfEnum = function (enm) {
        var keys = Object.keys(enm).filter(function (k) { return typeof enm[k] === "number"; }); // ["A", "B"]
        //    const values = keys.map(k => E[k as any]);
        var arr = [];
        for (var i = 0; i < keys.length; i++) {
            var possibleValue = new _form_generator_models__WEBPACK_IMPORTED_MODULE_1__["PossibleValue"]();
            possibleValue.name = keys[i];
            possibleValue.value = keys[i];
            arr.push(possibleValue);
        }
        return arr;
    };
    SettingDFormInputsService.getTypesInSQL = function () {
        return SettingDFormInputsService_1.getKeyValueOfEnum(_model_model__WEBPACK_IMPORTED_MODULE_2__["PropertyInDatabaseType"]);
    };
    var SettingDFormInputsService_1;
    SettingDFormInputsService = SettingDFormInputsService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SettingDFormInputsService);
    return SettingDFormInputsService;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/condition/compute-design-tools-button-provider.service.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/condition/compute-design-tools-button-provider.service.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: ComputeDesignToolsButtonProviderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputeDesignToolsButtonProviderService", function() { return ComputeDesignToolsButtonProviderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _compute_design_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../compute-design/models */ "./src/app/compute-design/models.ts");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/data.component */ "./src/app/query-generator/data/data.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ComputeDesignToolsButtonProviderService = /** @class */ (function () {
    function ComputeDesignToolsButtonProviderService(DataComponent) {
        this.DataComponent = DataComponent;
    }
    ComputeDesignToolsButtonProviderService.prototype.getaddParameterFields = function () {
        var arr = [];
        for (var i = 0; i < this.DataComponent.addParameterFields.length; i++) {
            var o = {
                name: this.DataComponent.addParameterFields[i].nameInSQL,
                value: '@' + this.DataComponent.addParameterFields[i].nameInSQL,
                obj: this.DataComponent.addParameterFields[i]
            };
            arr.push(o);
        }
        return arr;
    };
    ComputeDesignToolsButtonProviderService.prototype.getWhereDesignTools = function () {
        var _this = this;
        var buttons = [];
        buttons.push(this.select('پارامتر ورودی', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one, this.getaddParameterFields(), function () { return _this.getaddParameterFields(); }));
        buttons.push(this.select('ستون ', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].many, this.getSelectedProperties(), function () { return _this.getSelectedProperties(); }));
        /* buttons.push(this.select('تک ستون ', SelectButtonType.many
           , this.getaddParameterFields(), () => this.getaddParameterFields()));
     */
        buttons.push(this.select('شرط', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one, this.getConditionTypes(), function () {
            return _this.getConditionTypes();
        }));
        buttons.push(this.select('Clauses', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one, this.getClauses(), function () {
            return _this.getClauses();
        }));
        buttons.push(this.select('محاسباتی', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one, this.getMathOperations(), function () {
            return _this.getMathOperations();
        }));
        buttons.push(this.between('And', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].And));
        buttons.push(this.between('Or', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].Or));
        buttons.push(this.input('مقدار دستی', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["InputButtonType"].text));
        buttons.push(this.input('مقدار عددی', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["InputButtonType"].number));
        buttons.push(this.between('(', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].start));
        buttons.push(this.between(')', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].end));
        buttons.push(this.const('IS NULL', _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["ConstButtonType"].notNull));
        return buttons;
    };
    ComputeDesignToolsButtonProviderService.prototype.select = function (name, type, possibleValues, fillContent) {
        var button = new _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButton"]();
        button.name = name;
        button.type = type;
        button.possibleValue = possibleValues;
        button.fillContent = fillContent;
        return button;
    };
    ComputeDesignToolsButtonProviderService.prototype.between = function (name, type) {
        var button = new _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButton"]();
        button.name = name;
        button.type = type;
        return button;
    };
    ComputeDesignToolsButtonProviderService.prototype.const = function (name, type) {
        var button = new _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["ConstButton"]();
        button.name = name;
        button.type = type;
        button.value = name;
        return button;
    };
    ComputeDesignToolsButtonProviderService.prototype.computed = function (name, type) {
        var button = new _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["ComputedButton"]();
        button.name = name;
        button.type = type;
        return button;
    };
    ComputeDesignToolsButtonProviderService.prototype.input = function (name, type) {
        var button = new _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["InputButton"]();
        button.name = name;
        button.type = type;
        return button;
    };
    ComputeDesignToolsButtonProviderService.prototype.getConditionTypes = function () {
        var types = [
            { name: '=', value: '=' },
            { name: '=>', value: '=>' },
            { name: '<=', value: '<=' },
            { name: '>', value: '>' },
            { name: '<', value: '<' },
            { name: '!', value: '!' },
            { name: 'like', value: 'like' },
            { name: 'not like', value: 'not like' },
        ];
        return types;
    };
    ComputeDesignToolsButtonProviderService.prototype.getClauses = function () {
        var types = [
            { name: 'max', value: '=' },
            { name: 'min', value: '=>' }
        ];
        return types;
    };
    ComputeDesignToolsButtonProviderService.prototype.getMathOperations = function () {
        var types = [
            { name: '*', value: '*' },
            { name: '+', value: '+' },
            { name: '-', value: '-' },
            { name: '/', value: '/' },
        ];
        return types;
    };
    ComputeDesignToolsButtonProviderService.prototype.getSelectedProperties = function () {
        var arr = [];
        for (var i = 0; i < this.DataComponent.selectedProperties.length; i++) {
            /*    var asName = SqlQueryGeneratorComponent.GetAsName(
                  this.DataComponent.selectedProperties[i].NameInTable, SqlQueryGeneratorComponent.outputAsNames, this.DataComponent.selectedProperties[i]);
               */ var asName = this.DataComponent.selectedProperties[i].NameInTableAsName;
            var tmpName = this.DataComponent.findModel(this.DataComponent.selectedProperties[i]).Model.TableName + "." + asName;
            var o = {
                name: tmpName,
                value: tmpName,
                obj: this.DataComponent.selectedProperties[i]
            };
            arr.push(o);
        }
        return arr;
    };
    ComputeDesignToolsButtonProviderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_data_data_component__WEBPACK_IMPORTED_MODULE_2__["DataComponent"]])
    ], ComputeDesignToolsButtonProviderService);
    return ComputeDesignToolsButtonProviderService;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/condition/condition.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/condition/condition.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/condition/condition.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/condition/condition.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <!--  <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item active\">\n          <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" href=\"#\">Link</a>\n        </li>\n        <li class=\"nav-item dropdown\">\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            Dropdown\n          </a>\n          <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n            <a class=\"dropdown-item\" href=\"#\">Action</a>\n            <a class=\"dropdown-item\" href=\"#\">Another action</a>\n            <div class=\"dropdown-divider\"></div>\n            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n          </div>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\n        </li>\n      </ul>-->\n    <ul class=\"navbar-nav\">\n      <li><a (click)=\"displayNow()\"\n             ><span class=\"oi\" data-glyph=\"menu\"></span></a></li>\n\n    </ul>\n  </div>\n  <a class=\"navbar-brand\">منو</a>\n\n</nav>\n\n\n<div class=\"ui-rtl\" dir=\"rtl\">\n<p-dialog header=\"طراحی Where\" [(visible)]=\"display\"\n          [modal]=\"true\" [responsive]=\"true\"  [minWidth]=\"1200\" [minY]=\"700\"\n          [maximizable]=\"true\" [baseZIndex]=\"10000\"\n[draggable]=\"true\" [closeOnEscape]=\"true\" (onHide)=\"export()\"\n>\n  <app-design-panel #appDesignPanel [computeButtonsInDesign]=\"computeButtonsInDesign\" [computeButtonsInTools]=\"computeButtonsInTools\"\n  ></app-design-panel>\n</p-dialog>\n\n</div>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/condition/condition.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/condition/condition.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConditionComponent", function() { return ConditionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _compute_design_tools_button_provider_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compute-design-tools-button-provider.service */ "./src/app/query-generator/select-columns-and-join/condition/compute-design-tools-button-provider.service.ts");
/* harmony import */ var _sqlexporter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sqlexporter.service */ "./src/app/query-generator/select-columns-and-join/condition/sqlexporter.service.ts");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _compute_design_design_panel_design_panel_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../compute-design/design-panel/design-panel.component */ "./src/app/compute-design/design-panel/design-panel.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConditionComponent = /** @class */ (function () {
    function ConditionComponent(ComputeDesignToolsButtonProviderService, SQLExportservice, DataComponent) {
        this.ComputeDesignToolsButtonProviderService = ComputeDesignToolsButtonProviderService;
        this.SQLExportservice = SQLExportservice;
        this.DataComponent = DataComponent;
        this.computeButtonsInDesign = [];
    }
    ConditionComponent.prototype.export = function () {
        this.DataComponent.WhereComputeButtons = this.appDesignPanel.computeButtonsInDesign;
        this.DataComponent.WhereStatement = this.SQLExportservice.export(this.appDesignPanel.computeButtonsInDesign);
    };
    ConditionComponent.prototype.displayNow = function () {
        this.display = true;
        this.ngOnInit();
    };
    ConditionComponent.prototype.ngOnInit = function () {
        if (!this.computeButtonsInTools) {
            //INIT
            this.computeButtonsInTools =
                this.ComputeDesignToolsButtonProviderService.getWhereDesignTools();
        }
        this.DataComponent.WhereComputeButtons = this.DataComponent.WhereComputeButtons.sort(function (a, b) {
            if (a.order == b.order)
                return 0;
            else if (a.order > b.order)
                return +1;
            else if (a.order < b.order)
                return -1;
        });
        this.appDesignPanel.computeButtonsInDesign = this.DataComponent.WhereComputeButtons;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('appDesignPanel'),
        __metadata("design:type", _compute_design_design_panel_design_panel_component__WEBPACK_IMPORTED_MODULE_4__["DesignPanelComponent"])
    ], ConditionComponent.prototype, "appDesignPanel", void 0);
    ConditionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-condition',
            template: __webpack_require__(/*! ./condition.component.html */ "./src/app/query-generator/select-columns-and-join/condition/condition.component.html"),
            styles: [__webpack_require__(/*! ./condition.component.css */ "./src/app/query-generator/select-columns-and-join/condition/condition.component.css")],
            providers: [_compute_design_tools_button_provider_service__WEBPACK_IMPORTED_MODULE_1__["ComputeDesignToolsButtonProviderService"]]
        }),
        __metadata("design:paramtypes", [_compute_design_tools_button_provider_service__WEBPACK_IMPORTED_MODULE_1__["ComputeDesignToolsButtonProviderService"],
            _sqlexporter_service__WEBPACK_IMPORTED_MODULE_2__["SQLExporterService"],
            _data_data_component__WEBPACK_IMPORTED_MODULE_3__["DataComponent"]])
    ], ConditionComponent);
    return ConditionComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/condition/sqlexporter.service.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/condition/sqlexporter.service.ts ***!
  \******************************************************************************************/
/*! exports provided: SQLExporterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SQLExporterService", function() { return SQLExporterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _compute_design_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../compute-design/models */ "./src/app/compute-design/models.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SQLExporterService = /** @class */ (function () {
    function SQLExporterService() {
    }
    SQLExporterService.prototype.export = function (computeButtonsInDesign) {
        if (!computeButtonsInDesign) {
            console.error('computeButtonsInDesign is null');
        }
        var sql = '';
        for (var i = 0; i < computeButtonsInDesign.length; i++) {
            sql += ' ';
            switch (computeButtonsInDesign[i]['type']) {
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].one:
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].many:
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["SelectButtonType"].multi:
                    sql += computeButtonsInDesign[i].value;
                    break;
                case (_compute_design_models__WEBPACK_IMPORTED_MODULE_1__["InputButtonType"].number):
                    sql += computeButtonsInDesign[i].value;
                    break;
                case (_compute_design_models__WEBPACK_IMPORTED_MODULE_1__["InputButtonType"].text):
                    sql += "N'" + computeButtonsInDesign[i].value + "'";
                    break;
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].And:
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].Or:
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].end:
                case _compute_design_models__WEBPACK_IMPORTED_MODULE_1__["BetweenButtonType"].start:
                    sql += computeButtonsInDesign[i].name;
                    break;
                case (_compute_design_models__WEBPACK_IMPORTED_MODULE_1__["ConstButtonType"].notNull):
                    sql += computeButtonsInDesign[i].name;
                    break;
                default:
                    sql += computeButtonsInDesign[i].name;
            }
        }
        return sql;
    };
    SQLExporterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], SQLExporterService);
    return SQLExporterService;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/design-query/design-query.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/design-query/design-query.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  design-query works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/design-query/design-query.component.ts ***!
  \************************************************************************************************/
/*! exports provided: DesignQueryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignQueryComponent", function() { return DesignQueryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DesignQueryComponent = /** @class */ (function () {
    function DesignQueryComponent() {
    }
    DesignQueryComponent.prototype.ngOnInit = function () {
    };
    DesignQueryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-design-query',
            template: __webpack_require__(/*! ./design-query.component.html */ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.html"),
            styles: [__webpack_require__(/*! ./design-query.component.css */ "./src/app/query-generator/select-columns-and-join/design-query/design-query.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DesignQueryComponent);
    return DesignQueryComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/menu/menu.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/menu/menu.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/menu/menu.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/menu/menu.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  menu works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/menu/menu.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/menu/menu.component.ts ***!
  \********************************************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/query-generator/select-columns-and-join/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.css */ "./src/app/query-generator/select-columns-and-join/menu/menu.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  select-columns-and-join works!\n</p>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: SelectColumnsAndJoinComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectColumnsAndJoinComponent", function() { return SelectColumnsAndJoinComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectColumnsAndJoinComponent = /** @class */ (function () {
    function SelectColumnsAndJoinComponent() {
    }
    SelectColumnsAndJoinComponent.prototype.ngOnInit = function () {
    };
    SelectColumnsAndJoinComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-columns-and-join',
            template: __webpack_require__(/*! ./select-columns-and-join.component.html */ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.html"),
            styles: [__webpack_require__(/*! ./select-columns-and-join.component.css */ "./src/app/query-generator/select-columns-and-join/select-columns-and-join.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SelectColumnsAndJoinComponent);
    return SelectColumnsAndJoinComponent;
}());



/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/table-design/table-design.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table *{\r\n  font-size: 12px;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/table-design/table-design.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"row\" #myBounds [style.height]=\"panelHeight+'px'\">\n  <table  [bounds]=\"myBounds\" [inBounds]=\"true\" #tables ngDraggable class=\"table col-md-1\" style=\"border:2px solid #17a2b8\"\n         (movingOffset)=\"onMoving($event)\" [attr.Id]=\"'pt'+table.uniqId\"\n         *ngFor=\"let table of DataComponent.models;let tableI=index;\">\n    <thead>\n    <tr >\n      <th scope=\"col\" colspan=\"1\">\n        <input type=\"radio\" name=\"selectMainTable\" [attr.Id]=\"'t'+table.uniqId\" [attr.checked]=\"table.IsMainTable ? 'checked' : null \"  (click)=\"selectMainTable(table)\">\n      </th>\n\n      <th scope=\"col\" colspan=\"3\" style=\"text-align:center;font-weight: bold\">\n\n        {{table.Model && table.Model.Name ? table.Model.Name : null}}\n\n      </th>\n    </tr>\n    <tr>\n      <th scope=\"col\">+</th>\n      <th  style=\"text-align: center\"><input type=\"checkbox\" (click)=\"toggleAllProperties(table.Model)\"></th>\n      <th >نام</th>\n      <th scope=\"col\">-</th>\n    </tr>\n    </thead>\n    <tbody>\n\n\n    <ng-template *ngIf=\"table && table.Model && table.Model.Properties\"  [ngForOf]=\"table.Model.Properties\" let-property ngFor let-propertyI=\"index\">\n    <tr  >\n      <th scope=\"row\"><input type=\"radio\" [attr.Id]=\"'r'+property.Id\" #rightRadio (click)=\"rightJoin(tableI,propertyI,$event.target)\"></th>\n      <td><input type=\"checkbox\" (click)=\"selectColumn(property)\" [attr.checked]=\"property.onOutPut? 'checked' : null\"></td>\n      <td>{{property.NameInModel}}</td>\n      <td><input type=\"radio\" [attr.Id]=\"'l'+property.Id\" (click)=\"leftJoin(tableI,propertyI,$event.target)\"></td>\n    </tr>\n    </ng-template>\n    </tbody>\n  </table>\n\n<!--\n\n\n\n  <table ngDraggable class=\"table col-md-1\" style=\"border:2px solid #17a2b8\"\n         *ngFor=\"let table of joinTables;let tableI=index;\">\n    <thead>\n    <tr>\n      <th scope=\"col\"></th>\n      <th scope=\"col\">relashionShip</th>\n      <th scope=\"col\"></th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr >\n      <th >{{table.leftProperty.NameInModel}}</th>\n      <th ></th>\n      <td>{{table.rightProperty.NameInModel}}</td>\n    </tr>\n    </tbody>\n  </table>\n-->\n\n\n  <svg style=\"overflow: hidden;\n    vertical-align: middle;\n    width: 100%;\n    height: 100%;\n    z-index: -1;\n    position: absolute;\n}\">\n    <ng-template let-line ngFor [ngForOf]=\"DataComponent.joinTables\">\n      <line   [attr.x1]=\"line.lelementX | HoldValue\" [attr.y1]=\"line.lelementY | HoldValue\"\n            [attr.x2]=\"line.relementX | HoldValue\" [attr.y2]=\"line.relementY | HoldValue\"\n            style=\"stroke:rgb(255,0,0);stroke-width:2\"></line>\n    </ng-template>\n  </svg>\n</div>\n"

/***/ }),

/***/ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/query-generator/select-columns-and-join/table-design/table-design.component.ts ***!
  \************************************************************************************************/
/*! exports provided: TableDesignComponent, JoinTable, JoinTableType, HoldValuePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableDesignComponent", function() { return TableDesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinTable", function() { return JoinTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinTableType", function() { return JoinTableType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoldValuePipe", function() { return HoldValuePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_data_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/data.component */ "./src/app/query-generator/data/data.component.ts");
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/model */ "./src/app/model/model.ts");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility */ "./src/app/query-generator/utility.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TableDesignComponent = /** @class */ (function () {
    function TableDesignComponent(DataComponent) {
        this.DataComponent = DataComponent;
        this.DataComponent.tableDesign_active = this;
    }
    TableDesignComponent_1 = TableDesignComponent;
    TableDesignComponent.prototype.ngOnInit = function () {
    };
    TableDesignComponent.prototype.makeJoin = function (left, right) {
        if (left && right) {
            var join = new JoinTable();
            if (!this.rightJoinTable.LeftJoinTables) {
                this.rightJoinTable.RightJoinTables = [];
                this.rightJoinTable.LeftJoinTables = [];
            }
            if (!this.leftJoinTable.RightJoinTables) {
                this.leftJoinTable.RightJoinTables = [];
                this.leftJoinTable.LeftJoinTables = [];
            }
            join.rightTable = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.rightJoinTable);
            join.rightTableUniqId = this.rightJoinTable.uniqId;
            join.leftTableUniqId = this.leftJoinTable.uniqId;
            join.leftTable = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.leftJoinTable);
            join.rightProperty = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.rightJoinProperty);
            join.leftProperty = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["cloneAll"])(this.leftJoinProperty);
            join.relement = this.relements.pop();
            join.lelement = this.lelements.pop();
            var finded = this.DataComponent.joinTables.find(function (j) { return j.leftTable == join.leftTable
                && j.rightTable == join.rightTable &&
                j.leftProperty == join.leftProperty &&
                j.rightProperty == join.rightProperty; });
            if (!finded) {
                join.leftTable.LeftJoinTables.push(join);
                join.rightTable.RightJoinTables.push(join);
                join.joinType = JoinTableType.Join;
                this.DataComponent.joinTables.push(join);
                this.onMoving(null);
                this.leftJoinTable = null;
                this.rightJoinTable = null;
                this.rightJoinProperty = null;
                this.leftJoinProperty = null;
            }
        }
    };
    TableDesignComponent.prototype.rightJoin = function (table, property, rightRadio) {
        this.relements = [];
        this.relements.push(rightRadio);
        this.getTableAndProperty('rightJoinTable', 'rightJoinProperty', table, property, rightRadio);
        this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
    };
    TableDesignComponent.prototype.getTableAndProperty = function (WhichTable, whichproperty, table, property, lefttRadio) {
        this[WhichTable] = this.DataComponent.models[table];
        var prop = new _model_model__WEBPACK_IMPORTED_MODULE_2__["PropertyModel"](this.DataComponent.models[table].Model.Properties[property]);
        // prop.Property = 
        this[whichproperty] = prop;
        //  this[WhichTable][whichElement] = lefttRadio;
        //  let rect:any = lefttRadio.getBoundingClientRect();
        /*    this[whichproperty].X = window.scrollX+parseInt( rect.left.toString())+20;
         this[whichproperty].Y =window.scrollY+ parseInt(rect.top.toString()) -30;;
         */
        console.log('left', $(lefttRadio).offset().left);
        console.log('top', $(lefttRadio).offset().top);
        /* this[whichproperty].X = $(lefttRadio).offset().left;
          this[whichproperty].Y =$(lefttRadio).offset().top;
      *!/*/
    };
    TableDesignComponent.prototype.leftJoin = function (table, property, lefttRadio) {
        this.lelements = [];
        this.lelements.push(lefttRadio);
        this.getTableAndProperty('leftJoinTable', 'leftJoinProperty', table, property, lefttRadio);
        this.makeJoin(this.leftJoinProperty, this.rightJoinProperty);
    };
    TableDesignComponent.prototype.selectColumn = function (property) {
        var index = this.DataComponent.selectedProperties.findIndex(function (s) { return s.Property.uniqId == property.uniqId; });
        if (index != -1) {
            this.DataComponent.selectedProperties[index].onOutPut = false;
            property.onOutPut = false;
            this.DataComponent.selectedProperties.splice(index, 1);
        }
        else {
            var propertyModel = new _model_model__WEBPACK_IMPORTED_MODULE_2__["PropertyModel"](property);
            // propertyModel.Property = property;
            propertyModel.PropertyId = property.Id;
            propertyModel.onOutPut = true;
            property.onOutPut = true;
            // یعنی پروپرتی استفاده شده است
            property.uniqId = _utility__WEBPACK_IMPORTED_MODULE_3__["Utility"].generateNewIdNumber();
            TableDesignComponent_1.makeSureUniqIdIsDistinct(this.DataComponent.selectedProperties, 'uniqId', propertyModel);
            this.DataComponent.selectedProperties.push(propertyModel);
        }
    };
    TableDesignComponent.prototype.getPossiionX = function (element) {
        var rect = element.getBoundingClientRect();
        var X = window.scrollX + parseInt(rect.left.toString()) + 3;
        return X;
        //    return $(element).offset().left;
    };
    TableDesignComponent.prototype.getElementFromDom = function () {
    };
    TableDesignComponent.prototype.onMoving = function (event) {
        for (var i = 0; i < this.DataComponent.joinTables.length; i++) {
            /*  if(!this.DataComponent.joinTables[i].leftTable.element){
                this.DataComponent.joinTables[i].leftTable.element=this.getElementFromDom(this.DataComponent.joinTables[i].leftTable.element);
              }*/
            this.DataComponent.joinTables[i].lelementY = this.getPossiionY(this.DataComponent.joinTables[i].lelement);
            this.DataComponent.joinTables[i].lelementX = this.getPossiionX(this.DataComponent.joinTables[i].lelement);
            this.DataComponent.joinTables[i].relementY = this.getPossiionY(this.DataComponent.joinTables[i].relement);
            this.DataComponent.joinTables[i].relementX = this.getPossiionX(this.DataComponent.joinTables[i].relement);
        }
    };
    TableDesignComponent.prototype.getPossiionY = function (element) {
        var rect = element.getBoundingClientRect();
        var Y = window.scrollY + parseInt(rect.top.toString()) - 150;
        return Y;
        //return $(element).offset().top;
    };
    TableDesignComponent.prototype.selectMainTable = function (table) {
        this.DataComponent.mainTable = table;
        this.DataComponent.models.forEach(function (m) { return m.IsMainTable = false; });
        table.IsMainTable = true;
        // this.DataComponent.mainTable.isMainTable=true;
    };
    TableDesignComponent.prototype.toggleAllProperties = function (table) {
        console.log(table);
        for (var i = 0; i < table.Properties.length; i++) {
            this.selectColumn(table.Properties[i]);
        }
    };
    TableDesignComponent.makeSureUniqIdIsDistinct = function (selectedProperties, uniqId, propertyModel) {
        if (!propertyModel[uniqId]) {
            propertyModel[uniqId] = _utility__WEBPACK_IMPORTED_MODULE_3__["Utility"].generateNewIdNumber();
        }
        var any = selectedProperties.find(function (s) { return s[uniqId] == propertyModel[uniqId]; });
        if (any) {
            propertyModel[uniqId] = null;
            return this.makeSureUniqIdIsDistinct(propertyModel[uniqId], uniqId, propertyModel);
        }
        return propertyModel[uniqId];
    };
    var TableDesignComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TableDesignComponent.prototype, "panelHeight", void 0);
    TableDesignComponent = TableDesignComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-design',
            template: __webpack_require__(/*! ./table-design.component.html */ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.html"),
            styles: [__webpack_require__(/*! ./table-design.component.css */ "./src/app/query-generator/select-columns-and-join/table-design/table-design.component.css")],
            moduleId: 'TableDesignComponent'
        }),
        __metadata("design:paramtypes", [_data_data_component__WEBPACK_IMPORTED_MODULE_1__["DataComponent"]])
    ], TableDesignComponent);
    return TableDesignComponent;
}());

var JoinTable = /** @class */ (function (_super) {
    __extends(JoinTable, _super);
    function JoinTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uniqId = _utility__WEBPACK_IMPORTED_MODULE_3__["Utility"].generateNewIdNumber();
        return _this;
    }
    return JoinTable;
}(_model_model__WEBPACK_IMPORTED_MODULE_2__["BaseEntity"]));

var JoinTableType;
(function (JoinTableType) {
    JoinTableType[JoinTableType["InnerJoin"] = 0] = "InnerJoin";
    JoinTableType[JoinTableType["LeftJoin"] = 1] = "LeftJoin";
    JoinTableType[JoinTableType["Rightjoin"] = 2] = "Rightjoin";
    JoinTableType[JoinTableType["Join"] = 3] = "Join";
    JoinTableType[JoinTableType["OuterInnerJoin"] = 4] = "OuterInnerJoin";
    JoinTableType[JoinTableType["OuterLeftJoin"] = 5] = "OuterLeftJoin";
    JoinTableType[JoinTableType["OuterRightjoin"] = 6] = "OuterRightjoin";
    JoinTableType[JoinTableType["OuterJoin"] = 7] = "OuterJoin";
})(JoinTableType || (JoinTableType = {}));


/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
var HoldValuePipe = /** @class */ (function () {
    function HoldValuePipe() {
    }
    HoldValuePipe.prototype.transform = function (value) {
        return value;
    };
    HoldValuePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'HoldValue' })
    ], HoldValuePipe);
    return HoldValuePipe;
}());



/***/ })

}]);
//# sourceMappingURL=query-generator-query-generator-module.js.map