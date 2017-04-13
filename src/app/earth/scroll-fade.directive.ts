/**
 * Created by qhyang on 2017/4/13.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[bsScrollFade]" })
export class ScrollFadeDirective implements AfterViewInit {
    @Input() offset: string;
    @Input() duration: string;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic"),
            jQuery = require("jquery");

        require("../../scripts/animation.gsap");

        // build scroll scene
        this.scrollSceneService.addScene(new ScrollMagic.Scene({
                duration: this.duration,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("leave", () => {
                    jQuery(this.el.nativeElement).fadeOut();
                })
        );
    }
}