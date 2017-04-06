/**
 * Created by qhyang on 2017/3/17.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { GridStackService } from "../home/grid-stack.service";

@Directive({ selector: "[animated-background]" })
export class AnimatedBackgroundDirective implements AfterViewInit {
    @Input() type: string;
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService) { }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);

        setTimeout(() => {
            if (this.type === "wind-and-sand") {
                let windAndSand = require("../../scripts/wind-and-sand");

                windAndSand(this.el.nativeElement);
            } else if (this.type === "random-walkers") {
                const RandomWalkers = require("../../scripts/random-walkers");

                let randomWalkers = RandomWalkers(this.el.nativeElement);

                this.gridStackService.on("resizestop").subscribe((event) => {
                    if (event.target === this.gridItemContainer) {
                        setTimeout(() => randomWalkers.resize(), 300);
                    }
                });
            }
        }, 200);
    }
}