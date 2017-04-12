/**
 * Created by qhyang on 2017/4/11.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

@Directive({ selector: "[bsMdlUpgrade]" })
export class MDLUpgradeDirective implements AfterViewInit {
    @Input("bsMdlUpgrade") type: string;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let jQuery = require("jquery");

        setTimeout(() => {
            if (this.type = "mdl-tabs") {
                jQuery(this.el.nativeElement)
                    .addClass("mdl-js-tabs mdl-js-ripple-effect")
                    .each(function() {
                        window["componentHandler"].upgradeElements(this)
                    });
            } else if (this.type = "mdl-checkbox") {
                jQuery(this.el.nativeElement)
                    .find(".mdl-checkbox")
                    .each(function() {
                        window["componentHandler"].upgradeElements(this)
                    });
            }
        }, 200);
    }
}