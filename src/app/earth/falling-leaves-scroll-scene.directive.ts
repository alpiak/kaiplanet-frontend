/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[fallingLeavesScrollScene]" })
export class FallingLeavesScrollSceneDirective implements AfterViewInit, OnDestroy {
    @Input("fallingLeavesScrollScene") leafAmount: number;
    @Input() offset: string;
    @Input() duration: string;
    private leafScene: any;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {
        // Falling leaves

        const LeafScene = require("../../scripts/falling-leaves");

        this.leafScene = new LeafScene(this.el.nativeElement, {
            numLeaves: this.leafAmount
        });

        this.leafScene.init();


        // ScrollMagic

        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        require("../../styles/falling-leaves");

        const jQuery = require("jquery"),
            TweenLite = require("TweenLite");

        jQuery(this.el.nativeElement).css("opacity", "0");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: this.duration,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).addClass("fixed falling-leaves");
                    this.leafScene.resume();
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
                            jQuery(this.el.nativeElement).removeClass("fixed falling-leaves");
                            this.leafScene.pause();
                        }
                    });
                })
        );
    }

    ngOnDestroy() {
        this.leafScene.destroy();
    }
}
