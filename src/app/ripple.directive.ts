/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({ selector: "[bsRipple]" })
export class RippleDirective implements OnInit {
    constructor(private el: ElementRef) { }

    ngOnInit() {
        let JQuery = require("jquery");

        require("jquery.ripples");
        JQuery(this.el.nativeElement).ripples();
    }
}