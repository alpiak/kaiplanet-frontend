/**
 * Created by qhyang on 2017/4/12.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[bsScrollRoll]" })
export class ScrollRollDirective implements AfterViewInit {
    @Input() offset: string;
    @Input() duration: string;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        console.log(parseInt(this.offset, 10) / 100 * this.bomService.getWindowHeight(), 360 * parseInt(this.offset, 10) / 100);

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                offset: parseInt(this.offset, 10) / 100 * this.bomService.getWindowHeight(),
                duration: this.duration
            })
                .setTween(this.el.nativeElement, {
                    rotation: 360 * parseInt(this.duration, 10) / 100
                })
        );
    }
}
