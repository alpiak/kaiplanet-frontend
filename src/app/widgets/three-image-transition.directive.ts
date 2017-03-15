/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

const jQuery = require("jquery");

@Directive({ selector: "[threeImageTransition]" })
export class ThreeImageTransitionDirective implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) {
        this.gridItemContainer = jQuery(el).parent().parent()[0];
    }

    ngAfterViewInit() {
        let ThreeImageTransition = require("../../scripts/three-image-transition");

        setTimeout(() => {
            let threeImageTransition = ThreeImageTransition(this.el.nativeElement);
            this.gridStackService.on("resizeStop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    setTimeout(() => threeImageTransition.resize(), 300);
                }
            });
        }, 200);
    }
}