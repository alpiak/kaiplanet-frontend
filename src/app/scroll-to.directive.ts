/**
 * Created by qhyang on 2017/4/11.
 */

import { Directive, ElementRef, OnInit, Input } from "@angular/core";

@Directive({ selector: "[bsScrollTo]" })
export class ScrollToDirective implements OnInit {
    @Input("bsScrollTo") where: string;
    @Input() duration: number;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (this.where === "bottom") {
            let jQuery = require("jquery");

            jQuery(this.el.nativeElement).click(() => {
                jQuery("body").animate({
                    scrollTop: jQuery(document).height()
                }, this.duration)
            });
        }
    }
}