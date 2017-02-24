/**
 * Created by qhyang on 2017/2/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
var core_1 = require("@angular/core");
var BomService = (function () {
    function BomService() {
    }
    BomService.prototype.windowResize = function () {
        return Observable_1.Observable.fromEvent(window, "resize");
    };
    return BomService;
}());
BomService = __decorate([
    core_1.Injectable()
], BomService);
exports.BomService = BomService;
//# sourceMappingURL=bom.service.js.map