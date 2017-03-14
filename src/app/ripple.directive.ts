/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({ selector: "[bsRipple]" })
export class RippleDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let JQuery = require("jquery");

        require("jquery.ripples");
        JQuery(this.el.nativeElement).ripples();
    }
}