/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[fallingLeavesScrollScene]" })
export class FallingLeavesScrollSceneDirective implements AfterViewInit {
    @Input("fallingLeavesScrollScene") leafAmount: number;
    @Input() offset: string;
    @Input() duration: string;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        require("../../styles/falling-leaves");

        const jQuery = require("jquery"),
            LeafScene = require("../../scripts/falling-leaves");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: this.duration,
                offset: parseInt(this.offset) / 100 * this.bomService.getWindowHeight()
            })
                .on("enter", () => {
                    jQuery(this.el.nativeElement).addClass("fixed falling-leaves");

                    let leaves = new LeafScene(this.el.nativeElement, {
                            numLeaves: this.leafAmount
                        });

                    leaves.init();
                    leaves.render();
                })
                .on("leave", () => {
                    jQuery(this.el.nativeElement).removeClass("fixed falling-leaves");
                    jQuery(this.el.nativeElement).empty();
                }));
    }
}
