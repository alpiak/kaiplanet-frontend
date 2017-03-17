/**
 * Created by qhyang on 2017/3/17.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({ selector: "[WindAndSand]" })
export class WindAndSandDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let windAndSand = require("../../scripts/wind-and-sand");

        windAndSand(this.el.nativeElement);
    }
}