(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["absence-absence-module"],{

/***/ "./src/app/absence/abscence-routing.module.ts":
/*!****************************************************!*\
  !*** ./src/app/absence/abscence-routing.module.ts ***!
  \****************************************************/
/*! exports provided: absenceroutes, AbsenceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absenceroutes", function() { return absenceroutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsenceRoutingModule", function() { return AbsenceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./absence-index/absence-index.component */ "./src/app/absence/absence-index/absence-index.component.ts");
/* harmony import */ var _workplaces_workplaces_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./workplaces/workplaces.component */ "./src/app/absence/workplaces/workplaces.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var absenceroutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: _absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__["AbsenceIndexComponent"] },
    { path: 'workplaces', component: _workplaces_workplaces_component__WEBPACK_IMPORTED_MODULE_3__["WorkplacesComponent"] },
    { path: 'home/:id', component: _absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__["AbsenceIndexComponent"] },
];
var AbsenceRoutingModule = /** @class */ (function () {
    function AbsenceRoutingModule() {
    }
    AbsenceRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(absenceroutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AbsenceRoutingModule);
    return AbsenceRoutingModule;
}());



/***/ }),

/***/ "./src/app/absence/absence-index/absence-index.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/absence/absence-index/absence-index.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n#title::-webkit-input-placeholder{\r\n  font-weight: lighter;\r\n}\r\n\r\n\r\n#title::-moz-placeholder{\r\n  font-weight: lighter;\r\n}\r\n\r\n\r\n#title::-ms-input-placeholder{\r\n  font-weight: lighter;\r\n}\r\n\r\n\r\n#title::placeholder{\r\n  font-weight: lighter;\r\n}\r\n\r\n\r\nlabel:hover{\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.week * {\r\n  margin:2px;\r\n\r\n}\r\n\r\n\r\n.week.card:hover {\r\n  cursor: pointer;\r\n\r\n}\r\n\r\n\r\n:host >>> .ui-timepicker {\r\n  direction: ltr;\r\n}\r\n\r\n\r\n:host >>> .ui-multiselect-items-wrapper li{\r\n  text-align: right;\r\n\r\n}\r\n\r\n\r\n:host >>> label{\r\n  padding-right: 5px;\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/app/absence/absence-index/absence-index.component.html":
/*!********************************************************************!*\
  !*** ./src/app/absence/absence-index/absence-index.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n\r\n  <a style=\"float: left;text-align: left\" href=\"/Absence/ObligatedRanges/GetDataTable\">لیست بازه موظفی</a>\r\n\r\n  <br>\r\n  <div>\r\n    <h4 class=\"card-header\">تعریف بازه موظفی</h4>\r\n    <br/>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6 \">\r\n          <div class=\"form-group\">\r\n            <label for=\"title\">نام بازه موظفی </label>\r\n            <input class=\"form-control\" type=\"text\" placeholder=\"...\" [(ngModel)]=\"ObligatedRange.Name\"\r\n                   class=\"form-control\" id=\"title\">\r\n          </div>\r\n\r\n        </div>\r\n        <div class=\"col-md-6 form-group\">\r\n          <small class=\"alert alert-info\">\r\n            برای مثال : روزکار عادی ، حراست و ...\r\n          </small>\r\n          <!--<label> انتخاب روز تعطیل </label>-->\r\n          <!--<p-multiSelect [options]=\"ObligatedRange.ObligatedRangeWeeks\" [(ngModel)]=\"ObligatedRange.OffDay\"\r\n\r\n                         (change)=\"offDayChanged()\"\r\n                         defaultLabel=\"انتخاب روز های تعطیل\"\r\n                         [style]=\"{width:'100%'}\"\r\n                         [panelStyle]=\"{textAlign:'right'}\"\r\n                         optionLabel=\"DayOfWeekFaName\"></p-multiSelect>-->\r\n\r\n          <!--   <select class=\"form-control\" [(ngModel)]=\"ObligatedRange.OffDay\">\r\n               <ng-template ngFor [ngForOf]=\"ObligatedRange.ObligatedRangeWeeks\" let-day>\r\n                 <option [value]=\"day.DayOfWeek\"> {{day.DayOfWeekFaName}}</option>\r\n               </ng-template>\r\n             </select>-->\r\n        </div>\r\n\r\n\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n<hr/>\r\n\r\n<div class=\"container\">\r\n  <h5> شیفت های چرخشی هفتگی :</h5>\r\n\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-md-12\">\r\n      <button id=\"increaseWeek\" class=\"btn btn-primary m-sm-2\" (click)=\"increaseWeek()\">افزایش هفته</button>\r\n      <button id=\"decreaseWeek\" class=\"btn btn-primary\" (click)=\"decreaseWeek()\"> کاهش هفته</button>\r\n\r\n      <div style=\"float: left;\">\r\n        <button id=\"addMacro\" class=\"btn btn-outline-info m-sm-2\" (click)=\"macroDisplay=true\"> شیفت های متداول آماده <i class=\"c-deep-purple-500 ti-plus \"></i></button>\r\n        <button id=\"exportMacro\" class=\"btn btn-outline-info m-sm-2\" (click)=\"exportMacro()\">  دریافت <i class=\"c-deep-purple-500 ti-export \"></i></button>\r\n\r\n        <!--<small class=\"alert alert-info\">مانند شیفت چرخشی حراست ، شیفت چرخشی کارگران</small>-->\r\n      </div>\r\n    </div>\r\n  </div>\r\n<div class=\"row\">\r\n\r\n  <ng-template ngFor [ngForOf]=\"iterates\" let-weekDay let-j=\"index\">\r\n\r\n    <div class=\"col-md-6\">\r\n      <table class=\"table\" >\r\n        <thead>\r\n        <tr>\r\n\r\n          <th >\r\n\r\n            <small *ngIf=\"j<=10\"> هفته {{weekNumNames[j]}} :</small>\r\n            <small *ngIf=\"j>10\"> هفته {{j}} :</small>\r\n\r\n          </th>\r\n          <th colspan=\"6\">\r\n            <small *ngIf=\"j<=10\"> ساعت هفته {{weekNumNames[j]}} :</small>\r\n            <small *ngIf=\"j>10\"> ساعت هفته {{j}} :</small>\r\n          </th>\r\n        </tr>\r\n\r\n        </thead>\r\n        <tbody>\r\n        <ng-template ngFor [ngForOf]=\"getWeekByNumber(j)\" let-weekDay\r\n                     let-i=\"index\">\r\n          <tr>\r\n            <th>{{weekDay.DayOfWeekFaName}}\r\n\r\n            </th>\r\n            <th>\r\n              <button class=\"btn btn-default settimes\" (click)=\"setTimes(weekDay)\" title=\"تنظیم زمان ها\"><span\r\n                class=\"oi\"\r\n                data-glyph=\"timer\"></span>\r\n              </button>\r\n            </th>\r\n            <th>\r\n              <label class=\"btn btn-default \" [class.btn-outline-danger]=\"weekDay.IsOffDay\">\r\n                <input type=\"checkbox\" [checked]=\"weekDay.IsOffDay\" (change)=\"toggleOffday(weekDay)\">\r\n\r\n\r\n                تعطیل\r\n              </label>\r\n            </th>\r\n            <td colspan=\"6\">\r\n              <ng-template ngFor [ngForOf]=\"weekDay.ObligatedRangeDayTimes\" let-time>\r\n                <ng-template [ngIf]=\"!time.IsRemoved\">\r\n                  <!-- ({{time.Start.getHours()}}:{{time.Start.getMinutes()}} -\r\n                   {{time.End.getHours()}}:{{time.End.getMinutes()}}) <br>-->\r\n\r\n                  {{time.End}} -\r\n                  {{time.Start}}  -\r\n                  <span style=\"font-size: 10px\"\r\n                        *ngIf=\"rangeTypes[time.RangeType]\">{{getRangeTypeName(time.RangeType)}}</span>\r\n                  <span class=\"btn btn-default\" style=\"font-size: 10px\" (click)=\"remove(time)\"><i\r\n                    class=\"c-deep-purple-500 ti-close \"></i></span>\r\n                  <br>\r\n\r\n\r\n                </ng-template>\r\n              </ng-template>\r\n            </td>\r\n          </tr>\r\n\r\n        </ng-template>\r\n        </tbody>\r\n\r\n      </table>\r\n    </div>\r\n  </ng-template>\r\n</div>\r\n\r\n\r\n  <!--<ng-template ngFor [ngForOf]=\"iterates\" let-weekDay let-j=\"index\">\r\n    <div class=\"row week\" style=\"margin-top: 20px\">\r\n\r\n      <small *ngIf=\"j<=10\"> هفته {{weekNumNames[j]}} :</small>\r\n      <small *ngIf=\"j>10\"> هفته {{j}} :</small>\r\n\r\n      <div class=\"col-md-2\">\r\n        <label class=\"btn btn-default btn-outline-primary\">\r\n          <input type=\"checkbox\" (change)=\"selectWeekDays(j,$event)\">\r\n          انتخاب همه\r\n        </label>\r\n      </div>\r\n\r\n\r\n      <div style=\"display: inline-flex\" dir=\"ltr\">\r\n        <ng-template ngFor [ngForOf]=\"getWeekByNumber(j)\" let-weekDay\r\n                     let-i=\"index\">\r\n\r\n\r\n          <div *ngIf=\"!weekDay.IsRemoved\" [class.card]=\"true\"\r\n\r\n               [class.bg-danger]=\"weekDay.IsOffDay\"\r\n               [class.border-success]=\"weekDay.IsSelected\"\r\n               (click)=\"select(weekDay)\"\r\n\r\n          >\r\n            <div class=\"card-header btn btn-outline-light\" [class.text-white]=\"weekDay.IsSelected ||  weekDay.IsOffDay\"\r\n                 [class.bg-success]=\"weekDay.IsSelected || weekDay.IsOffDay\">\r\n\r\n\r\n              <input type=\"checkbox\" [checked]=\"weekDay.IsSelected\">\r\n              {{weekDay.DayOfWeekFaName}}\r\n            </div>\r\n            <div class=\"card-body\">\r\n              &lt;!&ndash; <button class=\"btn btn-primary\"  title=\"انتخاب\"><span class=\"oi\"\r\n                                                                                              data-glyph=\"check\"></span>\r\n               </button>&ndash;&gt;\r\n              <button class=\"btn btn-primary settimes\" (click)=\"setTimes(weekDay)\" title=\"تنظیم زمان ها\"><span\r\n                class=\"oi\"\r\n                data-glyph=\"timer\"></span>\r\n              </button>\r\n              <p class=\"card-text\">\r\n                <ng-template ngFor [ngForOf]=\"weekDay.ObligatedRangeDayTimes\" let-time>\r\n                  <ng-template [ngIf]=\"!time.IsRemoved\">\r\n                    &lt;!&ndash; ({{time.Start.getHours()}}:{{time.Start.getMinutes()}} -\r\n                     {{time.End.getHours()}}:{{time.End.getMinutes()}}) <br>&ndash;&gt;\r\n\r\n                    {{time.Start}} -\r\n                    {{time.End}}  -\r\n                    <span style=\"font-size: 10px\"\r\n                          *ngIf=\"rangeTypes[time.RangeType]\">{{getRangeTypeName(time.RangeType)}}</span>\r\n                    <span class=\"btn btn-default\" style=\"font-size: 10px\" (click)=\"remove(time)\"><i\r\n                      class=\"c-deep-purple-500 ti-close \"></i></span>\r\n                    <br>\r\n\r\n\r\n                  </ng-template>\r\n                </ng-template>\r\n              </p>\r\n            </div>\r\n\r\n            <div class=\"card-footer\">\r\n              <label class=\"btn btn-default \" [class.btn-outline-danger]=\"!weekDay.IsOffDay\">\r\n                <input type=\"checkbox\" (change)=\"toggleOffday(weekDay)\">\r\n\r\n\r\n                تعطیل\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n  </ng-template>-->\r\n\r\n  <br/>\r\n  <div class=\"col-md-6 form-group\">\r\n    <button class=\"btn btn-primary\" (click)=\"save()\">ذخیره</button>\r\n  </div>\r\n</div>\r\n<p-dialog [(visible)]=\"display\" [draggable]=\"true\" [maximizable]=\"true\"\r\n          [closable]=\"true\"\r\n          [minWidth]=\"700\"\r\n          [responsive]=\"true\" [rtl]=\"true\" [resizable]=\"true\"\r\n          id=\"hourset\"\r\n          [style]=\"{ width: '50vw', height: '300px' }\">\r\n  <p-header>\r\n    تنظیم ساعت ها\r\n  </p-header>\r\n\r\n  <div class=\"container-fluid\">\r\n\r\n    <button class=\"btn btn-primary \" id=\"addrange\" (click)=\"NewObligatedRangeDayTime()\">بازه جدید</button>\r\n\r\n    <hr/>\r\n\r\n    <table class=\"table \" style=\"    overflow: auto;\r\n    height:  60vh; min-height: 15vh;\r\n    display: contents;\">\r\n      <thead>\r\n      <tr>\r\n        <th>زمان شروع</th>\r\n        <th>زمان پایان</th>\r\n        <th>زمان پایان در فردا قرار دارد؟</th>\r\n        <th>نوع بازه زمانی</th>\r\n        <th>حذف</th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <ng-template [ngIf]=\"selectedWeek && selectedWeek.ObligatedRangeDayTimes\">\r\n        <ng-template ngFor [ngForOf]=\"selectedWeek.ObligatedRangeDayTimes\" let-time let-i=\"index\">\r\n          <ng-template [ngIf]=\"!selectedWeek.ObligatedRangeDayTimes[i].IsRemoved\">\r\n\r\n            <tr>\r\n              <td>\r\n\r\n\r\n                <input class=\"form-control\" [(ngModel)]=\"selectedWeek.ObligatedRangeDayTimes[i].Start\" type=\"time\">\r\n                <!--<p-calendar  [timeOnly]=\"true\"></p-calendar>-->\r\n              </td>\r\n              <td>\r\n                <input class=\"form-control\" [min]=\"selectedWeek.ObligatedRangeDayTimes[i].Start\"\r\n                       [(ngModel)]=\"selectedWeek.ObligatedRangeDayTimes[i].End\" type=\"time\">\r\n                <!--<p-calendar [(ngModel)]=\"selectedWeek.ObligatedRangeDayTimes[i].End\" [timeOnly]=\"true\"></p-calendar>-->\r\n\r\n              </td>\r\n              <td>\r\n                <input id=\"IsTwoDay\" type=\"checkbox\" [(ngModel)]=\"selectedWeek.ObligatedRangeDayTimes[i].IsTwoDay\"/>\r\n\r\n              </td>\r\n              <td>\r\n                <select id=\"rangetype\" [(ngModel)]=\"selectedWeek.ObligatedRangeDayTimes[i].RangeType\">\r\n                  <option *ngFor=\"let op of rangeTypes\" [value]=\"op.type\">{{op.name}}</option>\r\n                </select>\r\n              </td>\r\n              <td>\r\n                <button class=\"btn btn-danger\" (click)=\"remove(selectedWeek.ObligatedRangeDayTimes[i])\">حذف</button>\r\n\r\n              </td>\r\n            </tr>\r\n\r\n\r\n          </ng-template>\r\n        </ng-template>\r\n      </ng-template>\r\n\r\n      </tbody>\r\n\r\n      <br/>\r\n      <br/>\r\n      <br/>\r\n      <br/>\r\n\r\n\r\n    </table>\r\n\r\n  </div>\r\n  <p-footer>\r\n    <button class=\"btn btn-info m-sm-2\" (click)=\"display=false\">بستن</button>\r\n    <button class=\"btn btn-info m-sm-2\" (click)=\"copyTimeToWholeWeekDays()\">کپی به تمام هفته</button>\r\n    <button class=\"btn btn-info m-sm-2\" (click)=\"copyTimeToWeekends()\">کپی به های تعطیل</button>\r\n    <button class=\"btn btn-outline-info m-sm-2\" (click)=\"copyTimeToAllWeeksNormalDays()\">کپی به روز های هفته تمامی هفته ها</button>\r\n    <button class=\"btn btn-outline-info m-sm-2\" (click)=\"copyTimeToAllWeeksNormalHolidays()\">کپی به تمامی تعطیل های هفته ها</button>\r\n  </p-footer>\r\n\r\n\r\n</p-dialog>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<p-dialog [(visible)]=\"macroDisplay\" maximizable=\"true\" id=\"macros\"\r\n          [closable]=\"true\" modal=\"true\">\r\n  <p-header>\r\n  ماکرو های آماده ، شیفت های متداول آماده\r\n  </p-header>\r\n\r\n  <div class=\"row\">\r\n\r\n\r\n    <div>\r\n\r\n    </div>\r\n\r\n    <table class=\"table table-bordered\">\r\n      <thead>\r\n      <tr>\r\n        <td>عنوان</td>\r\n        <td>توضیحات</td>\r\n        <td>انتخاب</td>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n\r\n      <ng-template ngFor [ngForOf]=\"macroList\" let-macro>\r\n        <tr>\r\n<td>{{macro.title}}</td>\r\n<td>{{macro.description}}</td>\r\n<td><button class=\"btn btn-outline-info\" (click)=\"import(macro);macroDisplay=false\">انتخاب</button></td>\r\n        </tr>\r\n      </ng-template>\r\n\r\n      </tbody>\r\n    </table>\r\n   <!-- <p-table #dt [columns]=\"cols\" [value]=\"macroList\" [paginator]=\"true\"\r\n\r\n             [rows]=\"10\">\r\n      <ng-template pTemplate=\"caption\">\r\n        <div style=\"text-align: right\">\r\n          <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\r\n          <input type=\"text\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\" style=\"width:auto\">\r\n        </div>\r\n      </ng-template>\r\n      <ng-template pTemplate=\"header\" let-columns>\r\n        <tr>\r\n          <th *ngFor=\"let col of columns\">\r\n            {{col.header}}\r\n          </th>\r\n          <th >\r\n            انتخاب\r\n          </th>\r\n        </tr>\r\n      </ng-template>\r\n      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\r\n        <tr>\r\n          <td *ngFor=\"let col of columns\">\r\n            {{rowData[col.field]}}\r\n          </td>\r\n          <td>\r\n            <button pButton icon=\"fa-search\" ></button>\r\n          </td>\r\n        </tr>\r\n      </ng-template>\r\n    </p-table>-->\r\n\r\n  </div>\r\n  <p-footer>\r\n    <button class=\"btn btn-info m-sm-2\" (click)=\"macroDisplay=false\">بستن</button>\r\n  </p-footer>\r\n\r\n\r\n</p-dialog>\r\n"

/***/ }),

/***/ "./src/app/absence/absence-index/absence-index.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/absence/absence-index/absence-index.component.ts ***!
  \******************************************************************/
/*! exports provided: AbsenceIndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsenceIndexComponent", function() { return AbsenceIndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _absence_DataProviderService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./absence.DataProviderService */ "./src/app/absence/absence-index/absence.DataProviderService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _database_tables_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../database/tables.service */ "./src/app/database/tables.service.ts");
/* harmony import */ var _absence_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./absence.models */ "./src/app/absence/absence-index/absence.models.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _macro_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../macro-service */ "./src/app/absence/macro-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AbsenceIndexComponent = /** @class */ (function () {
    function AbsenceIndexComponent(absenceDataProviderService, router) {
        this.absenceDataProviderService = absenceDataProviderService;
        this.router = router;
        this.weekNumNames = [
            'اول',
            'دوم',
            'سوم',
            'چهارم',
            'پنجم',
            'ششم',
            'هفتم',
            'هشتم',
            'نهم',
            'دهم',
        ];
        this.display = false;
        this.iterates = [];
        this.cols = [
            { field: 'title', header: 'عنوان' },
            { field: 'description', header: 'توضیحات' },
            { field: 'select', header: 'انتخاب' }
        ];
    }
    AbsenceIndexComponent.prototype.getRangeTypeName = function (type) {
        var item = this.rangeTypes.find(function (f) { return f.type == type; });
        if (item)
            return item.name;
        else
            return '';
    };
    AbsenceIndexComponent.prototype.decreaseWeek = function () {
        // آنهای که حذف نشده اند
        if (this.ObligatedRange.ObligatedRangeWeeks.filter(function (o) { return !o.IsRemoved; }).length > 7) {
            var isYes = confirm("آیا از حذف هفته آخر مطمئن هستید ؟");
            if (isYes) {
                // آخرین هفته را پیدا کن که حذف نشده است
                var notFirstWeek = this.ObligatedRange.ObligatedRangeWeeks.slice(7, this.ObligatedRange.ObligatedRangeWeeks.length - 1);
                if (!notFirstWeek.length || !notFirstWeek[0]) {
                    throw new Error("خطا در سیستم : هفته آخری برای حذف نال است");
                }
                // برعکس کن و اولین حذف نشده را بردار تا با شماره هفته آن ایتم ، آن هفته حذف شود
                var last = notFirstWeek.reverse().find(function (n) { return !n.IsRemoved; });
                // اگر از نوع جدید باشد یعنی قبلا در دیتابیس ذخیره نشده است
                if (!last.Id) {
                    this.ObligatedRange.ObligatedRangeWeeks = this.ObligatedRange.ObligatedRangeWeeks.filter(function (wk) { return wk.WeekNumber != last.WeekNumber; });
                }
                else {
                    // فیلتر کن و با شماره آن هفته ، حذف کن
                    this.ObligatedRange.ObligatedRangeWeeks
                        .filter(function (wk) { return wk.WeekNumber == last.WeekNumber; })
                        .forEach(function (wk2) {
                        if (wk2.IsRemoved) {
                            throw new Error("خطا در سیستم عملیات اشتباه ، این مورد قبلا حذف شده است");
                        }
                        wk2.IsRemoved = true;
                    });
                }
            }
        }
        this.reorder();
    };
    AbsenceIndexComponent.prototype.increaseWeek = function () {
        var lastweeknumber = this.ObligatedRange.ObligatedRangeWeeks[0].WeekNumber;
        var week = this.absenceDataProviderService.getWeek(lastweeknumber++);
        for (var i = 0; i < week.length; i++) {
            this.ObligatedRange.ObligatedRangeWeeks.push(week[i]);
        }
        this.reorder();
    };
    AbsenceIndexComponent.prototype.select = function (week) {
        if (week.IsSelected == null) {
            week.IsSelected = false;
        }
        week.IsSelected = !week.IsSelected;
    };
    AbsenceIndexComponent.prototype.NewObligatedRangeDayTime = function () {
        this.newNewObligatedRangeDayTime = new _absence_models__WEBPACK_IMPORTED_MODULE_4__["ObligatedRangeDayTimes"]();
        if (!this.selectedWeek.ObligatedRangeDayTimes) {
            this.selectedWeek.ObligatedRangeDayTimes = [];
        }
        this.newNewObligatedRangeDayTime.Start = '08:00';
        this.newNewObligatedRangeDayTime.End = '16:00';
        ;
        this.selectedWeek.ObligatedRangeDayTimes.push(this.newNewObligatedRangeDayTime);
    };
    AbsenceIndexComponent.prototype.setTimes = function (week) {
        this.display = true;
        this.selectedWeek = week;
    };
    AbsenceIndexComponent.prototype.loadById = function (id) {
        var _this = this;
        this.absenceDataProviderService.GetById(id).toPromise().then(function (res) {
            if (res.Status == _database_tables_service__WEBPACK_IMPORTED_MODULE_3__["CustomResultType"].success) {
                _this.ObligatedRange = res.result;
                for (var i = 0; i < _this.ObligatedRange.ObligatedRangeWeeks.length; i++) {
                    for (var j = 0; j < _this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes.length; j++) {
                        //Start
                        var temp = _this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].End;
                        var milli = temp.replace(/\/Date\((-?\d+)\)\//, '$1');
                        _this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].End = new Date(parseInt(milli)).toTimeString().slice(0, 5);
                        ;
                        //End
                        var temp2 = _this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start;
                        var milli = temp2.replace(/\/Date\((-?\d+)\)\//, '$1');
                        _this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start = new Date(parseInt(milli)).toTimeString().slice(0, 5);
                    }
                }
                _this.reorder();
            }
            else {
                alert(res.Message);
            }
        });
    };
    AbsenceIndexComponent.prototype.ngOnInit = function () {
        this.ObligatedRange = new _absence_models__WEBPACK_IMPORTED_MODULE_4__["ObligatedRange"]();
        this.ObligatedRange.ObligatedRangeWeeks = this.absenceDataProviderService.getWeek(1);
        var id = this.router.snapshot.queryParams["recordId"];
        if (id) {
            this.loadById(id);
        }
        else {
            this.reorder();
            //this.ObligatedRange.OffDay=this.ObligatedRange.ObligatedRangeWeeks.find(f=>f.DayOfWeek==DayOfWeek.Friday).DayOfWeek;
        }
        this.initRangeTypes();
        this.macroList = _macro_service__WEBPACK_IMPORTED_MODULE_6__["MacroService"].getMacroList();
    };
    AbsenceIndexComponent.prototype.remove = function (time) {
        time.IsRemoved = true;
    };
    AbsenceIndexComponent.prototype.save = function () {
        var _this = this;
        this.absenceDataProviderService.Save(this.ObligatedRange).toPromise().then(function (res) {
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"].ShowMsgByType('توجه', res.Status, res.Message);
            if (res.Status == _database_tables_service__WEBPACK_IMPORTED_MODULE_3__["CustomResultType"].success) {
                _this.loadById(res.result);
            }
        });
    };
    AbsenceIndexComponent.prototype.getWeekByNumber = function (num) {
        num++;
        return this.ObligatedRange.ObligatedRangeWeeks.filter(function (o) { return o.WeekNumber == num; }).reverse();
    };
    AbsenceIndexComponent.prototype.reorder = function () {
        var counter = 0;
        for (var i = 0; i < this.ObligatedRange.ObligatedRangeWeeks.length; i += 7) {
            counter++;
            var week = this.ObligatedRange.ObligatedRangeWeeks.slice(i, i + 7);
            for (var j = 0; j < week.length; j++) {
                week[j].WeekNumber = counter;
            }
        }
        this.iterates = [];
        for (var i = 0; i < counter; i++) {
            this.iterates.push(i);
        }
    };
    AbsenceIndexComponent.prototype.initRangeTypes = function () {
        this.rangeTypes = [];
        this.rangeTypes.push({ name: 'فاصله زمانی مجاز برای تأخیر', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].Authorized_Delay_Gap });
        this.rangeTypes.push({ name: 'شب کاری', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].NightWork });
        this.rangeTypes.push({ name: 'تعطیل کاری', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].NightWork });
        this.rangeTypes.push({ name: 'استراحت', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].Interrupion });
        this.rangeTypes.push({ name: 'معمولی', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].Normal });
        this.rangeTypes.push({ name: 'اضافه کاری', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].Overtime });
        this.rangeTypes.push({ name: ' نوبت کاری : صبح و عصر', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].ShiftWorkMorningAndAfternoon });
        this.rangeTypes.push({ name: ' نوبت کاری : صبح و عصر و شب', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].ShiftWorkMorningAndAfternoonAndNight });
        this.rangeTypes.push({ name: ' نوبت کاری : صبح و شب یا عصر و شب', type: _absence_models__WEBPACK_IMPORTED_MODULE_4__["RangeType"].ShiftWorkMorningAndAfternoon });
    };
    AbsenceIndexComponent.prototype.selectWeekDays = function (weekDay, event) {
        weekDay++;
        var checkBoxStatus = event.srcElement.checked;
        for (var i = 1; i <= this.ObligatedRange.ObligatedRangeWeeks.length / 7; i++) {
            if (weekDay == i) {
                for (var j = i * 7 - 7; j < i * 7; j++) {
                    if (checkBoxStatus == undefined) {
                        checkBoxStatus = this.ObligatedRange.ObligatedRangeWeeks[j].IsSelected;
                    }
                    this.ObligatedRange.ObligatedRangeWeeks[j].IsSelected = checkBoxStatus;
                }
            }
        }
    };
    AbsenceIndexComponent.prototype.copyTimeToWholeWeekDays = function () {
        this.copyTimeToWholeWeekDaysHelp(true);
    };
    AbsenceIndexComponent.prototype.copyTimeToWeekends = function () {
        this.copyTimeToWholeWeekDaysHelp(false);
    };
    AbsenceIndexComponent.prototype.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    AbsenceIndexComponent.prototype.copyTimeToWholeWeekDaysHelp = function (skipOffDays) {
        if (!this.selectedWeek.ObligatedRangeDayTimes || !this.selectedWeek.ObligatedRangeDayTimes.length) {
            return;
        }
        //for every week
        for (var i = 1; i <= this.ObligatedRange.ObligatedRangeWeeks.length / 7; i++) {
            // find particular week
            if (this.selectedWeek.WeekNumber == i) {
                // that week inside array
                for (var j = i * 7 - 7; j < i * 7; j++) {
                    var length_1 = this.selectedWeek.ObligatedRangeDayTimes;
                    // make all empty
                    for (var k = 0; k < length_1.length; k++) {
                        // skip itself
                        if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[j]) {
                            continue;
                        }
                        // skip these days
                        if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
                            continue;
                        }
                        // if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
                        this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes = [];
                        // }
                    }
                    // add every time defined in this selected week
                    for (var k = 0; k < length_1.length; k++) {
                        // maybe array is null
                        if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
                            this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes = [];
                        }
                        // skip itself
                        if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[j]) {
                            continue;
                        }
                        // skip these days
                        if (this.ObligatedRange.ObligatedRangeWeeks[j].IsOffDay == skipOffDays) {
                            continue;
                        }
                        var clone1 = this.clone(this.selectedWeek.ObligatedRangeDayTimes[k]);
                        this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes.push(
                        // copy and paste
                        clone1);
                    }
                }
            }
        }
    };
    AbsenceIndexComponent.prototype.toggleOffday = function (weekDay) {
        debugger;
        weekDay.IsOffDay = !weekDay.IsOffDay;
    };
    AbsenceIndexComponent.prototype.copyTimeToAllDays_help = function (skipOffDays) {
        if (!this.selectedWeek.ObligatedRangeDayTimes || !this.selectedWeek.ObligatedRangeDayTimes.length) {
            return;
        }
        //for every week
        for (var i = 0; i < this.ObligatedRange.ObligatedRangeWeeks.length; i++) {
            // find particular week
            // if (this.selectedWeek.WeekNumber == i) {
            // that week inside array
            // for (let j = i * 7 - 7; j < i * 7; j++) {
            var length_2 = this.selectedWeek.ObligatedRangeDayTimes;
            // make all empty
            for (var k = 0; k < length_2.length; k++) {
                // skip itself
                if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[i]) {
                    continue;
                }
                // skip these days
                if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
                    continue;
                }
                // if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
                this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes = [];
                // }
            }
            // add every time defined in this selected week
            for (var k = 0; k < length_2.length; k++) {
                // maybe array is null
                if (!this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes) {
                    this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes = [];
                }
                // skip itself
                if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[i]) {
                    continue;
                }
                // skip these days
                if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
                    continue;
                }
                var clone1 = this.clone(this.selectedWeek.ObligatedRangeDayTimes[k]);
                this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes.push(
                // copy and paste
                clone1);
            }
            //  }
            //}
        }
    };
    AbsenceIndexComponent.prototype.copyTimeToAllWeeksNormalDays = function () {
        this.copyTimeToAllDays_help(true);
    };
    AbsenceIndexComponent.prototype.copyTimeToAllWeeksNormalHolidays = function () {
        this.copyTimeToAllDays_help(false);
    };
    AbsenceIndexComponent.prototype.exportMacro = function () {
        console.log(JSON.stringify(this.ObligatedRange));
    };
    AbsenceIndexComponent.prototype.import = function (macro) {
        this.ObligatedRange = JSON.parse(macro.json);
    };
    AbsenceIndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-absence-index',
            template: __webpack_require__(/*! ./absence-index.component.html */ "./src/app/absence/absence-index/absence-index.component.html"),
            styles: [__webpack_require__(/*! ./absence-index.component.css */ "./src/app/absence/absence-index/absence-index.component.css")],
            providers: [_absence_DataProviderService__WEBPACK_IMPORTED_MODULE_1__["AbsenceDataProviderService"]]
        }),
        __metadata("design:paramtypes", [_absence_DataProviderService__WEBPACK_IMPORTED_MODULE_1__["AbsenceDataProviderService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], AbsenceIndexComponent);
    return AbsenceIndexComponent;
}());



/***/ }),

/***/ "./src/app/absence/absence-index/absence.DataProviderService.ts":
/*!**********************************************************************!*\
  !*** ./src/app/absence/absence-index/absence.DataProviderService.ts ***!
  \**********************************************************************/
/*! exports provided: AbsenceDataProviderService, Global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsenceDataProviderService", function() { return AbsenceDataProviderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return Global; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _absence_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./absence.models */ "./src/app/absence/absence-index/absence.models.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AbsenceDataProviderService = /** @class */ (function () {
    function AbsenceDataProviderService(http) {
        this.http = http;
        this.headers = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    AbsenceDataProviderService.prototype.getDay = function (name, t, WeekNumber) {
        var sat = new _absence_models__WEBPACK_IMPORTED_MODULE_2__["ObligatedRangeWeeks"]();
        sat.DayOfWeek = t;
        sat.DayOfWeekFaName = name;
        sat.WeekNumber = WeekNumber;
        return sat;
    };
    AbsenceDataProviderService.prototype.getWeek = function (WeekNumber) {
        var weeks = [];
        weeks.push(this.getDay("شنبه", 6 /* Saturday */, WeekNumber));
        weeks.push(this.getDay("یکشنبه", 0 /* Sunday */, WeekNumber));
        weeks.push(this.getDay("دوشنبه", 1 /* Monday */, WeekNumber));
        weeks.push(this.getDay("سه شنبه", 2 /* Tuesday */, WeekNumber));
        weeks.push(this.getDay("چهارشنبه", 3 /* Wednesday */, WeekNumber));
        weeks.push(this.getDay("پنجشنبه", 4 /* Thursday */, WeekNumber));
        weeks.push(this.getDay("جمعه", 5 /* Friday */, WeekNumber));
        return weeks.reverse();
    };
    AbsenceDataProviderService.prototype.GetById = function (id) {
        return this.http.get("" + this.getRootUrl + this.getAreaAndPath + "/getById?id=" + id, this.headers);
    };
    Object.defineProperty(AbsenceDataProviderService.prototype, "getRootUrl", {
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
    Object.defineProperty(AbsenceDataProviderService.prototype, "getAreaAndPath", {
        get: function () {
            return 'absence/ObligatedRange';
        },
        enumerable: true,
        configurable: true
    });
    AbsenceDataProviderService.prototype.getAllQueries = function (searchTerm, lastIndex, count) {
        return this.http.get("" + this.getRootUrl + this.getAreaAndPath + "/getAll?lastIndex=&count=", this.headers);
    };
    AbsenceDataProviderService.prototype.Save = function (ObligatedRange) {
        return this.http.post("" + this.getRootUrl + this.getAreaAndPath + "/Save", ObligatedRange, this.headers);
    };
    AbsenceDataProviderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AbsenceDataProviderService);
    return AbsenceDataProviderService;
}());

var Global = /** @class */ (function () {
    function Global() {
    }
    Global.__API_URL__ = function () {
        var rootUrl = window['rootUrl'];
        if (!rootUrl) {
            console.error('rootUrl is null');
        }
        return rootUrl;
    };
    return Global;
}());



/***/ }),

/***/ "./src/app/absence/absence-index/absence.models.ts":
/*!*********************************************************!*\
  !*** ./src/app/absence/absence-index/absence.models.ts ***!
  \*********************************************************/
/*! exports provided: AbsenceBase, BiometricData, Machine, ObligatedRange, ObligatedRangeDayTimes, RangeType, ObligatedRangeWeeks, Personnel, PersonnelMachine, WorkGroup, WorkGroupObligatedRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsenceBase", function() { return AbsenceBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BiometricData", function() { return BiometricData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Machine", function() { return Machine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObligatedRange", function() { return ObligatedRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObligatedRangeDayTimes", function() { return ObligatedRangeDayTimes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeType", function() { return RangeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObligatedRangeWeeks", function() { return ObligatedRangeWeeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Personnel", function() { return Personnel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonnelMachine", function() { return PersonnelMachine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkGroup", function() { return WorkGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkGroupObligatedRange", function() { return WorkGroupObligatedRange; });
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
var AbsenceBase = /** @class */ (function () {
    function AbsenceBase() {
    }
    return AbsenceBase;
}());

var BiometricData = /** @class */ (function () {
    function BiometricData() {
    }
    return BiometricData;
}());

var Machine = /** @class */ (function (_super) {
    __extends(Machine, _super);
    function Machine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Machine;
}(AbsenceBase));

var ObligatedRange = /** @class */ (function (_super) {
    __extends(ObligatedRange, _super);
    function ObligatedRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObligatedRange;
}(AbsenceBase));

var ObligatedRangeDayTimes = /** @class */ (function (_super) {
    __extends(ObligatedRangeDayTimes, _super);
    function ObligatedRangeDayTimes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.End = '08:00';
        _this.Start = '16:00';
        return _this;
    }
    return ObligatedRangeDayTimes;
}(AbsenceBase));

var RangeType;
(function (RangeType) {
    RangeType[RangeType["Normal"] = 0] = "Normal";
    RangeType[RangeType["Overtime"] = 1] = "Overtime";
    RangeType[RangeType["NightWork"] = 2] = "NightWork";
    RangeType[RangeType["HolidayWork"] = 3] = "HolidayWork";
    RangeType[RangeType["ShiftWorkMorningAndAfternoon"] = 4] = "ShiftWorkMorningAndAfternoon";
    RangeType[RangeType["ShiftWorkMorningAndAfternoonAndNight"] = 5] = "ShiftWorkMorningAndAfternoonAndNight";
    RangeType[RangeType["ShiftWorkMorningAndNightOrAfternoonAndNight"] = 6] = "ShiftWorkMorningAndNightOrAfternoonAndNight";
    RangeType[RangeType["Interrupion"] = 7] = "Interrupion";
    RangeType[RangeType["Authorized_Delay_Gap"] = 8] = "Authorized_Delay_Gap";
})(RangeType || (RangeType = {}));
var ObligatedRangeWeeks = /** @class */ (function (_super) {
    __extends(ObligatedRangeWeeks, _super);
    function ObligatedRangeWeeks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IsOffDay = false;
        return _this;
    }
    return ObligatedRangeWeeks;
}(AbsenceBase));

var Personnel = /** @class */ (function (_super) {
    __extends(Personnel, _super);
    function Personnel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Personnel;
}(AbsenceBase));

var PersonnelMachine = /** @class */ (function (_super) {
    __extends(PersonnelMachine, _super);
    function PersonnelMachine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PersonnelMachine;
}(AbsenceBase));

var WorkGroup = /** @class */ (function (_super) {
    __extends(WorkGroup, _super);
    function WorkGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WorkGroup;
}(AbsenceBase));

var WorkGroupObligatedRange = /** @class */ (function () {
    function WorkGroupObligatedRange() {
    }
    return WorkGroupObligatedRange;
}());



/***/ }),

/***/ "./src/app/absence/absence.module.ts":
/*!*******************************************!*\
  !*** ./src/app/absence/absence.module.ts ***!
  \*******************************************/
/*! exports provided: AbsenceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsenceModule", function() { return AbsenceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./absence-index/absence-index.component */ "./src/app/absence/absence-index/absence-index.component.ts");
/* harmony import */ var _abscence_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abscence-routing.module */ "./src/app/absence/abscence-routing.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _form_generator_form_generator_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../form-generator/form-generator.module */ "./src/app/form-generator/form-generator.module.ts");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/table.js");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_table__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _workplaces_workplaces_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./workplaces/workplaces.component */ "./src/app/absence/workplaces/workplaces.component.ts");
/* harmony import */ var _crud_crud_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./crud/crud.component */ "./src/app/absence/crud/crud.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AbsenceModule = /** @class */ (function () {
    function AbsenceModule() {
    }
    AbsenceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _abscence_routing_module__WEBPACK_IMPORTED_MODULE_3__["AbsenceRoutingModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
                _form_generator_form_generator_module__WEBPACK_IMPORTED_MODULE_5__["FormGeneratorModule"], primeng_dialog__WEBPACK_IMPORTED_MODULE_6__["DialogModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_7__["CalendarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"], primeng_primeng__WEBPACK_IMPORTED_MODULE_7__["MultiSelectModule"], primeng_table__WEBPACK_IMPORTED_MODULE_9__["TableModule"], primeng_primeng__WEBPACK_IMPORTED_MODULE_7__["InputTextModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"], primeng_primeng__WEBPACK_IMPORTED_MODULE_7__["ListboxModule"]
            ],
            declarations: [_absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__["AbsenceIndexComponent"], _workplaces_workplaces_component__WEBPACK_IMPORTED_MODULE_10__["WorkplacesComponent"], _crud_crud_component__WEBPACK_IMPORTED_MODULE_11__["CrudComponent"]],
            bootstrap: [_absence_index_absence_index_component__WEBPACK_IMPORTED_MODULE_2__["AbsenceIndexComponent"]],
        })
    ], AbsenceModule);
    return AbsenceModule;
}());



/***/ }),

/***/ "./src/app/absence/crud/crud.component.css":
/*!*************************************************!*\
  !*** ./src/app/absence/crud/crud.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/absence/crud/crud.component.html":
/*!**************************************************!*\
  !*** ./src/app/absence/crud/crud.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p-table [columns]=\"cols\" [value]=\"models\" styleClass=\"table container\"\n\n         selectionMode=\"single\" [(selection)]=\"selectedModel\"\n          [paginator]=\"true\" [rows]=\"15\">\n  <ng-template pTemplate=\"caption\">\n    {{header}}\n  </ng-template>\n  <ng-template pTemplate=\"header\" let-columns>\n    <tr>\n      <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n        {{col.header}}\n        <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n      </th>\n      <ng-template [ngTemplateOutlet]=\"columnHeaderContent\" [ngTemplateOutletContext]=\"{$implicit: columns}\"></ng-template>\n\n      <th>\n        ویرایش / حذف\n      </th>\n    </tr>\n  </ng-template>\n  <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n    <tr [pSelectableRow]=\"rowData\">\n      <td *ngFor=\"let col of columns\">\n\n        <div [ngSwitch]=\"getType(rowData[col.field])\">\n          <div *ngSwitchCase=\"'boolean'\">\n            <i *ngIf=\"rowData[col.field]\" class=\"fa fa-check text-success\"></i>\n            <i *ngIf=\"!rowData[col.field]\" class=\"fa fa-times text-danger\"></i>\n          </div>\n\n          <div *ngSwitchDefault>\n            {{rowData[col.field]}}\n          </div>\n        </div>\n\n      </td>\n\n      <ng-template [ngTemplateOutlet]=\"columnContent\" [ngTemplateOutletContext]=\"{$implicit: rowData}\"></ng-template>\n\n      <td>\n        <button class=\"btn btn-primary text-white\" (click)=\"selectCarWithButton(rowData)\">\n          <i class=\"fa fa-search\"></i>\n        </button>\n      </td>\n\n\n\n\n    </tr>\n  </ng-template>\n  <ng-template pTemplate=\"summary\" let-rowData>\n    <div style=\"text-align:left\">\n      <button type=\"button\" pButton icon=\"fa fa-plus\" (click)=\"showDialogToAdd()\" [label]=\"AddButtonTitle\"></button>\n    </div>\n  </ng-template>\n</p-table>\n\n<p-dialog [header]=\"newModel  ? newFormHeader : editFormHeader\" [(visible)]=\"displayDialog\" [responsive]=\"true\"\n          showEffect=\"fade\" [modal]=\"true\"\n          [style]=\"{width: '350px'}\">\n  <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n    <div class=\"row d-flex\" *ngIf=\"model\">\n      <div class=\"col-md-6\" *ngFor=\"let field of formFields\">\n        <label *ngIf=\"field.type != 'checkbox'\">{{ field.label }}</label>\n\n        <div [ngSwitch]=\"field.controlType\">\n\n\n           <div\n             *ngSwitchCase=\"'textbox'\"\n           >\n             <div *ngIf=\"field.type != 'checkbox'\">\n               <input\n                 [formControlName]=\"field.name\"\n                 [class]=\" field.type != 'checkbox' ?  'form-control' : 'form-check-input'\"\n                 [id]=\"field.name\"\n                 [type]=\"field.type\"\n               />\n             </div>\n             <div *ngIf=\"field.type =='checkbox'\">\n               <label >\n                 <input\n                   [formControlName]=\"field.name\"\n                   [class]=\" field.type != 'checkbox' ?  'form-control' : 'form-check-input'\"\n                   [id]=\"field.name\"\n                   type=\"checkbox\"\n\n                 />\n                 <span class=\"ms-2 mb-2\">{{ field.label }}</span>\n               </label>\n             </div>\n           </div>\n\n\n          <textarea\n            *ngSwitchCase=\"'textarea'\"\n            class=\"form-control\"\n            [formControlName]=\"field.name\"\n            [id]=\"field.name\"\n          ></textarea>\n\n          <select\n            *ngSwitchCase=\"'dropdown'\"\n            [formControlName]=\"field.name\"\n            class=\"form-control\"\n            [id]=\"field.name\"\n          >\n            <option *ngFor=\"let option of field.options\" [value]=\"option.value\">\n              {{ option.label }}\n            </option>\n          </select>\n\n            <p-listbox *ngSwitchCase=\"'listbox'\" [options]=\"field.options\"\n                       multiple=\"multiple\" checkbox=\"checkbox\" filter=\"filter\"\n                       [formControlName]=\"field.name\" optionLabel=\"label\"></p-listbox>\n\n        </div>\n\n\n\n\n        <div *ngIf=\"form.get(field.name)?.invalid && form.get(field.name)?.touched\">\n          {{ field.validationMessage }}\n        </div>\n\n\n      </div>\n\n      <ng-content select=\"[formContent]\"></ng-content>\n\n\n    </div>\n    <p-footer>\n      <div class=\"ui-dialog-buttonpane ui-helper-clearfix\">\n        <button type=\"button\" pButton icon=\"fa fa-close\" (click)=\"delete()\" label=\"حذف\"></button>\n        <button type=\"button\" pButton icon=\"fa fa-check\" (click)=\"save()\" label=\"ثبت\"></button>\n      </div>\n    </p-footer>\n  </form>\n\n</p-dialog>\n"

/***/ }),

/***/ "./src/app/absence/crud/crud.component.ts":
/*!************************************************!*\
  !*** ./src/app/absence/crud/crud.component.ts ***!
  \************************************************/
/*! exports provided: CrudComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrudComponent", function() { return CrudComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _database_tables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../database/tables.service */ "./src/app/database/tables.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CrudComponent = /** @class */ (function () {
    function CrudComponent() {
        this.model = {};
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        // ----------------------------- form builder
        this.formFields = [];
        // ----------------------------- form builder
        this.newFormHeader = 'ثبت رکورد جدید';
        this.editFormHeader = 'ویرایش رکورد';
        this.AddButtonTitle = 'رکورد جدید';
    }
    CrudComponent.prototype.onSubmit = function () {
        if (this.form.valid) {
            console.log('Form submitted:', this.form.value);
            // Handle form submission logic here
        }
        else {
            console.error('Form is invalid');
        }
    };
    CrudComponent.prototype.reload = function () {
        var _this = this;
        this.service.get().toPromise().then(function (res) {
            if (res.Status == _database_tables_service__WEBPACK_IMPORTED_MODULE_2__["CustomResultType"].success) {
                _this.models = res.result;
            }
        });
    };
    CrudComponent.prototype.ngOnInit = function () {
        this.reload();
    };
    CrudComponent.prototype.showDialogToAdd = function () {
        this.newModel = true;
        this.model = {};
        this.displayDialog = true;
    };
    CrudComponent.prototype.save = function () {
        var _this = this;
        console.trace(this.selectedModel, this.form.value);
        this.synchronizeObjects(this.selectedModel, this.form.value);
        console.trace(this.selectedModel);
        this.service.save(this.selectedModel).toPromise()
            .then(function (s) {
            _this.model = null;
            _this.displayDialog = false;
            _this.reload();
        });
    };
    CrudComponent.prototype.delete = function () {
        var _this = this;
        var index = this.models.indexOf(this.selectedModel);
        this.service.delete(this.models[index]).toPromise()
            .then(function (s) {
            _this.model = null;
            _this.displayDialog = false;
            _this.reload();
        });
    };
    CrudComponent.prototype.cloneModel = function (c) {
        var model = {};
        for (var prop in c) {
            model[prop] = c[prop];
        }
        return model;
    };
    CrudComponent.prototype.selectCarWithButton = function (car) {
        this.selectedModel = car;
        this.newModel = false;
        this.model = this.cloneModel(car);
        console.trace(this.form.value);
        this.form.patchValue(this.model);
        this.displayDialog = true;
    };
    CrudComponent.prototype.getType = function (value) {
        return typeof value;
    };
    CrudComponent.prototype.synchronizeObjects = function (source, newValues) {
        for (var key in source) {
            if (source.hasOwnProperty(key) && newValues.hasOwnProperty(key)) {
                source[key] = newValues[key];
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"])('columnHeaderContent'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], CrudComponent.prototype, "columnHeaderContent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"])('columnContent'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], CrudComponent.prototype, "columnContent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "header", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "service", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "cols", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CrudComponent.prototype, "formFields", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], CrudComponent.prototype, "form", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "newFormHeader", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "editFormHeader", void 0);
    CrudComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-crud',
            template: __webpack_require__(/*! ./crud.component.html */ "./src/app/absence/crud/crud.component.html"),
            styles: [__webpack_require__(/*! ./crud.component.css */ "./src/app/absence/crud/crud.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CrudComponent);
    return CrudComponent;
}());



/***/ }),

/***/ "./src/app/absence/macro-service.ts":
/*!******************************************!*\
  !*** ./src/app/absence/macro-service.ts ***!
  \******************************************/
/*! exports provided: MacroService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MacroService", function() { return MacroService; });
var MacroService = /** @class */ (function () {
    function MacroService() {
    }
    MacroService.getMacroList = function () {
        return [
            { title: 'روز کار عادی', description: 'تمامی هفته ، روزانه ، 8 صبح الی 16 عصر مناسب کارمندان و کارگران روز کار عادی', json: '{"ObligatedRangeWeeks":[{"IsOffDay":true,"DayOfWeek":5,"DayOfWeekFaName":"جمعه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":4,"DayOfWeekFaName":"پنجشنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":3,"DayOfWeekFaName":"چهارشنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":2,"DayOfWeekFaName":"سه شنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":1,"DayOfWeekFaName":"دوشنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":0,"DayOfWeekFaName":"یکشنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]},{"IsOffDay":false,"DayOfWeek":6,"DayOfWeekFaName":"شنبه","WeekNumber":1,"ObligatedRangeDayTimes":[{"End":"16:00","Start":"08:00","RangeType":"0"}]}]}' }
        ];
    };
    return MacroService;
}());



/***/ }),

/***/ "./src/app/absence/services/workplaces.service.ts":
/*!********************************************************!*\
  !*** ./src/app/absence/services/workplaces.service.ts ***!
  \********************************************************/
/*! exports provided: WorkplacesService, Workplace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkplacesService", function() { return WorkplacesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Workplace", function() { return Workplace; });
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


var WorkplacesService = /** @class */ (function () {
    function WorkplacesService(http) {
        this.http = http;
    }
    WorkplacesService.prototype.delete = function (model) {
        return undefined;
    };
    WorkplacesService.prototype.get = function () {
        var url = "/Mobile/Workplaces/Get";
        return this.http.get(url, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        });
    };
    WorkplacesService.prototype.save = function (model) {
        var url = "/Mobile/Workplaces/Save";
        return this.http.post(url, model, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        });
    };
    WorkplacesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], WorkplacesService);
    return WorkplacesService;
}());

var Workplace = /** @class */ (function () {
    function Workplace() {
    }
    return Workplace;
}());



/***/ }),

/***/ "./src/app/absence/workplaces/workplaces.component.css":
/*!*************************************************************!*\
  !*** ./src/app/absence/workplaces/workplaces.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/absence/workplaces/workplaces.component.html":
/*!**************************************************************!*\
  !*** ./src/app/absence/workplaces/workplaces.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n\n\n<app-crud [header]=\"'لیست محل های کار'\" [cols]=\"cols\" [form]=\"form\"\n          [formFields]=\"fields\"   [service]=\"workplacesService\">\n\n  <ng-template #columnHeaderContent let-columns>\n    <th>پرسنل</th>\n  </ng-template>\n\n  <ng-template #columnContent let-item>\n    <td>{{item.Name}}</td>\n\n  </ng-template>\n\n</app-crud>\n"

/***/ }),

/***/ "./src/app/absence/workplaces/workplaces.component.ts":
/*!************************************************************!*\
  !*** ./src/app/absence/workplaces/workplaces.component.ts ***!
  \************************************************************/
/*! exports provided: WorkplacesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkplacesComponent", function() { return WorkplacesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_workplaces_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/workplaces.service */ "./src/app/absence/services/workplaces.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkplacesComponent = /** @class */ (function () {
    function WorkplacesComponent(fb, workplacesService) {
        this.fb = fb;
        this.workplacesService = workplacesService;
        this.cols = [
            { field: 'Name', header: 'نام مکان' },
            { field: 'IsNotificationsEnabled', header: 'اطلاع رسانی' },
            { field: 'IsFaceRecognationEnabled', header: 'تشخیص چهره' },
            { field: 'oneDeviceEnabled', header: 'استفاده از یک دستگاه برای ورود برای این گروه کاری' },
            { field: 'oneDeviceEnabled', header: 'استفاده از یک دستگاه برای ورود برای این گروه کاری' },
            { field: 'UserClockTypesarr', header: 'انواع ساعت زنی' },
        ];
        this.formFields = [];
        this.fields = [
            {
                label: 'اطلاع رسانی فعال باشد',
                name: 'IsNotificationsEnabled',
                type: 'checkbox',
                value: true,
                controlType: 'textbox',
                required: false,
                validationMessage: 'Message is required',
            },
            {
                label: 'تشخیص چهره فعال باشد',
                name: 'IsFaceRecognationEnabled',
                type: 'checkbox',
                value: true,
                controlType: 'textbox',
                required: false,
                validationMessage: 'Message is required',
            },
            {
                label: 'استفاده از یک دستگاه برای ورود برای این گروه کاری',
                name: 'oneDeviceEnabled',
                type: 'checkbox',
                value: true,
                controlType: 'textbox',
                required: false,
                validationMessage: 'Email is required',
            },
            {
                label: 'نام مکان',
                name: 'Name',
                type: 'text',
                value: '',
                controlType: 'textbox',
                required: true,
                validationMessage: 'Name is required',
            },
            {
                label: 'انواع ساعت زنی',
                name: 'UserClockTypesarr',
                type: 'listbox',
                value: true,
                options: [
                    { label: 'GPS در محدوده مکان شرکت با', value: 0 },
                    { label: 'گرفتن سلفی هنگام کارت زنی', value: 1 },
                    { label: 'اسکن QRCode', value: 3 },
                    { label: 'بعد از ورود به وای فای مکان (Wifi)', value: 4 },
                ],
                controlType: 'listbox',
                required: true,
                validationMessage: 'Category is required',
            }
        ];
    }
    WorkplacesComponent.prototype.ngOnInit = function () {
        this.form = this.createFormGroup();
    };
    WorkplacesComponent.prototype.createFormGroup = function () {
        var group = {};
        this.fields.forEach(function (field) {
            group[field.name] = field.required
                ? [field.value, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
                : [field.value];
        });
        var fg = this.fb.group(group);
        return fg;
    };
    WorkplacesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-workplaces',
            template: __webpack_require__(/*! ./workplaces.component.html */ "./src/app/absence/workplaces/workplaces.component.html"),
            styles: [__webpack_require__(/*! ./workplaces.component.css */ "./src/app/absence/workplaces/workplaces.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_workplaces_service__WEBPACK_IMPORTED_MODULE_1__["WorkplacesService"]])
    ], WorkplacesComponent);
    return WorkplacesComponent;
}());



/***/ })

}]);
//# sourceMappingURL=absence-absence-module.js.map