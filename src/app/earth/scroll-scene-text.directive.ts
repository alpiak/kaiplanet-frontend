/**
 * Created by qhyang on 2017/3/27.
 */

import { Directive, ElementRef, OnInit, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

const jQuery = require("jquery");

@Directive({ selector: "[scrollSceneText]" })
export class ScrollSceneTextDirective implements OnInit, AfterViewInit {
    @Input("offset") offset: string;
    @Input("duration") duration: string;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngOnInit() {
        jQuery(this.el.nativeElement).css("display", "none");
    }
    ngAfterViewInit() {
        // ScrollMagic
        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        // build scroll scenes
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight(),
                duration: 200
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).css("display", "block");
                    jQuery(this.el.nativeElement).css("opacity", 0);
                })
                .setTween(this.el.nativeElement, {
                    y: -20,
                    opacity: 1,
                    ease: "Expo.easeOut"
                })
        );
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                offset: (parseInt(this.offset, 10) + parseInt(this.duration, 10)) / 100 * this.bomService.getWindowHeight(),
                duration: 200
            })
                .setTween(this.el.nativeElement, {
                    y: -100,
                    opacity: 0,
                    ease: "Expo.easeIn"
                })
        );

        let tweenObj = {
            blur: 3
        };

        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight(),
                duration: 500
            })
                .setTween(tweenObj, {
                    blur: 0,
                    ease: "Sine.easeOut",
                    onUpdate: () => {
                        jQuery(this.el.nativeElement).css("filter", "blur(" + tweenObj.blur + "px)");
                    }
                })
        );
    }
}