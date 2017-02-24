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
var core_1 = require("@angular/core");
var CrystalNavComponent = (function () {
    function CrystalNavComponent() {
    }
    CrystalNavComponent.prototype.ngOnInit = function () {
        var jquery = require("jquery");
        require("jquery.ripples");
        jquery(".ripple").ripples();
    };
    return CrystalNavComponent;
}());
CrystalNavComponent = __decorate([
    core_1.Component({
        selector: "crystal-nav",
        template: "<!--Created by qhyang on 2017/2/21.\n\n--><nav><ul class=\"ripple\"><li><a href=\"#\">Home</a></li><li><a href=\"#\">About</a></li><li><a href=\"#\">Services</a></li><li><a href=\"#\">Contact</a></li></ul></nav>",
        styles: []
    })
], CrystalNavComponent);
exports.CrystalNavComponent = CrystalNavComponent;
//# sourceMappingURL=crystal-nav.component.js.map