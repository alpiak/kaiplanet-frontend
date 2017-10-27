/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from "@angular/core";

import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[scrollPin]" })
export class ScrollPinDirective implements AfterViewInit, OnDestroy {
    @Input("scrollPin") duration: string;
    private scrollScene: any;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");
        let ScrollMagic = require("scrollmagic");
        require("../../scripts/animation.gsap");

        // build scroll scene
        this.scrollSceneService.addScene(
            this.scrollScene = new ScrollMagic.Scene({
                duration: this.duration
            })
                .setPin(this.el.nativeElement)
        );
    }

    ngOnDestroy() {
        this.scrollSceneService.removeScene(this.scrollScene);
        this.scrollScene.destroy();
    }
}