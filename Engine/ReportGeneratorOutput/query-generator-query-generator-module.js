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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @param {?} e
     * @param {?=} el
     * @return {?}
     */
    Position.fromEvent = /**
     * @param {?} e
     * @param {?=} el
     * @return {?}
     */
    function (e, el) {
        if (el === void 0) { el = null; }
        /**
         * Fix issue: Resize doesn't work on Windows10 IE11 (and on some windows 7 IE11)
         * https://github.com/xieziyu/angular2-draggable/issues/164
         * e instanceof MouseEvent check returns false on IE11
         */
        if (this.isMouseEvent(e)) {
            return new Position(e.clientX, e.clientY);
        }
        else {
            if (el === null || e.changedTouches.length === 1) {
                return new Position(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
            /**
             * Fix issue: Multiple phone draggables at the same time
             * https://github.com/xieziyu/angular2-draggable/issues/128
             */
            for (var i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].target === el) {
                    return new Position(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                }
            }
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Position.isMouseEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return Object.prototype.toString.apply(e).indexOf('MouseEvent') === 8;
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
        /** @type {?} */
        var pos = new Position(0, 0);
        if (window) {
            /** @type {?} */
            var computed = window.getComputedStyle(el);
            if (computed) {
                /** @type {?} */
                var x = parseInt(computed.getPropertyValue('left'), 10);
                /** @type {?} */
                var y = parseInt(computed.getPropertyValue('top'), 10);
                pos.x = isNaN(x) ? 0 : x;
                pos.y = isNaN(y) ? 0 : y;
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
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    Position.prototype.add = /**
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    function (p) {
        (/** @type {?} */ (this)).x += p.x;
        (/** @type {?} */ (this)).y += p.y;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    Position.prototype.subtract = /**
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    function (p) {
        (/** @type {?} */ (this)).x -= p.x;
        (/** @type {?} */ (this)).y -= p.y;
        return (/** @type {?} */ (this));
    };
    /**
     * @param {?} n
     * @return {?}
     */
    Position.prototype.multiply = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.x *= n;
        this.y *= n;
    };
    /**
     * @param {?} n
     * @return {?}
     */
    Position.prototype.divide = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.x /= n;
        this.y /= n;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    Position.prototype.reset = /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        (/** @type {?} */ (this)).x = 0;
        (/** @type {?} */ (this)).y = 0;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    Position.prototype.set = /**
     * @template THIS
     * @this {THIS}
     * @param {?} p
     * @return {THIS}
     */
    function (p) {
        (/** @type {?} */ (this)).x = p.x;
        (/** @type {?} */ (this)).y = p.y;
        return (/** @type {?} */ (this));
    };
    return Position;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HelperBlock = /** @class */ (function () {
    function HelperBlock(parent, renderer) {
        this.parent = parent;
        this.renderer = renderer;
        this._added = false;
        // generate helper div
        /** @type {?} */
        var helper = renderer.createElement('div');
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.draggingSub = null;
        /**
         * Bugfix: iFrames, and context unrelated elements block all events, and are unusable
         * https://github.com/xieziyu/angular2-draggable/issues/84
         */
        this._helperBlock = null;
        this.started = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.stopped = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.edge = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
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
         * Lock axis: 'x' or 'y'
         */
        this.lockAxis = null;
        /**
         * Emit position offsets when moving
         */
        this.movingOffset = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * Emit position offsets when put back
         */
        this.endOffset = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
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
                /** @type {?} */
                var element = this.getDragEl();
                if (this.allowDrag) {
                    this.renderer.addClass(element, 'ng-draggable');
                }
                else {
                    this.putBack();
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
            /** @type {?} */
            var element = this.getDragEl();
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
        if (this.draggingSub) {
            this.draggingSub.unsubscribe();
        }
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
            /** @type {?} */
            var p = changes['position'].currentValue;
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
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.getDragEl = /**
     * @private
     * @return {?}
     */
    function () {
        return this.handle ? this.handle : this.el.nativeElement;
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
     * @private
     * @param {?} p
     * @return {?}
     */
    AngularDraggableDirective.prototype.moveTo = /**
     * @private
     * @param {?} p
     * @return {?}
     */
    function (p) {
        if (this.orignal) {
            p.subtract(this.orignal);
            this.tempTrans.set(p);
            this.tempTrans.divide(this.scale);
            this.transform();
            if (this.bounds) {
                this.edge.emit(this.boundsCheck());
            }
            this.movingOffset.emit(this.currTrans.value);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.transform = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var translateX = this.tempTrans.x + this.oldTrans.x;
        /** @type {?} */
        var translateY = this.tempTrans.y + this.oldTrans.y;
        if (this.lockAxis === 'x') {
            translateX = this.oldTrans.x;
            this.tempTrans.x = 0;
        }
        else if (this.lockAxis === 'y') {
            translateY = this.oldTrans.y;
            this.tempTrans.y = 0;
        }
        // Snap to grid: by grid size
        if (this.gridSize > 1) {
            translateX = Math.round(translateX / this.gridSize) * this.gridSize;
            translateY = Math.round(translateY / this.gridSize) * this.gridSize;
        }
        /** @type {?} */
        var value = "translate(" + Math.round(translateX) + "px, " + Math.round(translateY) + "px)";
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
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.pickUp = /**
     * @private
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
            /** @type {?} */
            var element = this.getDragEl();
            this.renderer.addClass(element, 'ng-dragging');
            /**
             * Fix performance issue:
             * https://github.com/xieziyu/angular2-draggable/issues/112
             */
            this.subscribeEvents();
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.subscribeEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.draggingSub = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mousemove', { passive: false }).subscribe(function (event) { return _this.onMouseMove((/** @type {?} */ (event))); });
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchmove', { passive: false }).subscribe(function (event) { return _this.onMouseMove((/** @type {?} */ (event))); }));
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mouseup', { passive: false }).subscribe(function () { return _this.putBack(); }));
        // checking if browser is IE or Edge - https://github.com/xieziyu/angular2-draggable/issues/153
        /** @type {?} */
        var isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
        if (!isIEOrEdge) {
            this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mouseleave', { passive: false }).subscribe(function () { return _this.putBack(); }));
        }
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchend', { passive: false }).subscribe(function () { return _this.putBack(); }));
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchcancel', { passive: false }).subscribe(function () { return _this.putBack(); }));
    };
    /**
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.unsubscribeEvents = /**
     * @private
     * @return {?}
     */
    function () {
        this.draggingSub.unsubscribe();
        this.draggingSub = null;
    };
    /**
     * @return {?}
     */
    AngularDraggableDirective.prototype.boundsCheck = /**
     * @return {?}
     */
    function () {
        if (this.bounds) {
            /** @type {?} */
            var boundary = this.bounds.getBoundingClientRect();
            /** @type {?} */
            var elem = this.el.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var result = {
                'top': this.outOfBounds.top ? true : boundary.top < elem.top,
                'right': this.outOfBounds.right ? true : boundary.right > elem.right,
                'bottom': this.outOfBounds.bottom ? true : boundary.bottom > elem.bottom,
                'left': this.outOfBounds.left ? true : boundary.left < elem.left
            };
            if (this.inBounds) {
                if (!result.top) {
                    this.tempTrans.y -= (elem.top - boundary.top) / this.scale;
                }
                if (!result.bottom) {
                    this.tempTrans.y -= (elem.bottom - boundary.bottom) / this.scale;
                }
                if (!result.right) {
                    this.tempTrans.x -= (elem.right - boundary.right) / this.scale;
                }
                if (!result.left) {
                    this.tempTrans.x -= (elem.left - boundary.left) / this.scale;
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
     * @private
     * @return {?}
     */
    AngularDraggableDirective.prototype.putBack = /**
     * @private
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
            /** @type {?} */
            var element = this.getDragEl();
            this.renderer.removeClass(element, 'ng-dragging');
            /**
             * Fix performance issue:
             * https://github.com/xieziyu/angular2-draggable/issues/112
             */
            this.unsubscribeEvents();
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
        for (var child in element.children) {
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
        /** @type {?} */
        var target = event.target || event.srcElement;
        if (this.handle !== undefined && !this.checkHandleTarget(target, this.handle)) {
            return;
        }
        // 3. if allow drag is set to false, ignore the mousedown
        if (this.allowDrag === false) {
            return;
        }
        if (this.preventDefaultEvent) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.orignal = Position.fromEvent(event, this.getDragEl());
        this.pickUp();
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
            this.moveTo(Position.fromEvent(event, this.getDragEl()));
        }
    };
    AngularDraggableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[ngDraggable]',
                    exportAs: 'ngDraggable'
                },] }
    ];
    /** @nocollapse */
    AngularDraggableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"] }
    ]; };
    AngularDraggableDirective.propDecorators = {
        started: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        stopped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        edge: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        handle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        bounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        outOfBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        gridSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        zIndexMoving: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        zIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        inBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        trackPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        scale: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        preventDefaultEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        position: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        lockAxis: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        movingOffset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        endOffset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        ngDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        onMouseDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"], args: ['mousedown', ['$event'],] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"], args: ['touchstart', ['$event'],] }]
    };
    return AngularDraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var handle = renderer.createElement('div');
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
        handle.addEventListener('mousedown', this._onResize, { passive: false });
        handle.addEventListener('touchstart', this._onResize, { passive: false });
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var size = new Size(0, 0);
        if (window) {
            /** @type {?} */
            var computed = window.getComputedStyle(el);
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
     * @template THIS
     * @this {THIS}
     * @param {?} s
     * @return {THIS}
     */
    Size.prototype.set = /**
     * @template THIS
     * @this {THIS}
     * @param {?} s
     * @return {THIS}
     */
    function (s) {
        (/** @type {?} */ (this)).width = s.width;
        (/** @type {?} */ (this)).height = s.height;
        return (/** @type {?} */ (this));
    };
    return Size;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._directionChanged = null;
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
        this.draggingSub = null;
        this._adjusted = false;
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
         * Whether to prevent default event
         */
        this.preventDefaultEvent = true;
        /**
         * emitted when start resizing
         */
        this.rzStart = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * emitted when start resizing
         */
        this.rzResizing = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * emitted when stop resizing
         */
        this.rzStop = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
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
        /** @type {?} */
        var elm = this.el.nativeElement;
        this._initSize = Size.getCurrent(elm);
        this._initPos = Position.getCurrent(elm);
        this._currSize = Size.copy(this._initSize);
        this._currPos = Position.copy(this._initPos);
        this.updateAspectRatio();
        this.updateContainment();
    };
    /** A method to reset size */
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
    /** A method to get current status */
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.updateResizable = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.el.nativeElement;
        // clear handles:
        this.renderer.removeClass(element, 'ng-resizable');
        this.removeHandles();
        // create new ones:
        if (this._resizable) {
            this.renderer.addClass(element, 'ng-resizable');
            this.createHandles();
        }
    };
    /** Use it to update aspect */
    /**
     * Use it to update aspect
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.updateAspectRatio = /**
     * Use it to update aspect
     * @private
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
            /** @type {?} */
            var r = Number(this.rzAspectRatio);
            this._aspectRatio = isNaN(r) ? 0 : r;
        }
    };
    /** Use it to update containment */
    /**
     * Use it to update containment
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.updateContainment = /**
     * Use it to update containment
     * @private
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
    /** Use it to create handle divs */
    /**
     * Use it to create handle divs
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.createHandles = /**
     * Use it to create handle divs
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b;
        if (!this.rzHandles) {
            return;
        }
        /** @type {?} */
        var tmpHandleTypes;
        if (typeof this.rzHandles === 'string') {
            if (this.rzHandles === 'all') {
                tmpHandleTypes = ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'];
            }
            else {
                tmpHandleTypes = this.rzHandles.replace(/ /g, '').toLowerCase().split(',');
            }
            try {
                for (var tmpHandleTypes_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tmpHandleTypes), tmpHandleTypes_1_1 = tmpHandleTypes_1.next(); !tmpHandleTypes_1_1.done; tmpHandleTypes_1_1 = tmpHandleTypes_1.next()) {
                    var type = tmpHandleTypes_1_1.value;
                    // default handle theme: ng-resizable-$type.
                    /** @type {?} */
                    var handle = this.createHandleByType(type, "ng-resizable-" + type);
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
                for (var tmpHandleTypes_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tmpHandleTypes), tmpHandleTypes_2_1 = tmpHandleTypes_2.next(); !tmpHandleTypes_2_1.done; tmpHandleTypes_2_1 = tmpHandleTypes_2.next()) {
                    var type = tmpHandleTypes_2_1.value;
                    // custom handle theme.
                    /** @type {?} */
                    var handle = this.createHandleByType(type, this.rzHandles[type]);
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
    };
    /** Use it to create a handle */
    /**
     * Use it to create a handle
     * @private
     * @param {?} type
     * @param {?} css
     * @return {?}
     */
    AngularResizableDirective.prototype.createHandleByType = /**
     * Use it to create a handle
     * @private
     * @param {?} type
     * @param {?} css
     * @return {?}
     */
    function (type, css) {
        /** @type {?} */
        var _el = this.el.nativeElement;
        if (!type.match(/^(se|sw|ne|nw|n|e|s|w)$/)) {
            console.error('Invalid handle type:', type);
            return null;
        }
        return new ResizeHandle(_el, this.renderer, type, css, this.onMouseDown.bind(this));
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.removeHandles = /**
     * @private
     * @return {?}
     */
    function () {
        var e_3, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this._handleType), _c = _b.next(); !_c.done; _c = _b.next()) {
                var type = _c.value;
                this._handles[type].dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this._handleType = [];
        this._handles = {};
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
        if (this.preventDefaultEvent) {
            // prevent default events
            event.stopPropagation();
            event.preventDefault();
        }
        if (!this._handleResizing) {
            this._origMousePos = Position.fromEvent(event);
            this.startResize(handle);
            this.subscribeEvents();
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.subscribeEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.draggingSub = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mousemove', { passive: false }).subscribe(function (event) { return _this.onMouseMove((/** @type {?} */ (event))); });
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchmove', { passive: false }).subscribe(function (event) { return _this.onMouseMove((/** @type {?} */ (event))); }));
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mouseup', { passive: false }).subscribe(function () { return _this.onMouseLeave(); }));
        // fix for issue #164
        /** @type {?} */
        var isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
        if (!isIEOrEdge) {
            this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'mouseleave', { passive: false }).subscribe(function () { return _this.onMouseLeave(); }));
        }
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchend', { passive: false }).subscribe(function () { return _this.onMouseLeave(); }));
        this.draggingSub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'touchcancel', { passive: false }).subscribe(function () { return _this.onMouseLeave(); }));
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.unsubscribeEvents = /**
     * @private
     * @return {?}
     */
    function () {
        this.draggingSub.unsubscribe();
        this.draggingSub = null;
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
            this.unsubscribeEvents();
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
     * @private
     * @param {?} handle
     * @return {?}
     */
    AngularResizableDirective.prototype.startResize = /**
     * @private
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        /** @type {?} */
        var elm = this.el.nativeElement;
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.stopResize = /**
     * @private
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.onResizing = /**
     * @private
     * @return {?}
     */
    function () {
        this.rzResizing.emit(this.getResizingEvent());
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.getResizingEvent = /**
     * @private
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
            },
            direction: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this._directionChanged),
        };
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.updateDirection = /**
     * @private
     * @return {?}
     */
    function () {
        this._direction = {
            n: !!this._handleResizing.type.match(/n/),
            s: !!this._handleResizing.type.match(/s/),
            w: !!this._handleResizing.type.match(/w/),
            e: !!this._handleResizing.type.match(/e/)
        };
        this._directionChanged = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this._direction);
        // if aspect ration should be preserved:
        if (this.rzAspectRatio) {
            // if north then west (unless ne)
            if (this._directionChanged.n && !this._directionChanged.e) {
                this._directionChanged.w = true;
            }
            // if south then east (unless sw)
            if (this._directionChanged.s && !this._directionChanged.w) {
                this._directionChanged.e = true;
            }
            // if east then south (unless ne)
            if (this._directionChanged.e && !this._directionChanged.n) {
                this._directionChanged.s = true;
            }
            // if west then south (unless nw)
            if (this._directionChanged.w && !this._directionChanged.n) {
                this._directionChanged.s = true;
            }
        }
    };
    /**
     * @private
     * @param {?} p
     * @return {?}
     */
    AngularResizableDirective.prototype.resizeTo = /**
     * @private
     * @param {?} p
     * @return {?}
     */
    function (p) {
        p.subtract(this._origMousePos);
        /** @type {?} */
        var tmpX = Math.round(p.x / this._gridSize.x) * this._gridSize.x;
        /** @type {?} */
        var tmpY = Math.round(p.y / this._gridSize.y) * this._gridSize.y;
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.doResize = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var container = this.el.nativeElement;
        if (!this._direction || this._direction.n || this._direction.s || this._aspectRatio) {
            this.renderer.setStyle(container, 'height', this._currSize.height + 'px');
        }
        if (!this._direction || this._direction.w || this._direction.e || this._aspectRatio) {
            this.renderer.setStyle(container, 'width', this._currSize.width + 'px');
        }
        this.renderer.setStyle(container, 'left', this._currPos.x + 'px');
        this.renderer.setStyle(container, 'top', this._currPos.y + 'px');
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.adjustByRatio = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._aspectRatio && !this._adjusted) {
            if (this._direction.e || this._direction.w) {
                /** @type {?} */
                var newHeight = Math.floor(this._currSize.width / this._aspectRatio);
                if (this._direction.n) {
                    this._currPos.y += this._currSize.height - newHeight;
                }
                this._currSize.height = newHeight;
            }
            else {
                /** @type {?} */
                var newWidth = Math.floor(this._aspectRatio * this._currSize.height);
                if (this._direction.n) {
                    this._currPos.x += this._currSize.width - newWidth;
                }
                this._currSize.width = newWidth;
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.checkBounds = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._containment) {
            /** @type {?} */
            var maxWidth = this._bounding.width - this._bounding.pr - this._bounding.deltaL - this._bounding.translateX - this._currPos.x;
            /** @type {?} */
            var maxHeight = this._bounding.height - this._bounding.pb - this._bounding.deltaT - this._bounding.translateY - this._currPos.y;
            if (this._direction.n && (this._currPos.y + this._bounding.translateY < 0)) {
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
            /**
             * Fix Issue: Additional check for aspect ratio
             * https://github.com/xieziyu/angular2-draggable/issues/132
             */
            if (this._aspectRatio) {
                this._adjusted = false;
                if ((this._direction.w || this._direction.e) &&
                    (this._currSize.width / this._aspectRatio) >= maxHeight) {
                    /** @type {?} */
                    var newWidth = Math.floor(maxHeight * this._aspectRatio);
                    if (this._direction.w) {
                        this._currPos.x += this._currSize.width - newWidth;
                    }
                    this._currSize.width = newWidth;
                    this._currSize.height = maxHeight;
                    this._adjusted = true;
                }
                if ((this._direction.n || this._direction.s) &&
                    (this._currSize.height * this._aspectRatio) >= maxWidth) {
                    /** @type {?} */
                    var newHeight = Math.floor(maxWidth / this._aspectRatio);
                    if (this._direction.n) {
                        this._currPos.y += this._currSize.height - newHeight;
                    }
                    this._currSize.width = maxWidth;
                    this._currSize.height = newHeight;
                    this._adjusted = true;
                }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.checkSize = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minHeight = !this.rzMinHeight ? 1 : this.rzMinHeight;
        /** @type {?} */
        var minWidth = !this.rzMinWidth ? 1 : this.rzMinWidth;
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.getBounding = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var el = this._containment;
        /** @type {?} */
        var computed = window.getComputedStyle(el);
        if (computed) {
            /** @type {?} */
            var p = computed.getPropertyValue('position');
            /** @type {?} */
            var nativeEl = window.getComputedStyle(this.el.nativeElement);
            /** @type {?} */
            var transforms = nativeEl.getPropertyValue('transform').replace(/[^-\d,]/g, '').split(',');
            this._bounding = {};
            this._bounding.width = el.clientWidth;
            this._bounding.height = el.clientHeight;
            this._bounding.pr = parseInt(computed.getPropertyValue('padding-right'), 10);
            this._bounding.pb = parseInt(computed.getPropertyValue('padding-bottom'), 10);
            this._bounding.deltaL = this.el.nativeElement.offsetLeft - this._currPos.x;
            this._bounding.deltaT = this.el.nativeElement.offsetTop - this._currPos.y;
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
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.resetBounding = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._bounding && this._bounding.position === 'static') {
            this.renderer.setStyle(this._containment, 'position', 'relative');
        }
        this._bounding = null;
    };
    /**
     * @private
     * @return {?}
     */
    AngularResizableDirective.prototype.getGridSize = /**
     * @private
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: '[ngResizable]',
                    exportAs: 'ngResizable'
                },] }
    ];
    /** @nocollapse */
    AngularResizableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"] }
    ]; };
    AngularResizableDirective.propDecorators = {
        ngResizable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzHandles: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzAspectRatio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzContainment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzGrid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzMinWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzMinHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzMaxWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzMaxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        preventDefaultEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        rzStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        rzResizing: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        rzStop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }]
    };
    return AngularResizableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularDraggableModule = /** @class */ (function () {
    function AngularDraggableModule() {
    }
    AngularDraggableModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    imports: [],
                    declarations: [
                        AngularDraggableDirective,
                        AngularResizableDirective
                    ],
                    exports: [
                        AngularDraggableDirective,
                        AngularResizableDirective
                    ]
                },] }
    ];
    return AngularDraggableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=angular2-draggable.js.map

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

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-2\">\r\n    <app-tools (removed)=\"display=true;showRemoveConfirm()\" (refreshed)=\"refresh()\"\r\n               (buttonSelected)=\"buttonSelected($event)\"\r\n               [computeButtons]=\"computeButtonsInTools\"></app-tools>\r\n\r\n  </div>\r\n  <div class=\"col-md-10\" #myBounds>\r\n    <ng-template ngFor let-computeButton [ngForOf]=\"computeButtonsInDesign\" let-i=\"index\">\r\n      <button (click)=\"select(computeButton)\" [class.selected]=\"computeButton.isSelected\"\r\n              *ngIf=\"computeButton.type==BetweenButtonType.And\r\n|| computeButton.type==BetweenButtonType.end\r\n|| computeButton.type==BetweenButtonType.Or\r\n|| computeButton.type==BetweenButtonType.start\r\n|| computeButton.type==constButtonType.notNull\" style=\"float: left;\" type=\"button\" class=\"btn btn-light\"\r\n      >{{computeButton.name}}\r\n      </button>\r\n\r\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==InputButtonType.text\">\r\n        <input [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\r\n               type=\"text\">\r\n      </div>\r\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==InputButtonType.number\">\r\n        <input [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\r\n               type=\"number\">\r\n      </div>\r\n\r\n\r\n      <div (click)=\"select(computeButton)\" *ngIf=\"computeButton.type==SelectButtonType.many\r\n|| computeButton.type==SelectButtonType.one\r\n|| computeButton.type==SelectButtonType.multi\">\r\n        <select [class.selected]=\"computeButton.isSelected\" [(ngModel)]=\"computeButton.value\"\r\n                [attr.multiple]=\"computeButton.type==SelectButtonType.multi ? 'multe' : null\">\r\n          <ng-template ngFor let-keyValue [ngForOf]=\"computeButton.possibleValue\">\r\n            <option [value]=\"keyValue.value\">{{keyValue.name}}</option>\r\n          </ng-template>\r\n        </select>\r\n      </div>\r\n\r\n\r\n    </ng-template>\r\n  </div>\r\n</div>\r\n\r\n<!--(dragover)=\"dragOver(computeButton)\"\r\n                [inBounds]=\"inBounds\" ngDraggable [position]=\"computeButton.position\"\r\n                [bounds]=\"myBounds\"-->\r\n\r\n\r\n<p-dialog [(visible)]=\"display\">\r\n  <p-header>\r\n    تاکید عملیات\r\n  </p-header>\r\n\r\n  <p>آیا از حذف این {{toRemoveCount}} مورد اطمینان دارید ؟</p>\r\n\r\n  <p-footer>\r\n    <button type=\"button\" (click)=\"remove();display=false\" class=\"btn btn-dark\">بله</button>\r\n    <button type=\"button\" (click)=\"display=false\" class=\"btn btn-warning\">خیر</button>\r\n\r\n  </p-footer>\r\n</p-dialog>\r\n"

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

module.exports = "<div class=\"card text-white bg-secondary mb-3\" style=\"max-width: 18rem;\">\r\n  <div class=\"card-header\">منو ابزار</div>\r\n  <div class=\"card-body\">\r\n    <div class=\"card-title\" >\r\n      <div class=\"btn-group\" *ngIf=\"computeButtons\">\r\n      <button   class=\"btn btn-secondary\" (click)=\"refresh()\">بازآوری</button>\r\n      <button   class=\"btn btn-secondary\" (click)=\"remove()\">حذف</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"card-text\" >\r\n      <div class=\"btn-group-vertical\" *ngIf=\"computeButtons\">\r\n        <ng-template ngFor let-computeButton [ngForOf]=\"computeButtons\" let-i=\"index\">\r\n          <button (click)=\"select(computeButton)\"  type=\"button\" class=\"btn btn-secondary\">{{computeButton.name}}</button>\r\n        </ng-template>\r\n\r\n      </div>\r\n\r\n\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

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

module.exports = "<div class=\"ui-rtl\" dir=\"rtl\">\r\n  <p-dialog [(visible)]=\"display\" (onHide)=\"onHide($event)\" [maximizable]=\"true\" [draggable]=\"true\" [minWidth]=\"300\">\r\n    <p-header>\r\n      انتخاب  از جدول\r\n    </p-header>\r\n\r\n    <p-table *ngIf=\"models\" [value]=\"models\"\r\n             selectionMode=\"single\" [(selection)]=\"selected\" dataKey=\"Id\">\r\n      <ng-template pTemplate=\"header\" let-columns>\r\n        <tr>\r\n          <th *ngFor=\"let f of fields\">{{f.translate}}</th>\r\n        </tr>\r\n      </ng-template>\r\n      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\r\n        <tr [pSelectableRow]=\"rowData\">\r\n          <ng-template let-f ngFor [ngForOf]=\"fields\">\r\n            <td>{{rowData[f.name]}}</td>\r\n          </ng-template>\r\n\r\n          <ng-template let-b ngFor [ngForOf]=\"buttons\">\r\n            <td class=\"btn btn-primary \" (click)=\"b.onclick ? b.onclick(rowData) : null\">{{b.Name}}</td>\r\n          </ng-template>\r\n\r\n        </tr>\r\n      </ng-template>\r\n      <!--<ng-template pTemplate=\"summary\">\r\n\r\n      </ng-template>-->\r\n    </p-table>\r\n\r\n    <p-footer>\r\n      <button class=\"btn bg-danger\" (click)=\"select()\">انتخاب</button>\r\n      <button class=\"btn bg-danger\" (click)=\"cancel()\">لغو</button>\r\n    </p-footer>\r\n  </p-dialog>\r\n</div>\r\n"

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

module.exports = "<app-dynamic-table [buttons]=\"buttons\" #dynaTable [display]=\"display\" [models]=\"queries\"\r\n                   [fields]=\"fields\" [selected]=\"selected\"\r\n                   (selectedEv)=\"selectedEvent($event)\"></app-dynamic-table>\r\n"

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

module.exports = "<p>\r\n  data works!\r\n</p>\r\n"

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

module.exports = "<p>\r\n  sqlserver-schema-provider works!\r\n</p>\r\n"

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

module.exports = "<ul class=\"nav nav-tabs\">\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#home\"\r\n       (click)=\"activeTab=1\">طراحی</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu2\" (click)=\"activeTab=3\">\r\n      تنظیمات ستون ها</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu1\" (click)=\"activeTab=2\">\r\n      خروجی Query</a>\r\n  </li>\r\n\r\n\r\n  <!-- <li class=\"nav-item\">\r\n     <a class=\"nav-link\" data-toggle=\"tab\" href=\"#menu2\">طراحی </a>\r\n   </li>-->\r\n</ul>\r\n\r\n<!-- Tab panes -->\r\n<div class=\"tab-content\">\r\n  <div class=\"tab-pane active\" id=\"home\">\r\n\r\n    <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\r\n              aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n      </button>\r\n\r\n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n        <!--  <ul class=\"navbar-nav mr-auto\">\r\n            <li class=\"nav-item active\">\r\n              <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n              <a class=\"nav-link\" href=\"#\">Link</a>\r\n            </li>\r\n            <li class=\"nav-item dropdown\">\r\n              <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                Dropdown\r\n              </a>\r\n              <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n                <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n                <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                <div class=\"dropdown-divider\"></div>\r\n                <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n              </div>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n              <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\r\n            </li>\r\n          </ul>-->\r\n        <ul class=\"navbar-nav\">\r\n          <li><a class=\"btn btn-outline-light\" data-toggle=\"modal\" data-target=\"#settingmodal\"><span class=\"oi\"\r\n                                                                                                     data-glyph=\"menu\"></span></a>\r\n          </li>\r\n          <li><a class=\"btn text-success\" (click)=\"DataComponent.saveQuery()\"><span class=\"oi\"\r\n                                                                                              data-glyph=\"check\">ذخیره</span></a>\r\n          </li>\r\n          <li><a class=\"btn  text-success\"\r\n                 (click)=\"openModalQueries()\"><span >انتخاب کوئری</span></a>\r\n          <li><a class=\"btn  text-success\"\r\n                 (click)=\"openModalTables()\"><span >انتخاب جدول</span></a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n      <a class=\"navbar-brand\" href=\"#\">منو</a>\r\n\r\n    </nav>\r\n    <app-table-design [panelHeight]=\"panelHeight\"></app-table-design>\r\n\r\n\r\n  </div>\r\n  <div class=\"tab-pane container-fluid fade\" id=\"menu1\">\r\n    <app-query-generator></app-query-generator>\r\n\r\n\r\n  </div>\r\n  <div class=\"tab-pane container fade\" id=\"menu2\">\r\n    <br>\r\n    <br>\r\n    <app-column-setting></app-column-setting>\r\n\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n<app-tables #tables *ngIf=\"showTables\" [display]=\"showTables\" ></app-tables>\r\n<app-queries (selectedEv)=\"querySelect($event)\" #queries *ngIf=\"showQueries\" [display]=\"showQueries\" ></app-queries>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\"\r\n     id=\"settingmodal\" tabindex=\"-1\" role=\"dialog\"\r\n     aria-labelledby=\"settingmodalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"settingmodalLabel\">تنظیمات</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"form-inline my-2 my-lg-0\">\r\n          <div class=\"form-group\">\r\n            <label>نام کوئری</label>\r\n            <input type=\"text\" [(ngModel)]=\"DataComponent.Name\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label>اندازه پنل</label>\r\n            <input type=\"number\" [(ngModel)]=\"panelHeight\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">بستن</button>\r\n        <!--\r\n                <button type=\"button\" class=\"btn btn-primary\"></button>\r\n        -->\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

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

module.exports = "<br>\r\n<div class=\"card\">\r\n  <div class=\"card-header\">\r\n    <button (click)=\"generate()\" class=\"btn btn-primary\"> تولید خروجی</button>\r\n    <b style=\"text-align: left;float: left\">Sql Query</b></div>\r\n  <pre class=\"card-body\"\r\n       style=\"direction: ltr !important;text-align: left !important;\"\r\n  > <code style=\"direction: ltr !important;text-align: left !important;\" >{{ dataComponent.SQL}}</code>\r\n  </pre>\r\n  <div class=\"card-footer\">Footer</div>\r\n</div>\r\n"

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

module.exports = "<p>\r\n  sql-query-generator works!\r\n</p>\r\n"

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

module.exports = "<app-condition></app-condition>\r\n\r\n<table class=\"table col-md-12\" style=\"border:2px solid #0c5460\">\r\n  <thead>\r\n  <tr>\r\n    <!--  <th scope=\"col\" colspan=\"1\">\r\n        <button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\"><span>+</span> پارامتر ورودی\r\n        </button>\r\n      </th>-->\r\n    <th scope=\"col\" colspan=\"5\" style=\"text-align:center;font-weight: bold\">تنظیمات ستون ها</th>\r\n  </tr>\r\n  <tr>\r\n    <th scope=\"col\">در خروجی</th>\r\n    <th scope=\"col\">نام</th>\r\n    <th scope=\"col\">نام در جدول</th>\r\n    <th scope=\"col\">نام در کوئری</th>\r\n    <th scope=\"col\">نام  جدول</th>\r\n  </tr>\r\n  </thead>\r\n  <tbody>\r\n  <tr *ngFor=\"let property of DataComponent.selectedProperties;let tableI=index;\">\r\n    <th scope=\"row\"><input type=\"checkbox\" [(ngModel)]=\"property.Property.onOutPut\"></th>\r\n    <td>{{property.Property.NameInModel}}</td>\r\n    <td>{{property.Property.NameInTable}}</td>\r\n    <td>{{property.Property.ModelName}}</td>\r\n\r\n    <td><input type=\"text\" [(ngModel)]=\"property.NameInTableAsName\" (change)=\"AsNameChanged(property)\"></td>\r\n\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<table class=\"table col-md-12\" style=\"border:2px solid #0c5460\">\r\n  <thead>\r\n  <tr>\r\n    <th scope=\"col\" colspan=\"2\">\r\n      <button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\"><span>+</span> پارامتر ورودی\r\n      </button>\r\n\r\n      <button (click)=\"delete()\"\r\n              class=\"btn btn-danger\"><span>-</span> حذف\r\n      </button>\r\n    </th>\r\n    <th scope=\"col\" colspan=\"5\" style=\"text-align:center;font-weight: bold\">پارامتر های ورودی</th>\r\n  </tr>\r\n  <tr>\r\n    <th scope=\"col\">انتخاب</th>\r\n    <th scope=\"col\">نام در متد</th>\r\n    <th scope=\"col\">نام در SQL</th>\r\n    <th scope=\"col\">نام در کامنت</th>\r\n    <th scope=\"col\">نوع در مدل</th>\r\n    <th scope=\"col\">نوع در SQL</th>\r\n    <th scope=\"col\">عملیات</th>\r\n  </tr>\r\n  </thead>\r\n  <tbody>\r\n  <tr *ngFor=\"let property of DataComponent.addParameterFields;let tableI=index;\">\r\n    <th scope=\"row\"><input type=\"checkbox\" [(ngModel)]=\"property.isSelected\"></th>\r\n    <td>{{property.nameInMethod}}</td>\r\n    <td>{{property.nameInSQL}}</td>\r\n    <td>{{property.nameInComment}}</td>\r\n    <td>{{property.typeInModel}}</td>\r\n    <td>{{property.typeInSQL}}</td>\r\n    <td>\r\n      <button data-toggle=\"modal\" data-target=\"#conditionModal\" class=\"btn btn-primary\"><span>+</span> شرط\r\n      </button>\r\n      <button (click)=\"edit(property)\" data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary\">\r\n        <span></span> ویرایش\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n\r\n\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\r\n     aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">پارامتر ورودی</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <dynamic-form-save [fields]=\"addParameterFields\" [isInline]=\"true\"></dynamic-form-save>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">بستن</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveParameter()\">ذخیره</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

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

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n    <!--  <ul class=\"navbar-nav mr-auto\">\r\n        <li class=\"nav-item active\">\r\n          <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#\">Link</a>\r\n        </li>\r\n        <li class=\"nav-item dropdown\">\r\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n            Dropdown\r\n          </a>\r\n          <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n            <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n            <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n            <div class=\"dropdown-divider\"></div>\r\n            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n          </div>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\r\n        </li>\r\n      </ul>-->\r\n    <ul class=\"navbar-nav\">\r\n      <li><a (click)=\"displayNow()\"\r\n             ><span class=\"oi\" data-glyph=\"menu\"></span></a></li>\r\n\r\n    </ul>\r\n  </div>\r\n  <a class=\"navbar-brand\">منو</a>\r\n\r\n</nav>\r\n\r\n\r\n<div class=\"ui-rtl\" dir=\"rtl\">\r\n<p-dialog header=\"طراحی Where\" [(visible)]=\"display\"\r\n          [modal]=\"true\" [responsive]=\"true\"  [minWidth]=\"1200\" [minY]=\"700\"\r\n          [maximizable]=\"true\" [baseZIndex]=\"10000\"\r\n[draggable]=\"true\" [closeOnEscape]=\"true\" (onHide)=\"export()\"\r\n>\r\n  <app-design-panel #appDesignPanel [computeButtonsInDesign]=\"computeButtonsInDesign\" [computeButtonsInTools]=\"computeButtonsInTools\"\r\n  ></app-design-panel>\r\n</p-dialog>\r\n\r\n</div>\r\n"

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

module.exports = "<p>\r\n  design-query works!\r\n</p>\r\n"

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

module.exports = "<p>\r\n  menu works!\r\n</p>\r\n"

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

module.exports = "<p>\r\n  select-columns-and-join works!\r\n</p>\r\n"

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

module.exports = "\r\n\r\n<div class=\"row\" #myBounds [style.height]=\"panelHeight+'px'\">\r\n  <table  [bounds]=\"myBounds\" [inBounds]=\"true\" #tables ngDraggable class=\"table col-md-1\" style=\"border:2px solid #17a2b8\"\r\n         (movingOffset)=\"onMoving($event)\" [attr.Id]=\"'pt'+table.uniqId\"\r\n         *ngFor=\"let table of DataComponent.models;let tableI=index;\">\r\n    <thead>\r\n    <tr >\r\n      <th scope=\"col\" colspan=\"1\">\r\n        <input type=\"radio\" name=\"selectMainTable\" [attr.Id]=\"'t'+table.uniqId\" [attr.checked]=\"table.IsMainTable ? 'checked' : null \"  (click)=\"selectMainTable(table)\">\r\n      </th>\r\n\r\n      <th scope=\"col\" colspan=\"3\" style=\"text-align:center;font-weight: bold\">\r\n\r\n        {{table.Model && table.Model.Name ? table.Model.Name : null}}\r\n\r\n      </th>\r\n    </tr>\r\n    <tr>\r\n      <th scope=\"col\">+</th>\r\n      <th  style=\"text-align: center\"><input type=\"checkbox\" (click)=\"toggleAllProperties(table.Model)\"></th>\r\n      <th >نام</th>\r\n      <th scope=\"col\">-</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n\r\n\r\n    <ng-template *ngIf=\"table && table.Model && table.Model.Properties\"  [ngForOf]=\"table.Model.Properties\" let-property ngFor let-propertyI=\"index\">\r\n    <tr  >\r\n      <th scope=\"row\"><input type=\"radio\" [attr.Id]=\"'r'+property.Id\" #rightRadio (click)=\"rightJoin(tableI,propertyI,$event.target)\"></th>\r\n      <td><input type=\"checkbox\" (click)=\"selectColumn(property)\" [attr.checked]=\"property.onOutPut? 'checked' : null\"></td>\r\n      <td>{{property.NameInModel}}</td>\r\n      <td><input type=\"radio\" [attr.Id]=\"'l'+property.Id\" (click)=\"leftJoin(tableI,propertyI,$event.target)\"></td>\r\n    </tr>\r\n    </ng-template>\r\n    </tbody>\r\n  </table>\r\n\r\n<!--\r\n\r\n\r\n\r\n  <table ngDraggable class=\"table col-md-1\" style=\"border:2px solid #17a2b8\"\r\n         *ngFor=\"let table of joinTables;let tableI=index;\">\r\n    <thead>\r\n    <tr>\r\n      <th scope=\"col\"></th>\r\n      <th scope=\"col\">relashionShip</th>\r\n      <th scope=\"col\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr >\r\n      <th >{{table.leftProperty.NameInModel}}</th>\r\n      <th ></th>\r\n      <td>{{table.rightProperty.NameInModel}}</td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n-->\r\n\r\n\r\n  <svg style=\"overflow: hidden;\r\n    vertical-align: middle;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: -1;\r\n    position: absolute;\r\n}\">\r\n    <ng-template let-line ngFor [ngForOf]=\"DataComponent.joinTables\">\r\n      <line   [attr.x1]=\"line.lelementX | HoldValue\" [attr.y1]=\"line.lelementY | HoldValue\"\r\n            [attr.x2]=\"line.relementX | HoldValue\" [attr.y2]=\"line.relementY | HoldValue\"\r\n            style=\"stroke:rgb(255,0,0);stroke-width:2\"></line>\r\n    </ng-template>\r\n  </svg>\r\n</div>\r\n"

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