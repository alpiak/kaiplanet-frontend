/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({ selector: "[bsStickUp]" })
export class StickUpDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let JQuery = require("jquery");

        require("stickUp");
        JQuery(this.el.nativeElement).stickUp();
    }
}