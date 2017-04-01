/**
 * Created by qhyang on 2017/4/1.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

// ScrollMagic
require("gsap/tweenLite");
let ScrollMagic = require("scrollmagic");
require("../../scripts/animation.gsap");

@Directive({ selector: "[scrollSceneBackgroundColor]" })
export class ScrollSceneBackgroundColorDirective implements AfterViewInit {
    @Input() toColor: string[];
    @Input() offset: string[];
    @Input() duration: string[];
    @Input() tweenBack: boolean[];

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {

        // ScrollMagic
        // Build scroll scene
        for (let i = 0; i < this.toColor.length; i++) {
            if (this.offset[i] && this.duration[i]) {
                this.addScene(this.toColor[i], this.offset[i], this.duration[i], this.tweenBack[i]);
            }
        }
    }
    private addScene(toColor: string, offset: string, duration: string, tweenBack: boolean) {
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: 500,
                offset: parseInt(offset) / 100 * this.bomService.getWindowHeight()
            })
                .setTween(this.el.nativeElement, {
                    backgroundColor: toColor,
                    ease: "Sine.easeOut"
                })
        );
        if (tweenBack) {
            this.scrollSceneService.addScene(
                new ScrollMagic.Scene({
                    duration: 500,
                    offset: (parseInt(offset, 10) + parseInt(duration, 10)) / 100 * this.bomService.getWindowHeight()
                })
                    .setTween(this.el.nativeElement, {
                        backgroundColor: "transparent",
                        ease: "Sine.easeIn"
                    })
            );
        }
    }
}