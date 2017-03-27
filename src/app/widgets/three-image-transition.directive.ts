/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[threeImageTransition]" })
export class ThreeImageTransitionDirective implements AfterViewInit {
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        const ThreeImageTransition = require("../../scripts/three-image-transition");

        setTimeout(() => {
            let threeImageTransition = ThreeImageTransition(this.el.nativeElement);

            this.gridStackService.on("init").subscribe(() => {
                this.gridStackService.on("resizestop").subscribe((event) => {
                    if (event.target === this.gridItemContainer) {
                        setTimeout(() => threeImageTransition.resize(), 300);
                    }
                });
            });
        }, 200);
    }
}