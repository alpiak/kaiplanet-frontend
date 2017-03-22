/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[scrollUp]" })
export class ScrollUpDirective implements AfterViewInit {
    @Input("scrollUp") duration: string;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService) { }

    ngAfterViewInit() {
        this.el.nativeElement.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        `;

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic");

        require("../../script/animation.gsap");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: this.duration
            })
                .setTween(this.el.nativeElement, {
                    top: "-120%"
                })
        );
    }
}