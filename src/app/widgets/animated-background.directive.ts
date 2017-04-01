/**
 * Created by qhyang on 2017/3/17.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

@Directive({ selector: "[animated-background]" })
export class AnimatedBackgroundDirective implements AfterViewInit {
    @Input() type: string;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.type === "wind-and-sand") {
                let windAndSand = require("../../scripts/wind-and-sand");

                windAndSand(this.el.nativeElement);
            } else if (this.type === "random-walkers") {
                const jQuery = require("jquery"),
                    randomWalkers = require("../../scripts/random-walkers");

                let canvas = jQuery("<canvas>").appendTo(this.el.nativeElement).get(0);

                randomWalkers(canvas);
            }
        }, 200);
    }
}