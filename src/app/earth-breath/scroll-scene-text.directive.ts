/**
 * Created by qhyang on 2017/3/27.
 */

import { Directive, AfterViewInit, Input } from "@angular/core";

import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[scrollSceneText]" })
export class ScrollSceneTextDirective implements AfterViewInit {
    @Input("duration") duration: number | string;
    @Input("offset") offset: number | string;

    constructor(private scrollSceneService: ScrollSceneService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic");

        require("../../script/animation.gsap");

        // build scroll scene
        this.scrollSceneService.addScene(new ScrollMagic.Scene({
            duration: this.duration,
            offset: this.offset
        }));
    }
}