/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";

const jQuery = require("jquery");

@Directive({ selector: "[bsRipple]" })
export class RippleDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        require("jquery.ripples");
        jQuery(this.el.nativeElement).ripples();
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).ripples('destroy');
    }
}