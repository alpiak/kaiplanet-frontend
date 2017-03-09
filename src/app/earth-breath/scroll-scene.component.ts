/**
 * Created by qhyang on 2017/3/1.
 */

import { Component, OnInit } from "@angular/core";

@Component({
    selector: "scroll-scene",
    template: require("./scroll-scene.component.pug"),
    styles: [ require("./scroll-scene.component.scss") ]
})
export class scrollSceneComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

        // ScrollMagic
        require("gsap/tweenLite");
        let ScrollMagic = require("scrollmagic");
        require("../../scripts/animation.gsap");

        // init controller
        let controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter"
            }
        });

        let jQuery = require("jquery");

        // build scenes
        new ScrollMagic.Scene({
            duration: 0,
            offset: "1000%"
        })
            .on("enter", function () {
                jQuery(".mask-layer").addClass("fixed");
                require("../../scripts/astral.jquery");
                jQuery('#scroll-scene__mask-layer').astral();
            })
            .on("leave", function () {
                jQuery(".mask-layer").removeClass("fixed");
                jQuery('#scroll-scene__mask-layer canvas').remove();
            })
            .addTo(controller);

    }
}