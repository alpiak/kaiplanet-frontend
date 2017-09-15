/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

@Directive({ selector: "[threeImageTransition]" })
export class ThreeImageTransitionDirective implements AfterViewInit {
    @Input() images: string[];
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService, private bomService: BomService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        let threeImageTransition: any;


        this.gridStackService.on("init").subscribe(() => {
            const ThreeImageTransition = require("../../scripts/three-image-transition");

            threeImageTransition = ThreeImageTransition(this.el.nativeElement, this.images);
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer && threeImageTransition) {
                    setTimeout(() => threeImageTransition.resize(), 300);
                }
            });
            delay.call(this.bomService.windowResize(), 300)
                .subscribe(() => threeImageTransition.resize());
        });
    }
}
