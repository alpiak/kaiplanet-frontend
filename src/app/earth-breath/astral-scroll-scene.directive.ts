/**
 * Created by qhyang on 2017/3/13.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[astralScrollScene]" })
export class AstralScrollSceneDirective implements AfterViewInit {
    @Input("astralScrollScene") astralAmount: number;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic");

        require("../../script/animation.gsap");

        let jQuery = require("jquery");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: "200%",
                offset: "1000%"
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).addClass("fixed");

                    require("../../script/astral.jquery");

                    jQuery(this.el.nativeElement).astral(this.astralAmount);
                })
                .on("leave", () => {
                    jQuery(this.el.nativeElement).removeClass("fixed");
                    jQuery(this.el.nativeElement).find("canvas").remove();
                }));
    }
}
