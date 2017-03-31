/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[fallingLeavesScrollScene]" })
export class FallingLeavesScrollSceneDirective implements AfterViewInit {
    @Input("fallingLeavesScrollScene") leafAmount: number;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../script/animation.gsap");

        require("../../style/falling-leaves");

        const jQuery = require("jquery"),
            LeafScene = require("../../script/falling-leaves");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: "300%",
                offset: 5 * this.bomService.getWindowHeight()
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
