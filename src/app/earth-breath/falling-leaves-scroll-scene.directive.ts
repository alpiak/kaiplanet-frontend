/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[fallingLeavesScrollScene]" })
export class FallingLeavesScrollSceneDirective implements AfterViewInit {
    @Input("fallingLeavesScrollScene") leafAmount: number;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService) { }

    ngAfterViewInit() {

        // ScrollMagic
        require("gsap/tweenLite");

        let ScrollMagic = require("scrollmagic");

        require("../../script/animation.gsap");

        require("../../style/falling-leaves");

        let jQuery = require("jquery"),
            LeafScene = require("../../script/falling-leaves");

        // build scroll scene
        this.scrollSceneService.addScene(
            new ScrollMagic.Scene({
                duration: "200%",
                offset: "2000%"
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