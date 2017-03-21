/**
 * Created by qhyang on 2017/3/21.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

@Directive({ selector: "[Waterfall]" })
export class WaterfallDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let NightlyNiagaraMist = require("../../scripts/nightly-niagara-mist");

        setTimeout(() => NightlyNiagaraMist(this.el.nativeElement), 300);
    }
}