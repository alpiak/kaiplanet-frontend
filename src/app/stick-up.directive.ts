/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: "[bsStickUp]" })
export class StickUpDirective implements OnInit {
    constructor(private el: ElementRef) { }

    ngOnInit() {
        let JQuery = require("jquery");

        require("stickUp");
        JQuery(this.el.nativeElement).stickUp();
    }
}