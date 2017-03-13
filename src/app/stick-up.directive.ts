/**
 * Created by qhyang on 2017/3/2.
 */

import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({ selector: "[bsStickUp]" })
export class StickUpDirective implements OnInit {
    constructor(private el: ElementRef) { }

    ngOnInit() {
        let jQuery = require("jquery");

        require("stickUp");
        jQuery(this.el.nativeElement).stickUp();
    }
}