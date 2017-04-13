/**
 * Created by qhyang on 2017/3/13.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

import { ScrollSceneDirective } from "../../scripts/classes";

@Directive({ selector: "[astralScrollScene]" })
export class AstralScrollSceneDirective extends ScrollSceneDirective implements AfterViewInit {
    @Input("astralScrollScene") astralAmount: number;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { super(); }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        const jQuery = require("jquery"),
            TweenLite = require("TweenLite");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: this.duration,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).addClass("fixed");

                    require("../../scripts/astral.jquery");

                    jQuery(this.el.nativeElement).astral(this.astralAmount);
                    TweenLite.to(this.el.nativeElement, 2, {
                        opacity: 1,
                        ease: "Sine.easeOut"
                    });
                })
                .on("leave", () => {
                    TweenLite.to(this.el.nativeElement, 2, {
                        opacity: 0,
                        ease: "Sine.easeOut",
                        onComplete: () => {
                            jQuery(this.el.nativeElement).removeClass("fixed");
                            jQuery(this.el.nativeElement).find("canvas").remove();
                        }
                    });
                }));
    }
}
