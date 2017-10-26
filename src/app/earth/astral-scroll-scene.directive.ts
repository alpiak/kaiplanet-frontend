/**
 * Created by qhyang on 2017/3/13.
 */

import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

import { ScrollSceneDirective } from "../../scripts/classes";

@Directive({ selector: "[astralScrollScene]" })
export class AstralScrollSceneDirective extends ScrollSceneDirective implements AfterViewInit, OnDestroy {
    @Input("astralScrollScene") astralAmount: number;
    private astral: any;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { super(); }

    ngAfterViewInit() {
        const jQuery = require("jquery");

        jQuery(this.el.nativeElement).css("opacity", "0");


        // Astral

        require("../../scripts/astral.jquery");

        this.astral = jQuery(this.el.nativeElement).astral(this.astralAmount);

        this.astral.pause();


        // ScrollMagic

        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        const TweenLite = require("TweenLite");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: this.duration,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).addClass("fixed");
                    TweenLite.to(this.el.nativeElement, 2, {
                        opacity: 1,
                        ease: "Sine.easeOut"
                    });
                    this.astral.resume();
                })
                .on("leave", () => {
                    TweenLite.to(this.el.nativeElement, 2, {
                        opacity: 0,
                        ease: "Sine.easeOut",
                        onComplete: () => {
                            jQuery(this.el.nativeElement).removeClass("fixed");
                            this.astral.pause();
                        }
                    });
                })
        );
    }

    ngOnDestroy() {
        this.astral.destroy();
    }
}
