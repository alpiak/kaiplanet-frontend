/**
 * Created by qhyang on 2017/3/14.
 */

import { Directive, ElementRef, OnChanges, OnDestroy, Input } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

import { Image } from "../interfaces";

const jQuery = require("jquery");

@Directive({ selector: "[threeImageTransition]" })
export class ThreeImageTransitionDirective implements OnChanges, OnDestroy {
    @Input() images: Image[];
    private threeImageTransition: any;
    private gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService, private bomService: BomService) { }

    ngOnChanges() {
        jQuery(this.el.nativeElement).empty();
        this.init();
    }

    ngOnDestroy() {
        this.threeImageTransition.destroy();
    }

    init() {
        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().parent().get(0);

        this.gridStackService.on("init").subscribe(() => {
            const ThreeImageTransition = require("../../scripts/three-image-transition");

            this.threeImageTransition = ThreeImageTransition(this.el.nativeElement, this.images);
            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer && this.threeImageTransition) {
                    setTimeout(() => this.threeImageTransition.root.resize(), 300);
                }
            });
            delay.call(this.bomService.onWindowResize(), 300)
                .subscribe(() => this.threeImageTransition.root.resize());
        });
    }
}
