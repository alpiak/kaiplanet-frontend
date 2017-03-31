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

        require("../../script/animation.gsap");

        // build scroll scenes
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: 200,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).css("display", "block");
                    jQuery(this.el.nativeElement).css("opacity", 0);
                })
                .setTween(this.el.nativeElement, {
                    y: -20,
                    opacity: 1
                })
        );
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: 200,
                offset: (parseInt(this.offset, 10) + parseInt(this.duration, 10)) / 100 * this.bomService.getWindowHeight()
            })
                .setTween(this.el.nativeElement, {
                    y: -100,
                    opacity: 0
                })
        );
    }
}